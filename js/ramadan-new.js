// Ramadan Calendar 2026 - JavaScript
// إمساكية رمضان 1447 هـ - 2026 م

// تاريخ بداية ونهاية رمضان 2026
const RAMADAN_START = new Date('2026-02-18T00:00:00');
const RAMADAN_END = new Date('2026-03-19T23:59:59');

// بيانات المدن التسع
const CITY_DATA = {
    makkah: { name: 'مكة المكرمة', timezone: 'Asia/Riyadh' },
    madinah: { name: 'المدينة المنورة', timezone: 'Asia/Riyadh' },
    riyadh: { name: 'الرياض', timezone: 'Asia/Riyadh' },
    jeddah: { name: 'جدة', timezone: 'Asia/Riyadh' },
    cairo: { name: 'القاهرة', timezone: 'Africa/Cairo' },
    dubai: { name: 'دبي', timezone: 'Asia/Dubai' },
    jerusalem: { name: 'القدس', timezone: 'Asia/Jerusalem' },
    amman: { name: 'عمّان', timezone: 'Asia/Amman' },
    qalqilya: { name: 'قلقيلية', timezone: 'Asia/Hebron' }
};

let selectedCity = 'amman';
let countdownInterval = null;

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    initCountdown();
    initCitySelector();
    generateRamadanSchedule();
    initControls();
});

// Initialize countdown timer
function initCountdown() {
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
}

// Update countdown display
function updateCountdown() {
    const now = new Date();
    const diff = RAMADAN_START - now;
    
    if (diff <= 0) {
        clearInterval(countdownInterval);
        showRamadanMessage();
        return;
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    
    if (daysEl) daysEl.textContent = padZero(days);
    if (hoursEl) hoursEl.textContent = padZero(hours);
    if (minutesEl) minutesEl.textContent = padZero(minutes);
    if (secondsEl) secondsEl.textContent = padZero(seconds);
}

// Show message when Ramadan starts
function showRamadanMessage() {
    const countdownEl = document.getElementById('countdown');
    const messageEl = document.getElementById('countdownMessage');
    
    if (countdownEl) {
        countdownEl.innerHTML = '<div class="ramadan-mubarak"><i class="fas fa-moon"></i> رمضان مبارك!</div>';
    }
    if (messageEl) {
        messageEl.textContent = 'كل عام وأنتم بخير';
    }
}

// Initialize city selector
function initCitySelector() {
    const cityButtons = document.querySelectorAll('.city-btn');
    
    cityButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            cityButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            selectedCity = this.dataset.city;
            const cityName = CITY_DATA[selectedCity]?.name || 'مكة المكرمة';
            
            const cityNameEl = document.getElementById('cityName');
            if (cityNameEl) {
                cityNameEl.textContent = cityName;
            }
            
            generateRamadanSchedule();
        });
    });
}

