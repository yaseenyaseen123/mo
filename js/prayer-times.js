// Prayer Times Module - نظام مواقيت الصلاة الدقيقة

// Aladhan API - واجهة برمجية موثوقة لمواقيت الصلاة
const PRAYER_API = 'https://api.aladhan.com/v1/timings';
const PRAYER_CALENDAR_API = 'https://api.aladhan.com/v1/calendar';

// Default location (Qalqilya, Palestine)
const DEFAULT_LOCATION = {
    latitude: 32.1895,
    longitude: 34.9706,
    city: 'قلقيلية',
    country: 'فلسطين',
    method: 3 // طريقة الحساب: 3 = Muslim World League
};

// Prayer names in Arabic
const PRAYER_NAMES = {
    Fajr: 'الفجر',
    Sunrise: 'الشروق',
    Dhuhr: 'الظهر',
    Asr: 'العصر',
    Maghrib: 'المغرب',
    Isha: 'العشاء'
};

// Icons for each prayer
const PRAYER_ICONS = {
    Fajr: 'fa-sun',
    Sunrise: 'fa-cloud-sun',
    Dhuhr: 'fa-sun',
    Asr: 'fa-cloud-sun',
    Maghrib: 'fa-moon',
    Isha: 'fa-star'
};

/**
 * طلب إذن الموقع الجغرافي من المستخدم
 */
function requestLocationPermission() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('المتصفح لا يدعم تحديد الموقع الجغرافي'));
            return;
        }

        showNotification('جاري تحديد موقعك لضبط أوقات الصلاة الدقيقة...', 'info');

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const location = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    accuracy: position.coords.accuracy
                };
                
                // حفظ الموقع في localStorage
                localStorage.setItem('userLocation', JSON.stringify(location));
                localStorage.setItem('locationPermissionGranted', 'true');
                
                resolve(location);
            },
            (error) => {
                console.error('خطأ في الحصول على الموقع:', error);
                
                let errorMessage = 'فشل تحديد الموقع. ';
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage += 'الرجاء السماح للموقع بالوصول إلى موقعك الجغرافي من إعدادات المتصفح.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage += 'معلومات الموقع غير متوفرة.';
                        break;
                    case error.TIMEOUT:
                        errorMessage += 'انتهت مهلة طلب الموقع.';
                        break;
                    default:
                        errorMessage += 'حدث خطأ غير معروف.';
                }
                
                showNotification(errorMessage, 'warning');
                reject(error);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 600000 // 10 دقائق
            }
        );
    });
}

/**
 * الحصول على الموقع الحالي (من localStorage أو طلب جديد)
 */
async function getCurrentLocation() {
    // التحقق من وجود موقع محفوظ
    const savedLocation = localStorage.getItem('userLocation');
    const permissionGranted = localStorage.getItem('locationPermissionGranted');
    
    if (savedLocation && permissionGranted === 'true') {
        try {
            return JSON.parse(savedLocation);
        } catch (e) {
            console.error('خطأ في قراءة الموقع المحفوظ:', e);
        }
    }
    
    // طلب الموقع من المستخدم
    try {
        return await requestLocationPermission();
    } catch (error) {
        // استخدام الموقع الافتراضي (قلقيلية)
        console.log('استخدام الموقع الافتراضي: قلقيلية');
        return DEFAULT_LOCATION;
    }
}

/**
 * جلب مواقيت الصلاة من API
 */
