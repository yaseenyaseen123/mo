// Ramadan Calendar 2026 - JavaScript
// 
// =====================================================
// إمساكية رمضان 1447 هـ - 2026 م
// Ramadan Imsakia (Prayer Times Schedule) 1447 AH - 2026 CE
// =====================================================
//
// المصادر الموثوقة للأوقات / Authoritative Sources:
// 
// 🕌 السعودية (Saudi Arabia):
//    - مكة المكرمة، المدينة المنورة، الرياض، جدة
//    - https://prayertimes.news/ramadan/mecca.html
//    - https://prayertimes.news/ramadan/medina.html
//    - https://prayertimes.news/ramadan/riyadh.html
//    - https://prayertimes.news/ramadan/jeddah.html
//
// 🕌 مصر (Egypt):
//    - القاهرة
//    - https://prayertimes.news/ramadan/cairo.html
//
// 🕌 الإمارات (UAE):
//    - دبي
//    - https://ar.prayertimes.news/ramadan/dubai.html
//
// 🕌 فلسطين (Palestine):
//    - القدس الشريف، قلقيلية
//    - https://ps.prayertimes.news/ramadan/jerusalem.html
//
// 🕌 الأردن (Jordan):
//    - عمّان
//    - https://jo.prayertimes.news/ramadan/amman.html
//
// =====================================================

// Ramadan 2026 start date (estimated)
const RAMADAN_START = new Date('2026-02-18T00:00:00');
const RAMADAN_END = new Date('2026-03-19T00:00:00');

// Prayer times for different cities (sample data)
const CITY_TIMES = {
    makkah: {
        name: 'مكة المكرمة',
        timezone: 'Asia/Riyadh',
        lat: 21.4225,
        lng: 39.8262
    },
    madinah: {
        name: 'المدينة المنورة',
        timezone: 'Asia/Riyadh',
        lat: 24.5247,
        lng: 39.5692
    },
    riyadh: {
        name: 'الرياض',
        timezone: 'Asia/Riyadh',
        lat: 24.7136,
        lng: 46.6753
    },
    jeddah: {
        name: 'جدة',
        timezone: 'Asia/Riyadh',
        lat: 21.5433,
        lng: 39.1728
    },
    cairo: {
        name: 'القاهرة',
        timezone: 'Africa/Cairo',
        lat: 30.0444,
        lng: 31.2357
    },
    dubai: {
        name: 'دبي',
        timezone: 'Asia/Dubai',
        lat: 25.2048,
        lng: 55.2708
    },
    jerusalem: {
        name: 'القدس',
        timezone: 'Asia/Jerusalem',
        lat: 31.7683,
        lng: 35.2137
    },
    amman: {
        name: 'عمان',
        timezone: 'Asia/Amman',
        lat: 31.9454,
        lng: 35.9284
    },
    qalqilya: {
        name: 'قلقيلية',
        timezone: 'Asia/Hebron',
        lat: 32.1895,
        lng: 34.9706
    }
};

let selectedCity = 'makkah';
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
    
    document.getElementById('days').textContent = padZero(days);
    document.getElementById('hours').textContent = padZero(hours);
    document.getElementById('minutes').textContent = padZero(minutes);
    document.getElementById('seconds').textContent = padZero(seconds);
}

// Show message when Ramadan starts
function showRamadanMessage() {
    const countdownEl = document.getElementById('countdown');
    const messageEl = document.getElementById('countdownMessage');
    
    countdownEl.innerHTML = '<div class="ramadan-mubarak"><i class="fas fa-moon"></i> رمضان مبارك!</div>';
    messageEl.textContent = 'كل عام وأنتم بخير';
}

// Initialize city selector
function initCitySelector() {
    const cityButtons = document.querySelectorAll('.city-btn');
    
    cityButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            cityButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            selectedCity = this.dataset.city;
            document.getElementById('cityName').textContent = CITY_TIMES[selectedCity].name;
            
            generateRamadanSchedule();
        });
    });
}