// Generate Ramadan schedule table
function generateRamadanSchedule() {
    const tbody = document.getElementById('scheduleBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    // استخدام البيانات الدقيقة لمدينة عمان
    if (selectedCity === 'amman' && typeof AMMAN_RAMADAN_2026 !== 'undefined') {
        generateAmmanSchedule(tbody);
    } else {
        generateGenericSchedule(tbody);
    }
    
    highlightCurrentDay();
}

// Generate Amman schedule using exact data
function generateAmmanSchedule(tbody) {
    AMMAN_RAMADAN_2026.forEach((dayData) => {
        const row = createAmmanDayRow(dayData);
        tbody.appendChild(row);
    });
}

// Create table row for Amman with exact data
function createAmmanDayRow(dayData) {
    const row = document.createElement('tr');
    
    // حساب وقت الإمساك (قبل الفجر بـ 15 دقيقة)
    const [fajrHour, fajrMin] = dayData.fajr.split(':').map(Number);
    let imsakMin = fajrMin - 15;
    let imsakHour = fajrHour;
    if (imsakMin < 0) {
        imsakMin += 60;
        imsakHour -= 1;
    }
    const imsak = `${padZero(imsakHour)}:${padZero(imsakMin)} ص`;
    
    row.innerHTML = `
        <td class="day-name">${dayData.dayName}</td>
        <td>${dayData.gregorianDate}</td>
        <td class="hijri-date">${dayData.ramadanDate}</td>
        <td class="imsak-time">${imsak}</td>
        <td class="fajr-time">${dayData.fajr} ص</td>
        <td class="sunrise-time">${dayData.sunrise} ص</td>
        <td class="dhuhr-time">${dayData.dhuhr} م</td>
        <td class="asr-time">${dayData.asr} م</td>
        <td class="maghrib-time">${dayData.maghrib} م</td>
        <td class="isha-time">${dayData.isha} م</td>
    `;
    
    if (dayData.dayName === 'الجمعة') {
        row.classList.add('friday-row');
    }
    
    if (dayData.day >= 21) {
        row.classList.add('last-ten-days');
    }
    
    row.dataset.day = dayData.day;
    
    return row;
}

// Generate schedule for other cities (approximate data)
function generateGenericSchedule(tbody) {
    const startDate = new Date(RAMADAN_START);
    
    for (let day = 1; day <= 30; day++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + day - 1);
        
        const row = createGenericDayRow(day, currentDate);
        tbody.appendChild(row);
    }
}

// Create table row for generic cities
function createGenericDayRow(dayNumber, date) {
    const row = document.createElement('tr');
    
    const dayName = getDayName(date);
    const gregorianDate = formatGregorianDate(date);
    const hijriDate = `${dayNumber} رمضان، 1447`;
    const times = calculatePrayerTimes(dayNumber);
    
    row.innerHTML = `
        <td class="day-name">${dayName}</td>
        <td>${gregorianDate}</td>
        <td class="hijri-date">${hijriDate}</td>
        <td class="imsak-time">${times.imsak}</td>
        <td class="fajr-time">${times.fajr}</td>
        <td class="sunrise-time">${times.sunrise}</td>
        <td class="dhuhr-time">${times.dhuhr}</td>
        <td class="asr-time">${times.asr}</td>
        <td class="maghrib-time">${times.maghrib}</td>
        <td class="isha-time">${times.isha}</td>
    `;
    
    if (date.getDay() === 5) {
        row.classList.add('friday-row');
    }
    
    if (dayNumber >= 21) {
        row.classList.add('last-ten-days');
    }
    
    row.dataset.day = dayNumber;
    
    return row;
}

// Calculate prayer times for cities (approximate)
function calculatePrayerTimes(dayNumber) {
    const baseTimes = {
        makkah: { fajr: [4,40], sunrise: [6,5], dhuhr: [12,26], asr: [15,45], maghrib: [18,45], isha: [20,15] },
        madinah: { fajr: [4,45], sunrise: [6,10], dhuhr: [12,30], asr: [15,50], maghrib: [18,48], isha: [20,18] },
        riyadh: { fajr: [4,30], sunrise: [5,55], dhuhr: [12,15], asr: [15,35], maghrib: [18,35], isha: [20,5] },
        jeddah: { fajr: [4,45], sunrise: [6,10], dhuhr: [12,28], asr: [15,47], maghrib: [18,46], isha: [20,16] },
        cairo: { fajr: [4,15], sunrise: [5,40], dhuhr: [11,57], asr: [15,10], maghrib: [18,13], isha: [19,35] },
        dubai: { fajr: [4,40], sunrise: [6,5], dhuhr: [12,25], asr: [15,45], maghrib: [18,43], isha: [20,13] },
        jerusalem: { fajr: [4,59], sunrise: [6,25], dhuhr: [12,1], asr: [15,11], maghrib: [17,36], isha: [19,6] },
        qalqilya: { fajr: [4,59], sunrise: [6,25], dhuhr: [12,1], asr: [15,11], maghrib: [17,36], isha: [19,6] }
    };
    
    const cityBase = baseTimes[selectedCity] || baseTimes.makkah;
    const dayAdjust = dayNumber - 1;
    
    const fajrAdjust = -dayAdjust * 1.0;
    const dhuhrAdjust = -dayAdjust * 0.2;
    const asrAdjust = dayAdjust * 0.5;
    const maghribAdjust = dayAdjust * 0.7;
    const ishaAdjust = dayAdjust * 0.7;
    
    const createTime = (base, adjust) => {
        const totalMins = base[1] + Math.round(adjust);
        const d = new Date();
        d.setHours(base[0], totalMins, 0, 0);
        return formatTime(d);
    };
    
    return {
        imsak: createTime(cityBase.fajr, fajrAdjust - 15),
        fajr: createTime(cityBase.fajr, fajrAdjust),
        sunrise: createTime(cityBase.sunrise, fajrAdjust),
        dhuhr: createTime(cityBase.dhuhr, dhuhrAdjust),
        asr: createTime(cityBase.asr, asrAdjust),
        maghrib: createTime(cityBase.maghrib, maghribAdjust),
        isha: createTime(cityBase.isha, ishaAdjust)
    };
}