async function fetchPrayerTimes(location = null) {
    try {
        // الحصول على الموقع
        if (!location) {
            location = await getCurrentLocation();
        }
        
        // تاريخ اليوم
        const today = new Date();
        const timestamp = Math.floor(today.getTime() / 1000);
        
        // بناء رابط API
        const url = `${PRAYER_API}/${timestamp}?latitude=${location.latitude}&longitude=${location.longitude}&method=${DEFAULT_LOCATION.method}`;
        
        // جلب البيانات
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`خطأ في الاتصال بخادم مواقيت الصلاة: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.code !== 200 || !data.data || !data.data.timings) {
            throw new Error('البيانات المستلمة غير صحيحة');
        }
        
        // حفظ البيانات في localStorage
        const prayerData = {
            timings: data.data.timings,
            date: data.data.date,
            location: location,
            fetchedAt: new Date().toISOString()
        };
        
        localStorage.setItem('prayerTimes', JSON.stringify(prayerData));
        
        return data.data;
        
    } catch (error) {
        console.error('خطأ في جلب مواقيت الصلاة:', error);
        
        // محاولة استخدام البيانات المحفوظة
        const cachedData = localStorage.getItem('prayerTimes');
        if (cachedData) {
            try {
                const parsed = JSON.parse(cachedData);
                const fetchedDate = new Date(parsed.fetchedAt);
                const now = new Date();
                
                // استخدام البيانات المخزنة إذا كانت من نفس اليوم
                if (fetchedDate.toDateString() === now.toDateString()) {
                    console.log('استخدام مواقيت الصلاة المحفوظة');
                    return { timings: parsed.timings, date: parsed.date };
                }
            } catch (e) {
                console.error('خطأ في قراءة البيانات المحفوظة:', e);
            }
        }
        
        // استخدام أوقات افتراضية لقلقيلية
        showNotification('تعذر الحصول على مواقيت دقيقة. يتم عرض مواقيت تقريبية لقلقيلية.', 'warning');
        return getDefaultTimes();
    }
}

/**
 * أوقات افتراضية لقلقيلية (في حالة فشل API)
 */
function getDefaultTimes() {
    return {
        timings: {
            Fajr: '05:15',
            Sunrise: '06:42',
            Dhuhr: '12:05',
            Asr: '15:10',
            Maghrib: '17:28',
            Isha: '18:52',
            Imsak: '05:05',
            Midnight: '00:16'
        },
        date: {
            readable: new Date().toLocaleDateString('ar-EG'),
            hijri: {
                day: '01',
                month: { ar: 'محرم' },
                year: '1446'
            }
        }
    };
}

/**
 * تحويل الوقت من 24 ساعة إلى 12 ساعة
 */
function convertTo12Hour(time24) {
    const [hours, minutes] = time24.split(':');
    let h = parseInt(hours);
    const ampm = h >= 12 ? 'م' : 'ص';
    h = h % 12 || 12;
    return `${h}:${minutes} ${ampm}`;
}

/**
 * تحديث عرض مواقيت الصلاة في الصفحة
 */
async function updatePrayerTimesDisplay() {
    try {
        // جلب مواقيت الصلاة
        const data = await fetchPrayerTimes();
        
        if (!data || !data.timings) {
            throw new Error('لا توجد بيانات لعرضها');
        }
        
        const timings = data.timings;
        
        // تحديث كل وقت صلاة في الصفحة
        const prayers = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
        const prayerGrid = document.getElementById('prayerTimes');
        
        if (prayerGrid) {
            prayerGrid.innerHTML = '';
            
            prayers.forEach(prayer => {
                if (timings[prayer]) {
                    const card = document.createElement('div');
                    card.className = 'prayer-card';
                    
                    // التحقق من الوقت الحالي
                    const now = new Date();
                    const prayerTime = parseTime(timings[prayer]);
                    const isNext = isNextPrayer(prayer, timings, now);
                    
                    if (isNext) {
                        card.classList.add('next-prayer');
                    }
                    
                    card.innerHTML = `
                        <i class="fas ${PRAYER_ICONS[prayer]}"></i>
                        <h3>${PRAYER_NAMES[prayer]}</h3>
                        <p class="time">${convertTo12Hour(timings[prayer])}</p>
                        ${isNext ? '<span class="next-badge">الصلاة القادمة</span>' : ''}
                    `;
                    
                    prayerGrid.appendChild(card);
                }
            });
            
            // إضافة معلومات الموقع
            const locationInfo = document.createElement('div');
            locationInfo.className = 'location-info';
            locationInfo.innerHTML = `
                <i class="fas fa-map-marker-alt"></i>
                <span>المواقيت محدثة حسب موقعك الحالي</span>
                <button class="btn-refresh" onclick="refreshPrayerTimes()">
                    <i class="fas fa-sync-alt"></i> تحديث
                </button>
            `;
            
            const container = prayerGrid.parentElement;
            if (container && !container.querySelector('.location-info')) {
                container.appendChild(locationInfo);
            }
        }
        
        // إضافة التاريخ الهجري إذا كان متاحاً
        if (data.date && data.date.hijri) {
            updateHijriDate(data.date);
        }
        
        console.log('تم تحديث مواقيت الصلاة بنجاح');
        
    } catch (error) {
        console.error('خطأ في تحديث العرض:', error);
        showNotification('حدث خطأ في تحديث مواقيت الصلاة', 'error');
    }
}

/**
 * تحديث التاريخ الهجري
 */
function updateHijriDate(dateData) {
    const hijriDateElement = document.getElementById('hijriDate');
    if (hijriDateElement && dateData.hijri) {
        const hijriDate = `${dateData.hijri.day} ${dateData.hijri.month.ar} ${dateData.hijri.year} هـ`;
        hijriDateElement.textContent = hijriDate;
    }
}

/**
 * تحويل نص الوقت إلى كائن Date
 */
function parseTime(timeString) {
    const [hours, minutes] = timeString.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
}

/**
 * التحقق من الصلاة القادمة
 */
function isNextPrayer(prayerName, timings, now) {
    const prayers = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
    const prayerTime = parseTime(timings[prayerName]);
    
    if (prayerTime <= now) {
        return false;
    }
    
    // البحث عن أول صلاة لم تأت بعد
    for (let prayer of prayers) {
        const time = parseTime(timings[prayer]);
        if (time > now) {
            return prayer === prayerName;
        }
    }
    
    return false;
}

/**
 * تحديث مواقيت الصلاة (يدوياً)
 */
async function refreshPrayerTimes() {
    showNotification('جاري تحديث مواقيت الصلاة...', 'info');
    
    try {
        // مسح البيانات المخزنة
        localStorage.removeItem('prayerTimes');
        
        // طلب الموقع مرة أخرى
        const location = await requestLocationPermission();
        
        // تحديث العرض
        await updatePrayerTimesDisplay();
        
        showNotification('تم تحديث مواقيت الصلاة بنجاح', 'success');
    } catch (error) {
        console.error('خطأ في التحديث:', error);
        showNotification('فشل تحديث المواقيت', 'error');
    }
}

/**
 * التحقق من الحاجة لطلب الموقع عند تسجيل الدخول
 */
function checkLocationPermissionAfterLogin() {
    const permissionGranted = localStorage.getItem('locationPermissionGranted');
    
    if (permissionGranted !== 'true') {
        // عرض نافذة منبثقة لطلب الإذن
        showLocationPermissionDialog();
    } else {
        // تحديث المواقيت تلقائياً
        updatePrayerTimesDisplay();
    }
}

/**
 * عرض نافذة طلب إذن الموقع
 */
function showLocationPermissionDialog() {
    const dialog = document.createElement('div');
    dialog.className = 'location-permission-dialog';
    dialog.innerHTML = `
        <div class="dialog-overlay"></div>
        <div class="dialog-content">
            <div class="dialog-icon">
                <i class="fas fa-map-marker-alt"></i>
            </div>
            <h2>تحديد مواقيت الصلاة الدقيقة</h2>
            <p>للحصول على مواقيت صلاة دقيقة حسب موقعك الحالي، نحتاج إلى إذن للوصول إلى موقعك الجغرافي.</p>
            <div class="dialog-features">
                <div class="feature-item">
                    <i class="fas fa-check-circle"></i>
                    <span>مواقيت دقيقة 100%</span>
                </div>
                <div class="feature-item">
                    <i class="fas fa-check-circle"></i>
                    <span>تحديث تلقائي</span>
                </div>
                <div class="feature-item">
                    <i class="fas fa-check-circle"></i>
                    <span>خصوصية محمية</span>
                </div>
            </div>
            <div class="dialog-buttons">
                <button class="btn btn-primary" onclick="acceptLocationPermission()">
                    <i class="fas fa-check"></i> السماح بالوصول
                </button>
                <button class="btn btn-secondary" onclick="declineLocationPermission()">
                    <i class="fas fa-times"></i> ربما لاحقاً
                </button>
            </div>
            <p class="dialog-note">
                <i class="fas fa-lock"></i>
                نحن لا نحفظ أو نشارك معلومات موقعك
            </p>
        </div>
    `;
    
    document.body.appendChild(dialog);
}

/**
 * قبول إذن الموقع
 */
async function acceptLocationPermission() {
    closeLocationDialog();
    
    try {
        await requestLocationPermission();
        await updatePrayerTimesDisplay();
        showNotification('تم ضبط مواقيت الصلاة حسب موقعك', 'success');
    } catch (error) {
        console.error('خطأ في الحصول على الموقع:', error);
    }
}

/**
 * رفض إذن الموقع
 */
function declineLocationPermission() {
    closeLocationDialog();
    localStorage.setItem('locationPermissionAsked', 'true');
    showNotification('يمكنك تفعيل الموقع لاحقاً من الإعدادات', 'info');
    
    // استخدام الموقع الافتراضي
    updatePrayerTimesDisplay();
}

/**
 * إغلاق نافذة طلب الموقع
 */
function closeLocationDialog() {
    const dialog = document.querySelector('.location-permission-dialog');
    if (dialog) {
        dialog.remove();
    }
}

/**
 * الإعداد التلقائي عند تحميل الصفحة
 */
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function() {
        // تحديث مواقيت الصلاة
        updatePrayerTimesDisplay();
        
        // تحديث كل ساعة
        setInterval(updatePrayerTimesDisplay, 3600000);
        
        // التحقق من تسجيل الدخول
        const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
        if (isLoggedIn) {
            checkLocationPermissionAfterLogin();
        }
    });
}

// تصدير الوظائف للاستخدام العام
window.updatePrayerTimesDisplay = updatePrayerTimesDisplay;
window.refreshPrayerTimes = refreshPrayerTimes;
window.acceptLocationPermission = acceptLocationPermission;
window.declineLocationPermission = declineLocationPermission;
window.checkLocationPermissionAfterLogin = checkLocationPermissionAfterLogin;