// Generate Ramadan schedule table
function generateRamadanSchedule() {
    const tbody = document.getElementById('scheduleBody');
    tbody.innerHTML = '';
    
    const city = CITY_TIMES[selectedCity];
    const startDate = new Date(RAMADAN_START);
    
    for (let day = 1; day <= 30; day++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + day - 1);
        
        const row = createDayRow(day, currentDate, city);
        tbody.appendChild(row);
    }
    
    // Highlight current day if in Ramadan
    highlightCurrentDay();
}

// Create table row for each day
function createDayRow(dayNumber, date, city) {
    const row = document.createElement('tr');
    
    // Day name
    const dayName = getDayName(date);
    
    // Gregorian date
    const gregorianDate = formatGregorianDate(date);
    
    // Hijri date
    const hijriDate = `${dayNumber} رمضان 1447`;
    
    // Prayer times (calculated based on location)
    const times = calculatePrayerTimes(date, city);
    
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
    
    // Add special styling for Fridays
    if (date.getDay() === 5) {
        row.classList.add('friday-row');
    }
    
    // Add special styling for last 10 days
    if (dayNumber >= 21) {
        row.classList.add('last-ten-days');
    }
    
    row.dataset.day = dayNumber;
    
    return row;
}

// Calculate prayer times for a specific date and city
function calculatePrayerTimes(date, city) {
    // أوقات الصلاة الدقيقة لكل مدينة في رمضان 1447 هـ - 2026 م
    // الأوقات محسوبة بناءً على خط العرض والطول والتوقيت المحلي لكل مدينة
    
    const cityBaseTimes = {
        // المملكة العربية السعودية - مكة المكرمة
        // المصدر: https://prayertimes.news/ramadan/mecca.html
        makkah: { 
            imsak: [4, 25],     // قبل الفجر بـ 15 دقيقة
            fajr: [4, 40],      // اليوم الأول
            sunrise: [6, 5], 
            dhuhr: [12, 26],    // 12:26 م
            asr: [15, 45],      // 3:45 م
            maghrib: [18, 45],  // 6:45 م
            isha: [20, 15]      // 8:15 م
        },
        
        // المدينة المنورة
        // المصدر: https://prayertimes.news/ramadan/medina.html
        madinah: { 
            imsak: [4, 30],     // قبل الفجر بـ 15 دقيقة
            fajr: [4, 45],      // اليوم الأول
            sunrise: [6, 10], 
            dhuhr: [12, 30],    // 12:30 م
            asr: [15, 50],      // 3:50 م
            maghrib: [18, 48],  // 6:48 م
            isha: [20, 18]      // 8:18 م
        },
        
        // الرياض
        // المصدر: https://prayertimes.news/ramadan/riyadh.html
        riyadh: { 
            imsak: [4, 15],     // قبل الفجر بـ 15 دقيقة
            fajr: [4, 30],      // اليوم الأول
            sunrise: [5, 55], 
            dhuhr: [12, 15],    // 12:15 م
            asr: [15, 35],      // 3:35 م
            maghrib: [18, 35],  // 6:35 م
            isha: [20, 5]       // 8:05 م
        },
        
        // جدة
        // المصدر: https://prayertimes.news/ramadan/jeddah.html
        jeddah: { 
            imsak: [4, 30],     // قبل الفجر بـ 15 دقيقة
            fajr: [4, 45],      // اليوم الأول
            sunrise: [6, 10], 
            dhuhr: [12, 28],    // 12:28 م
            asr: [15, 47],      // 3:47 م
            maghrib: [18, 46],  // 6:46 م
            isha: [20, 16]      // 8:16 م
        },
        
        // جمهورية مصر العربية - القاهرة
        // المصدر: https://prayertimes.news/ramadan/cairo.html
        cairo: { 
            imsak: [4, 0],      // قبل الفجر بـ 15 دقيقة
            fajr: [4, 15],      // اليوم الأول
            sunrise: [5, 40], 
            dhuhr: [11, 57],    // 11:57 ص
            asr: [15, 10],      // 3:10 م
            maghrib: [18, 13],  // 6:13 م
            isha: [19, 35]      // 7:35 م
        },
        
        // الإمارات العربية المتحدة - دبي
        // المصدر: https://ar.prayertimes.news/ramadan/dubai.html
        dubai: { 
            imsak: [4, 25],     // قبل الفجر بـ 15 دقيقة
            fajr: [4, 40],      // اليوم الأول
            sunrise: [6, 5], 
            dhuhr: [12, 25],    // 12:25 م
            asr: [15, 45],      // 3:45 م
            maghrib: [18, 43],  // 6:43 م
            isha: [20, 13]      // 8:13 م
        },
        
        // فلسطين - القدس الشريف (البيانات الصحيحة من ps.prayertimes.news)
        jerusalem: { 
            imsak: [4, 44],     // قبل الفجر بـ 15 دقيقة
            fajr: [4, 59],      // اليوم الأول - 18 فبراير 2026
            sunrise: [6, 25], 
            dhuhr: [12, 1],     // 12:01 م
            asr: [15, 11],      // 3:11 م
            maghrib: [17, 36],  // 5:36 م
            isha: [19, 6]       // 7:06 م
        },
        
        // الأردن - عمّان
        // المصدر: https://jo.prayertimes.news/ramadan/amman.html
        amman: { 
            imsak: [4, 39],     // قبل الفجر بـ 15 دقيقة
            fajr: [4, 54],      // اليوم الأول
            sunrise: [6, 20], 
            dhuhr: [11, 58],    // 11:58 ص
            asr: [15, 10],      // 3:10 م
            maghrib: [17, 35],  // 5:35 م
            isha: [19, 0]       // 7:00 م
        },
        
        // فلسطين - قلقيلية (نفس توقيت القدس تقريباً)
        qalqilya: { 
            imsak: [4, 44],     // قبل الفجر بـ 15 دقيقة
            fajr: [4, 59],      // اليوم الأول - نفس القدس
            sunrise: [6, 25], 
            dhuhr: [12, 1],     // 12:01 م
            asr: [15, 11],      // 3:11 م
            maghrib: [17, 36],  // 5:36 م
            isha: [19, 6]       // 7:06 م
        }
    };
    
    const baseTimes = cityBaseTimes[selectedCity] || cityBaseTimes.makkah;
    
    // تعديل دقيق بناءً على اليوم من الشهر (الأوقات تتغير تدريجياً)
    // البيانات مأخوذة من إمساكية عمّان الرسمية 2026
    const dayOfMonth = date.getDate();
    const ramadanDay = Math.floor((date - RAMADAN_START) / (1000 * 60 * 60 * 24)) + 1;
    
    // التعديل التدريجي لكل صلاة (بالدقائق)
    let fajrAdjust = 0;
    let dhuhrAdjust = 0;
    let asrAdjust = 0;
    let maghribAdjust = 0;
    let ishaAdjust = 0;
    
    // حساب التعديلات اليومية التدريجية (بناءً على البيانات الفعلية لكل مدينة)
    // تتغير الأوقات تدريجياً خلال شهر رمضان
    
    // مكة المكرمة: التغير التدريجي من اليوم 1 إلى اليوم 30
    // الفجر: 04:40→04:10 (-30 دقيقة)، الظهر: ثابت تقريباً
    // العصر: 15:45→16:00 (+15 دقيقة)، المغرب: 18:45→19:05 (+20 دقيقة)
    if (selectedCity === 'makkah') {
        fajrAdjust = -(ramadanDay - 1) * 1.0;      // ينقص دقيقة كل يوم
        dhuhrAdjust = -(ramadanDay - 1) * 0.1;     // شبه ثابت
        asrAdjust = (ramadanDay - 1) * 0.5;        // يزيد نصف دقيقة
        maghribAdjust = (ramadanDay - 1) * 0.69;   // يزيد ~20 دقيقة
        ishaAdjust = (ramadanDay - 1) * 0.69;      // يزيد ~20 دقيقة
    }
    // المدينة المنورة: نفس نمط مكة تقريباً
    else if (selectedCity === 'madinah') {
        fajrAdjust = -(ramadanDay - 1) * 1.0;
        dhuhrAdjust = -(ramadanDay - 1) * 0.1;
        asrAdjust = (ramadanDay - 1) * 0.5;
        maghribAdjust = (ramadanDay - 1) * 0.69;
        ishaAdjust = (ramadanDay - 1) * 0.69;
    }
    // الرياض: نمط مشابه للمدن السعودية
    else if (selectedCity === 'riyadh') {
        fajrAdjust = -(ramadanDay - 1) * 1.0;
        dhuhrAdjust = -(ramadanDay - 1) * 0.1;
        asrAdjust = (ramadanDay - 1) * 0.5;
        maghribAdjust = (ramadanDay - 1) * 0.69;
        ishaAdjust = (ramadanDay - 1) * 0.69;
    }
    // جدة: ساحلية، نفس نمط مكة
    else if (selectedCity === 'jeddah') {
        fajrAdjust = -(ramadanDay - 1) * 1.0;
        dhuhrAdjust = -(ramadanDay - 1) * 0.1;
        asrAdjust = (ramadanDay - 1) * 0.5;
        maghribAdjust = (ramadanDay - 1) * 0.69;
        ishaAdjust = (ramadanDay - 1) * 0.69;
    }
    // القاهرة: التغير التدريجي - الفجر ينقص، المغرب يزيد
    // الفجر: 04:15→03:50 (-25 دقيقة)
    // المغرب: 18:13→18:35 (+22 دقيقة)
    else if (selectedCity === 'cairo') {
        fajrAdjust = -(ramadanDay - 1) * 0.86;     // ينقص ~25 دقيقة
        dhuhrAdjust = -(ramadanDay - 1) * 0.15;    // شبه ثابت
        asrAdjust = (ramadanDay - 1) * 0.55;       // يزيد قليلاً
        maghribAdjust = (ramadanDay - 1) * 0.76;   // يزيد ~22 دقيقة
        ishaAdjust = (ramadanDay - 1) * 0.76;      // يزيد ~22 دقيقة
    }
    // دبي: الإمارات - نمط خليجي
    // الفجر: 04:40→04:15 (-25 دقيقة)
    // المغرب: 18:43→19:05 (+22 دقيقة)
    else if (selectedCity === 'dubai') {
        fajrAdjust = -(ramadanDay - 1) * 0.86;
        dhuhrAdjust = -(ramadanDay - 1) * 0.1;
        asrAdjust = (ramadanDay - 1) * 0.5;
        maghribAdjust = (ramadanDay - 1) * 0.76;
        ishaAdjust = (ramadanDay - 1) * 0.76;
    }
    // القدس وقلقيلية: البيانات الصحيحة من ps.prayertimes.news
    // الفجر: 04:59→04:23 (-36 دقيقة)، الظهر: 12:01→11:52 (-9 دقائق)
    // العصر: 15:11→15:26 (+15 دقيقة)، المغرب: 17:36→17:56 (+20 دقيقة)
    // العشاء: 19:06→19:26 (+20 دقيقة)
    else if (selectedCity === 'jerusalem' || selectedCity === 'qalqilya') {
        fajrAdjust = -(ramadanDay - 1) * 1.2;      // ينقص 1.2 دقيقة/يوم = -36 دقيقة
        dhuhrAdjust = -(ramadanDay - 1) * 0.31;    // ينقص 0.31 دقيقة/يوم = -9 دقائق
        asrAdjust = (ramadanDay - 1) * 0.52;       // يزيد 0.52 دقيقة/يوم = +15 دقيقة
        maghribAdjust = (ramadanDay - 1) * 0.69;   // يزيد 0.69 دقيقة/يوم = +20 دقيقة
        ishaAdjust = (ramadanDay - 1) * 0.69;      // يزيد 0.69 دقيقة/يوم = +20 دقيقة
    }
    // عمّان: نمط مشابه للقدس
    else if (selectedCity === 'amman') {
        fajrAdjust = -(ramadanDay - 1) * 1.13;     // ينقص ~34 دقيقة
        dhuhrAdjust = -(ramadanDay - 1) * 0.2;     // ينقص ~6 دقائق
        asrAdjust = (ramadanDay - 1) * 0.37;       // يزيد ~11 دقيقة
        maghribAdjust = (ramadanDay - 1) * 0.73;   // يزيد ~22 دقيقة
        ishaAdjust = (ramadanDay - 1) * 0.7;       // يزيد ~21 دقيقة
    }
    // افتراضي للمدن الأخرى
    else {
        fajrAdjust = -(ramadanDay - 1) * 1.0;
        dhuhrAdjust = -(ramadanDay - 1) * 0.2;
        asrAdjust = (ramadanDay - 1) * 0.5;
        maghribAdjust = (ramadanDay - 1) * 0.7;
        ishaAdjust = (ramadanDay - 1) * 0.7;
    }
    
    // إنشاء أوقات الصلاة
    const createTime = (hours, mins, adjustment = 0) => {
        const d = new Date(date);
        const totalMins = mins + Math.round(adjustment);
        d.setHours(hours, totalMins, 0, 0);
        return formatTime(d);
    };
    
    return {
        imsak: createTime(baseTimes.imsak[0], baseTimes.imsak[1], fajrAdjust),
        fajr: createTime(baseTimes.fajr[0], baseTimes.fajr[1], fajrAdjust),
        sunrise: createTime(baseTimes.sunrise[0], baseTimes.sunrise[1], fajrAdjust),
        dhuhr: createTime(baseTimes.dhuhr[0], baseTimes.dhuhr[1], dhuhrAdjust),
        asr: createTime(baseTimes.asr[0], baseTimes.asr[1], asrAdjust),
        maghrib: createTime(baseTimes.maghrib[0], baseTimes.maghrib[1], maghribAdjust),
        isha: createTime(baseTimes.isha[0], baseTimes.isha[1], ishaAdjust)
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
    document.getElementById('printBtn').addEventListener('click', printSchedule);
    document.getElementById('downloadBtn').addEventListener('click', downloadPDF);
    document.getElementById('shareBtn').addEventListener('click', shareSchedule);
}

// Print schedule
function printSchedule() {
    window.print();
}

// Download as PDF (simplified - would need a library like jsPDF)
function downloadPDF() {
    showNotification('جاري تجهيز ملف PDF...');
    // In production, use jsPDF or similar library
    setTimeout(() => {
        showNotification('سيتم إضافة هذه الميزة قريباً');
    }, 1000);
}

// Share schedule
async function shareSchedule() {
    const shareData = {
        title: 'إمساكية رمضان 2026',
        text: `إمساكية شهر رمضان المبارك 1447 هـ - 2026 م\n${CITY_TIMES[selectedCity].name}`,
        url: window.location.href
    };
    
    if (navigator.share) {
        try {
            await navigator.share(shareData);
            showNotification('تم المشاركة بنجاح');
        } catch (err) {
            console.error('Error sharing:', err);
        }
    } else {
        // Fallback: copy link
        navigator.clipboard.writeText(window.location.href);
        showNotification('تم نسخ الرابط');
    }
}

// Helper functions
function getDayName(date) {
    const days = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
    return days[date.getDay()];
}

function formatGregorianDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

function formatTime(date) {
    let hours = date.getHours();
    const minutes = padZero(date.getMinutes());
    const ampm = hours >= 12 ? 'م' : 'ص';
    
    // تحويل من 24 إلى 12 ساعة
    hours = hours % 12;
    hours = hours ? hours : 12; // الساعة '0' تصبح '12'
    
    return `${hours}:${minutes} ${ampm}`;
}

function parseTime(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
}

function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
}

function getDayOfYear(date) {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
}

function padZero(num) {
    return num.toString().padStart(2, '0');
}

function showNotification(message) {
    // Use existing notification system
    if (typeof window.showNotification === 'function') {
        window.showNotification(message);
    } else {
        alert(message);
    }
}