// Highlight current day
function highlightCurrentDay() {
    const now = new Date();
    
    if (now >= RAMADAN_START && now <= RAMADAN_END) {
        const daysDiff = Math.floor((now - RAMADAN_START) / (1000 * 60 * 60 * 24)) + 1;
        
        const currentRow = document.querySelector(`tr[data-day="${daysDiff}"]`);
        if (currentRow) {
            currentRow.classList.add('current-day');
            currentRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
}

// Initialize control buttons
function initControls() {
    const printBtn = document.getElementById('printBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const shareBtn = document.getElementById('shareBtn');
    
    if (printBtn) printBtn.addEventListener('click', printSchedule);
    if (downloadBtn) downloadBtn.addEventListener('click', downloadPDF);
    if (shareBtn) shareBtn.addEventListener('click', shareSchedule);
}

// Print schedule
function printSchedule() {
    window.print();
}

// Download as PDF
function downloadPDF() {
    showNotification('جاري تجهيز ملف PDF...');
    setTimeout(() => {
        showNotification('سيتم إضافة هذه الميزة قريباً');
    }, 1000);
}

// Share schedule
async function shareSchedule() {
    const cityName = CITY_DATA[selectedCity]?.name || 'مكة المكرمة';
    const shareData = {
        title: 'إمساكية رمضان 2026',
        text: `إمساكية شهر رمضان المبارك 1447 هـ - 2026 م\n${cityName}`,
        url: window.location.href
    };
    
    try {
        if (navigator.share) {
            await navigator.share(shareData);
            showNotification('تم المشاركة بنجاح');
        } else {
            await navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`);
            showNotification('تم نسخ الرابط');
        }
    } catch (err) {
        console.error('Error sharing:', err);
        showNotification('حدث خطأ في المشاركة');
    }
}

// Helper Functions
function getDayName(date) {
    const days = ['الأحد', 'الأثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
    return days[date.getDay()];
}

function formatGregorianDate(date) {
    const months = [
        'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
        'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
    ];
    return `${padZero(date.getDate())} ${months[date.getMonth()]}، ${date.getFullYear()}`;
}

function formatTime(date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    
    if (hours < 12) {
        return `${padZero(hours)}:${padZero(minutes)} ص`;
    } else if (hours === 12) {
        return `${padZero(hours)}:${padZero(minutes)} م`;
    } else {
        return `${padZero(hours - 12)}:${padZero(minutes)} م`;
    }
}

function padZero(num) {
    return num.toString().padStart(2, '0');
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #2d7a56 0%, #1e5a3e 100%);
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-weight: 600;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}
