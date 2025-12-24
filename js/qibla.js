// Qibla Finder - JavaScript

// Kaaba Coordinates
const KAABA = {
    lat: 21.4225,
    lng: 39.8262
};

let compassCircle = null;
let kaabaIcon = null;
let headingValue = null;
let qiblaAngle = null;
let userLocation = null;

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    compassCircle = document.getElementById('compass');
    kaabaIcon = document.getElementById('kaabaIcon');
    headingValue = document.getElementById('headingValue');
    
    const findQiblaBtn = document.getElementById('findQiblaBtn');
    findQiblaBtn.addEventListener('click', findQibla);
    
    // Check if device supports orientation
    if (!window.DeviceOrientationEvent) {
        showError('جهازك لا يدعم البوصلة');
    }
});

// Find Qibla Direction
async function findQibla() {
    showNotification('جاري تحديد موقعك...');
    
    // Request device orientation permission for iOS 13+
    if (typeof DeviceOrientationEvent !== 'undefined' && 
        typeof DeviceOrientationEvent.requestPermission === 'function') {
        try {
            const permission = await DeviceOrientationEvent.requestPermission();
            if (permission !== 'granted') {
                showError('يرجى السماح باستخدام البوصلة');
                return;
            }
        } catch (error) {
            console.error('Error requesting orientation permission:', error);
            showError('لم نتمكن من الوصول إلى البوصلة');
            return;
        }
    }
    
    if (!navigator.geolocation) {
        showError('المتصفح لا يدعم تحديد الموقع');
        return;
    }
    
    navigator.geolocation.getCurrentPosition(
        handleLocationSuccess,
        handleLocationError,
        { 
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }
    );
}

// Handle successful location
function handleLocationSuccess(position) {
    userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
    };
    
    // Calculate Qibla direction
    qiblaAngle = calculateQiblaDirection(userLocation, KAABA);
    
    // Update UI
    updateLocationInfo(userLocation, qiblaAngle);
    
    // Start compass
    startCompass();
    
    // Get city name
    getCityName(userLocation.lat, userLocation.lng);
    
    showNotification('تم تحديد اتجاه القبلة بنجاح!');
}

// Handle location error
function handleLocationError(error) {
    let message = 'حدث خطأ في تحديد الموقع';
    
    switch(error.code) {
        case error.PERMISSION_DENIED:
            message = 'يرجى السماح بالوصول إلى موقعك';
            break;
        case error.POSITION_UNAVAILABLE:
            message = 'الموقع غير متاح حالياً';
            break;
        case error.TIMEOUT:
            message = 'انتهت مهلة الطلب';
            break;
    }
    
    showError(message);
}

// Calculate Qibla Direction using Haversine formula
function calculateQiblaDirection(from, to) {
    const lat1 = toRadians(from.lat);
    const lat2 = toRadians(to.lat);
    const lng1 = toRadians(from.lng);
    const lng2 = toRadians(to.lng);
    
    const dLng = lng2 - lng1;
    
    const y = Math.sin(dLng) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) -
              Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
    
    let bearing = Math.atan2(y, x);
    bearing = toDegrees(bearing);
    bearing = (bearing + 360) % 360;
    
    return bearing;
}

// Calculate distance to Kaaba
function calculateDistance(from, to) {
    const R = 6371; // Earth radius in km
    const lat1 = toRadians(from.lat);
    const lat2 = toRadians(to.lat);
    const dLat = toRadians(to.lat - from.lat);
    const dLng = toRadians(to.lng - from.lng);
    
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1) * Math.cos(lat2) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    return Math.round(distance);
}

// Start compass with device orientation
function startCompass() {
    if (!window.DeviceOrientationEvent) {
        showError('البوصلة غير مدعومة على هذا الجهاز');
        return;
    }
    
    // Remove any existing listeners
    window.removeEventListener('deviceorientation', handleOrientation);
    window.removeEventListener('deviceorientationabsolute', handleOrientation);
    
    // Add new listeners
    window.addEventListener('deviceorientation', handleOrientation, true);
    window.addEventListener('deviceorientationabsolute', handleOrientation, true);
    
    showNotification('قم بتحريك الهاتف لمعايرة البوصلة');
}

// Handle device orientation
function handleOrientation(event) {
    let heading = null;
    
    // For iOS devices with webkitCompassHeading
    if (event.webkitCompassHeading !== undefined && event.webkitCompassHeading !== null) {
        heading = event.webkitCompassHeading;
    }
    // For devices with absolute orientation
    else if (event.absolute && event.alpha !== null) {
        heading = 360 - event.alpha;
    }
    // For devices with regular orientation
    else if (event.alpha !== null) {
        heading = 360 - event.alpha;
    }
    
    if (heading !== null) {
        updateCompass(heading);
    }
}

// Update compass rotation
function updateCompass(heading) {
    if (!compassCircle || qiblaAngle === null) return;
    
    // Rotate compass circle
    compassCircle.style.transform = `rotate(${-heading}deg)`;
    
    // Update heading display
    headingValue.textContent = Math.round(heading) + '°';
    
    // Keep Kaaba icon pointing to Qibla
    if (kaabaIcon) {
        kaabaIcon.style.transform = `rotate(${qiblaAngle}deg)`;
    }
}

// Update location information
function updateLocationInfo(location, qiblaAngle) {
    const distance = calculateDistance(location, KAABA);
    
    document.getElementById('locationInfo').style.display = 'flex';
    document.getElementById('statusMessage').style.display = 'none';
    document.getElementById('qiblaDirection').textContent = Math.round(qiblaAngle) + '°';
    document.getElementById('distanceToKaaba').textContent = distance.toLocaleString('ar-EG') + ' كم';
    
    // Position Kaaba icon
    if (kaabaIcon) {
        kaabaIcon.style.transform = `rotate(${qiblaAngle}deg)`;
    }
}

// Get city name from coordinates using reverse geocoding
async function getCityName(lat, lng) {
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=ar`
        );
        const data = await response.json();
        
        const city = data.address.city || 
                    data.address.town || 
                    data.address.village || 
                    data.address.county ||
                    'موقعك الحالي';
        
        document.getElementById('cityName').textContent = city;
    } catch (error) {
        console.error('Error getting city name:', error);
        document.getElementById('cityName').textContent = 'موقعك الحالي';
    }
}

// Helper functions
function toRadians(degrees) {
    return degrees * Math.PI / 180;
}

function toDegrees(radians) {
    return radians * 180 / Math.PI;
}

// Show notification
function showNotification(message) {
    const statusEl = document.getElementById('statusMessage');
    if (statusEl) {
        statusEl.innerHTML = `<i class="fas fa-info-circle"></i><p>${message}</p>`;
        statusEl.style.display = 'flex';
        statusEl.className = 'status-message info';
    }
}

// Show error message
function showError(message) {
    const statusEl = document.getElementById('statusMessage');
    if (statusEl) {
        statusEl.innerHTML = `<i class="fas fa-exclamation-triangle"></i><p>${message}</p>`;
        statusEl.style.display = 'flex';
        statusEl.className = 'status-message error';
    }
}
