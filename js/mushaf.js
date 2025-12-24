// Mushaf (Digital Quran Book) JavaScript

// Global Variables
let currentPage = 1;
const totalPages = 604; // Total pages in the Quran (Madani Mushaf)
let currentJuz = 1;
let currentSurah = 1;

// Surah Data (114 Surahs with their info)
const surahs = [
    { number: 1, name: 'الفاتحة', englishName: 'Al-Fatihah', ayahs: 7, page: 1, juz: 1 },
    { number: 2, name: 'البقرة', englishName: 'Al-Baqarah', ayahs: 286, page: 2, juz: 1 },
    { number: 3, name: 'آل عمران', englishName: 'Ali \'Imran', ayahs: 200, page: 50, juz: 3 },
    { number: 4, name: 'النساء', englishName: 'An-Nisa', ayahs: 176, page: 77, juz: 4 },
    { number: 5, name: 'المائدة', englishName: 'Al-Ma\'idah', ayahs: 120, page: 106, juz: 6 },
    { number: 6, name: 'الأنعام', englishName: 'Al-An\'am', ayahs: 165, page: 128, juz: 7 },
    { number: 7, name: 'الأعراف', englishName: 'Al-A\'raf', ayahs: 206, page: 151, juz: 8 },
    { number: 8, name: 'الأنفال', englishName: 'Al-Anfal', ayahs: 75, page: 177, juz: 9 },
    { number: 9, name: 'التوبة', englishName: 'At-Tawbah', ayahs: 129, page: 187, juz: 10 },
    { number: 10, name: 'يونس', englishName: 'Yunus', ayahs: 109, page: 208, juz: 11 },
    { number: 11, name: 'هود', englishName: 'Hud', ayahs: 123, page: 221, juz: 11 },
    { number: 12, name: 'يوسف', englishName: 'Yusuf', ayahs: 111, page: 235, juz: 12 },
    { number: 13, name: 'الرعد', englishName: 'Ar-Ra\'d', ayahs: 43, page: 249, juz: 13 },
    { number: 14, name: 'إبراهيم', englishName: 'Ibrahim', ayahs: 52, page: 255, juz: 13 },
    { number: 15, name: 'الحجر', englishName: 'Al-Hijr', ayahs: 99, page: 262, juz: 14 },
    { number: 16, name: 'النحل', englishName: 'An-Nahl', ayahs: 128, page: 267, juz: 14 },
    { number: 17, name: 'الإسراء', englishName: 'Al-Isra', ayahs: 111, page: 282, juz: 15 },
    { number: 18, name: 'الكهف', englishName: 'Al-Kahf', ayahs: 110, page: 293, juz: 15 },
    { number: 19, name: 'مريم', englishName: 'Maryam', ayahs: 98, page: 305, juz: 16 },
    { number: 20, name: 'طه', englishName: 'Taha', ayahs: 135, page: 312, juz: 16 },
    { number: 21, name: 'الأنبياء', englishName: 'Al-Anbya', ayahs: 112, page: 322, juz: 17 },
    { number: 22, name: 'الحج', englishName: 'Al-Hajj', ayahs: 78, page: 332, juz: 17 },
    { number: 23, name: 'المؤمنون', englishName: 'Al-Mu\'minun', ayahs: 118, page: 342, juz: 18 },
    { number: 24, name: 'النور', englishName: 'An-Nur', ayahs: 64, page: 350, juz: 18 },
    { number: 25, name: 'الفرقان', englishName: 'Al-Furqan', ayahs: 77, page: 359, juz: 18 },
    { number: 26, name: 'الشعراء', englishName: 'Ash-Shu\'ara', ayahs: 227, page: 367, juz: 19 },
    { number: 27, name: 'النمل', englishName: 'An-Naml', ayahs: 93, page: 377, juz: 19 },
    { number: 28, name: 'القصص', englishName: 'Al-Qasas', ayahs: 88, page: 385, juz: 20 },
    { number: 29, name: 'العنكبوت', englishName: 'Al-\'Ankabut', ayahs: 69, page: 396, juz: 20 },
    { number: 30, name: 'الروم', englishName: 'Ar-Rum', ayahs: 60, page: 404, juz: 21 },
    { number: 31, name: 'لقمان', englishName: 'Luqman', ayahs: 34, page: 411, juz: 21 },
    { number: 32, name: 'السجدة', englishName: 'As-Sajdah', ayahs: 30, page: 415, juz: 21 },
    { number: 33, name: 'الأحزاب', englishName: 'Al-Ahzab', ayahs: 73, page: 418, juz: 21 },
    { number: 34, name: 'سبأ', englishName: 'Saba', ayahs: 54, page: 428, juz: 22 },
    { number: 35, name: 'فاطر', englishName: 'Fatir', ayahs: 45, page: 434, juz: 22 },
    { number: 36, name: 'يس', englishName: 'Ya-Sin', ayahs: 83, page: 440, juz: 22 },
    { number: 37, name: 'الصافات', englishName: 'As-Saffat', ayahs: 182, page: 446, juz: 23 },
    { number: 38, name: 'ص', englishName: 'Sad', ayahs: 88, page: 453, juz: 23 },
    { number: 39, name: 'الزمر', englishName: 'Az-Zumar', ayahs: 75, page: 458, juz: 23 },
    { number: 40, name: 'غافر', englishName: 'Ghafir', ayahs: 85, page: 467, juz: 24 },
    { number: 41, name: 'فصلت', englishName: 'Fussilat', ayahs: 54, page: 477, juz: 24 },
    { number: 42, name: 'الشورى', englishName: 'Ash-Shuraa', ayahs: 53, page: 483, juz: 25 },
    { number: 43, name: 'الزخرف', englishName: 'Az-Zukhruf', ayahs: 89, page: 489, juz: 25 },
    { number: 44, name: 'الدخان', englishName: 'Ad-Dukhan', ayahs: 59, page: 496, juz: 25 },
    { number: 45, name: 'الجاثية', englishName: 'Al-Jathiyah', ayahs: 37, page: 499, juz: 25 },
    { number: 46, name: 'الأحقاف', englishName: 'Al-Ahqaf', ayahs: 35, page: 502, juz: 26 },
    { number: 47, name: 'محمد', englishName: 'Muhammad', ayahs: 38, page: 507, juz: 26 },
    { number: 48, name: 'الفتح', englishName: 'Al-Fath', ayahs: 29, page: 511, juz: 26 },
    { number: 49, name: 'الحجرات', englishName: 'Al-Hujurat', ayahs: 18, page: 515, juz: 26 },
    { number: 50, name: 'ق', englishName: 'Qaf', ayahs: 45, page: 518, juz: 26 },
    { number: 51, name: 'الذاريات', englishName: 'Adh-Dhariyat', ayahs: 60, page: 520, juz: 26 },
    { number: 52, name: 'الطور', englishName: 'At-Tur', ayahs: 49, page: 523, juz: 27 },
    { number: 53, name: 'النجم', englishName: 'An-Najm', ayahs: 62, page: 526, juz: 27 },
    { number: 54, name: 'القمر', englishName: 'Al-Qamar', ayahs: 55, page: 528, juz: 27 },
    { number: 55, name: 'الرحمن', englishName: 'Ar-Rahman', ayahs: 78, page: 531, juz: 27 },
    { number: 56, name: 'الواقعة', englishName: 'Al-Waqi\'ah', ayahs: 96, page: 534, juz: 27 },
    { number: 57, name: 'الحديد', englishName: 'Al-Hadid', ayahs: 29, page: 537, juz: 27 },
    { number: 58, name: 'المجادلة', englishName: 'Al-Mujadila', ayahs: 22, page: 542, juz: 28 },
    { number: 59, name: 'الحشر', englishName: 'Al-Hashr', ayahs: 24, page: 545, juz: 28 },
    { number: 60, name: 'الممتحنة', englishName: 'Al-Mumtahanah', ayahs: 13, page: 549, juz: 28 },
    { number: 61, name: 'الصف', englishName: 'As-Saf', ayahs: 14, page: 551, juz: 28 },
    { number: 62, name: 'الجمعة', englishName: 'Al-Jumu\'ah', ayahs: 11, page: 553, juz: 28 },
    { number: 63, name: 'المنافقون', englishName: 'Al-Munafiqun', ayahs: 11, page: 554, juz: 28 },
    { number: 64, name: 'التغابن', englishName: 'At-Taghabun', ayahs: 18, page: 556, juz: 28 },
    { number: 65, name: 'الطلاق', englishName: 'At-Talaq', ayahs: 12, page: 558, juz: 28 },
    { number: 66, name: 'التحريم', englishName: 'At-Tahrim', ayahs: 12, page: 560, juz: 28 },
    { number: 67, name: 'الملك', englishName: 'Al-Mulk', ayahs: 30, page: 562, juz: 29 },
    { number: 68, name: 'القلم', englishName: 'Al-Qalam', ayahs: 52, page: 564, juz: 29 },
    { number: 69, name: 'الحاقة', englishName: 'Al-Haqqah', ayahs: 52, page: 566, juz: 29 },
    { number: 70, name: 'المعارج', englishName: 'Al-Ma\'arij', ayahs: 44, page: 568, juz: 29 },
    { number: 71, name: 'نوح', englishName: 'Nuh', ayahs: 28, page: 570, juz: 29 },
    { number: 72, name: 'الجن', englishName: 'Al-Jinn', ayahs: 28, page: 572, juz: 29 },
    { number: 73, name: 'المزمل', englishName: 'Al-Muzzammil', ayahs: 20, page: 574, juz: 29 },
    { number: 74, name: 'المدثر', englishName: 'Al-Muddaththir', ayahs: 56, page: 575, juz: 29 },
    { number: 75, name: 'القيامة', englishName: 'Al-Qiyamah', ayahs: 40, page: 577, juz: 29 },
    { number: 76, name: 'الإنسان', englishName: 'Al-Insan', ayahs: 31, page: 578, juz: 29 },
    { number: 77, name: 'المرسلات', englishName: 'Al-Mursalat', ayahs: 50, page: 580, juz: 29 },
    { number: 78, name: 'النبأ', englishName: 'An-Naba', ayahs: 40, page: 582, juz: 30 },
    { number: 79, name: 'النازعات', englishName: 'An-Nazi\'at', ayahs: 46, page: 583, juz: 30 },
    { number: 80, name: 'عبس', englishName: '\'Abasa', ayahs: 42, page: 585, juz: 30 },
    { number: 81, name: 'التكوير', englishName: 'At-Takwir', ayahs: 29, page: 586, juz: 30 },
    { number: 82, name: 'الانفطار', englishName: 'Al-Infitar', ayahs: 19, page: 587, juz: 30 },
    { number: 83, name: 'المطففين', englishName: 'Al-Mutaffifin', ayahs: 36, page: 587, juz: 30 },
    { number: 84, name: 'الانشقاق', englishName: 'Al-Inshiqaq', ayahs: 25, page: 589, juz: 30 },
    { number: 85, name: 'البروج', englishName: 'Al-Buruj', ayahs: 22, page: 590, juz: 30 },
    { number: 86, name: 'الطارق', englishName: 'At-Tariq', ayahs: 17, page: 591, juz: 30 },
    { number: 87, name: 'الأعلى', englishName: 'Al-A\'la', ayahs: 19, page: 591, juz: 30 },
    { number: 88, name: 'الغاشية', englishName: 'Al-Ghashiyah', ayahs: 26, page: 592, juz: 30 },
    { number: 89, name: 'الفجر', englishName: 'Al-Fajr', ayahs: 30, page: 593, juz: 30 },
    { number: 90, name: 'البلد', englishName: 'Al-Balad', ayahs: 20, page: 594, juz: 30 },
    { number: 91, name: 'الشمس', englishName: 'Ash-Shams', ayahs: 15, page: 595, juz: 30 },
    { number: 92, name: 'الليل', englishName: 'Al-Layl', ayahs: 21, page: 595, juz: 30 },
    { number: 93, name: 'الضحى', englishName: 'Ad-Duhaa', ayahs: 11, page: 596, juz: 30 },
    { number: 94, name: 'الشرح', englishName: 'Ash-Sharh', ayahs: 8, page: 596, juz: 30 },
    { number: 95, name: 'التين', englishName: 'At-Tin', ayahs: 8, page: 597, juz: 30 },
    { number: 96, name: 'العلق', englishName: 'Al-\'Alaq', ayahs: 19, page: 597, juz: 30 },
    { number: 97, name: 'القدر', englishName: 'Al-Qadr', ayahs: 5, page: 598, juz: 30 },
    { number: 98, name: 'البينة', englishName: 'Al-Bayyinah', ayahs: 8, page: 598, juz: 30 },
    { number: 99, name: 'الزلزلة', englishName: 'Az-Zalzalah', ayahs: 8, page: 599, juz: 30 },
    { number: 100, name: 'العاديات', englishName: 'Al-\'Adiyat', ayahs: 11, page: 599, juz: 30 },
    { number: 101, name: 'القارعة', englishName: 'Al-Qari\'ah', ayahs: 11, page: 600, juz: 30 },
    { number: 102, name: 'التكاثر', englishName: 'At-Takathur', ayahs: 8, page: 600, juz: 30 },
    { number: 103, name: 'العصر', englishName: 'Al-\'Asr', ayahs: 3, page: 601, juz: 30 },
    { number: 104, name: 'الهمزة', englishName: 'Al-Humazah', ayahs: 9, page: 601, juz: 30 },
    { number: 105, name: 'الفيل', englishName: 'Al-Fil', ayahs: 5, page: 601, juz: 30 },
    { number: 106, name: 'قريش', englishName: 'Quraysh', ayahs: 4, page: 602, juz: 30 },
    { number: 107, name: 'الماعون', englishName: 'Al-Ma\'un', ayahs: 7, page: 602, juz: 30 },
    { number: 108, name: 'الكوثر', englishName: 'Al-Kawthar', ayahs: 3, page: 602, juz: 30 },
    { number: 109, name: 'الكافرون', englishName: 'Al-Kafirun', ayahs: 6, page: 603, juz: 30 },
    { number: 110, name: 'النصر', englishName: 'An-Nasr', ayahs: 3, page: 603, juz: 30 },
    { number: 111, name: 'المسد', englishName: 'Al-Masad', ayahs: 5, page: 603, juz: 30 },
    { number: 112, name: 'الإخلاص', englishName: 'Al-Ikhlas', ayahs: 4, page: 604, juz: 30 },
    { number: 113, name: 'الفلق', englishName: 'Al-Falaq', ayahs: 5, page: 604, juz: 30 },
    { number: 114, name: 'الناس', englishName: 'An-Nas', ayahs: 6, page: 604, juz: 30 }
];

// Juz starting pages
const juzPages = [1, 22, 42, 62, 82, 102, 121, 142, 162, 182, 201, 222, 242, 262, 282, 302, 322, 342, 362, 382, 402, 422, 442, 462, 482, 502, 522, 542, 562, 582];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initControls();
    initModals();
    loadPage(currentPage);
    populateSurahList();
    populateJuzList();
    initKeyboard();
});

// Initialize Controls
function initControls() {
    document.getElementById('prevPageBtn').addEventListener('click', () => previousPage());
    document.getElementById('nextPageBtn').addEventListener('click', () => nextPage());
    document.getElementById('firstPageBtn').addEventListener('click', () => goToPage(1));
    document.getElementById('lastPageBtn').addEventListener('click', () => goToPage(totalPages));
    
    document.getElementById('gotoPageBtn').addEventListener('click', () => openModal('gotoModal'));
    document.getElementById('surahListBtn').addEventListener('click', () => openModal('surahModal'));
    document.getElementById('juzListBtn').addEventListener('click', () => openModal('juzModal'));
    
    document.getElementById('gotoBtn').addEventListener('click', gotoPageFromInput);
    document.getElementById('pageInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') gotoPageFromInput();
    });
}

// Initialize Modals
function initModals() {
    const closeButtons = document.querySelectorAll('.close-modal');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            closeModal(this.dataset.modal);
        });
    });
    
    // Close on outside click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this.id);
            }
        });
    });
}

// Initialize Keyboard Navigation
function initKeyboard() {
    document.addEventListener('keydown', function(e) {
        switch(e.key) {
            case 'ArrowRight':
                previousPage();
                break;
            case 'ArrowLeft':
                nextPage();
                break;
            case 'Home':
                goToPage(1);
                break;
            case 'End':
                goToPage(totalPages);
                break;
        }
    });
}

// Load Page
async function loadPage(pageNum) {
    if (pageNum < 1 || pageNum > totalPages) return;
    
    currentPage = pageNum;
    document.getElementById('currentPage').textContent = currentPage;
    
    // Update pages
    if (window.innerWidth > 768) {
        // Desktop: show both pages
        loadPageContent('left', pageNum);
        loadPageContent('right', pageNum + 1);
    } else {
        // Mobile: show only right page
        loadPageContent('right', pageNum);
    }
    
    // Update buttons state
    updateButtons();
}

// Load Page Content
async function loadPageContent(side, pageNum) {
    const pageTextEl = document.getElementById(`${side}PageText`);
    const pageNumberEl = document.getElementById(`${side}PageNumber`);
    const surahNameEl = document.getElementById(`${side}SurahName`);
    const juzNumberEl = document.getElementById(`${side}JuzNumber`);
    
    if (pageNum > totalPages) {
        pageTextEl.innerHTML = '<div class="loading"><i class="fas fa-check-circle"></i><p>انتهى المصحف الشريف</p></div>';
        return;
    }
    
    // Show loading
    pageTextEl.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i><p>جاري تحميل الصفحة...</p></div>';
    
    // Get surah info for this page
    const surahInfo = getSurahByPage(pageNum);
    const juzInfo = getJuzByPage(pageNum);
    
    // Update header
    if (surahInfo) {
        surahNameEl.textContent = `سورة ${surahInfo.name}`;
    }
    if (juzInfo) {
        juzNumberEl.textContent = `الجزء ${juzInfo}`;
    }
    pageNumberEl.textContent = pageNum;
    
    // Load content from API
    try {
        const content = await fetchPageContent(pageNum);
        pageTextEl.innerHTML = content;
    } catch (error) {
        console.error('Error loading page:', error);
        pageTextEl.innerHTML = `<div class="loading"><i class="fas fa-exclamation-triangle"></i><p>عذراً، حدث خطأ في التحميل</p></div>`;
    }
}

// Fetch Page Content (Mock - in production use real Quran API)
async function fetchPageContent(pageNum) {
    // This is a simplified version. In production, use API like:
    // https://api.alquran.cloud/v1/page/${pageNum}/quran-uthmani
    
    return new Promise((resolve) => {
        setTimeout(() => {
            let content = '';
            
            // Get surah for this page
            const surah = getSurahByPage(pageNum);
            
            if (surah && surah.page === pageNum) {
                // Surah header
                content += `<div class="surah-header">سورة ${surah.name}</div>`;
                
                // Basmala (except for Surah 9)
                if (surah.number !== 1 && surah.number !== 9) {
                    content += `<div class="basmala">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>`;
                }
            }
            
            // Sample Quranic text (in production, load from API)
            content += `<p class="aya">`;
            
            if (pageNum === 1) {
                // Al-Fatiha
                content += `<span class="aya-text">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</span> <span class="aya-number">۝1</span> `;
                content += `<span class="aya-text">الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ</span> <span class="aya-number">۝2</span> `;
                content += `<span class="aya-text">الرَّحْمَٰنِ الرَّحِيمِ</span> <span class="aya-number">۝3</span> `;
                content += `<span class="aya-text">مَالِكِ يَوْمِ الدِّينِ</span> <span class="aya-number">۝4</span> `;
                content += `<span class="aya-text">إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ</span> <span class="aya-number">۝5</span> `;
                content += `<span class="aya-text">اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ</span> <span class="aya-number">۝6</span> `;
                content += `<span class="aya-text">صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ</span> <span class="aya-number">۝7</span>`;
            } else {
                // Sample text for other pages
                content += `<span class="aya-text">إِنَّ اللَّهَ لَا يَسْتَحْيِي أَن يَضْرِبَ مَثَلًا مَّا بَعُوضَةً فَمَا فَوْقَهَا</span> <span class="aya-number">۝${Math.floor(Math.random() * 100)}</span> `;
                content += `<span class="aya-text">فَأَمَّا الَّذِينَ آمَنُوا فَيَعْلَمُونَ أَنَّهُ الْحَقُّ مِن رَّبِّهِمْ</span> <span class="aya-number">۝${Math.floor(Math.random() * 100)}</span> `;
                content += `<span class="aya-text">وَأَمَّا الَّذِينَ كَفَرُوا فَيَقُولُونَ مَاذَا أَرَادَ اللَّهُ بِهَٰذَا مَثَلًا</span> <span class="aya-number">۝${Math.floor(Math.random() * 100)}</span>`;
            }
            
            content += `</p>`;
            
            resolve(content);
        }, 300);
    });
}

// Get Surah by Page
function getSurahByPage(pageNum) {
    for (let i = surahs.length - 1; i >= 0; i--) {
        if (surahs[i].page <= pageNum) {
            return surahs[i];
        }
    }
    return surahs[0];
}

// Get Juz by Page
function getJuzByPage(pageNum) {
    for (let i = juzPages.length - 1; i >= 0; i--) {
        if (juzPages[i] <= pageNum) {
            return i + 1;
        }
    }
    return 1;
}

// Navigation Functions
function nextPage() {
    if (currentPage < totalPages) {
        const increment = window.innerWidth > 768 ? 2 : 1;
        animatePageTurn('next', currentPage + increment);
    }
}

function previousPage() {
    if (currentPage > 1) {
        const decrement = window.innerWidth > 768 ? 2 : 1;
        animatePageTurn('prev', currentPage - decrement);
    }
}

function goToPage(pageNum) {
    // Ensure even page on desktop for proper book view
    if (window.innerWidth > 768 && pageNum % 2 === 0) {
        pageNum--;
    }
    
    const newPage = Math.max(1, Math.min(pageNum, totalPages));
    
    if (newPage !== currentPage) {
        const direction = newPage > currentPage ? 'next' : 'prev';
        animatePageTurn(direction, newPage);
    }
}

// Animate Page Turn
function animatePageTurn(direction, targetPage) {
    const pages = document.querySelectorAll('.page');
    
    // Add flip animation
    pages.forEach(page => {
        page.classList.add('flipping');
    });
    
    // Play page turn sound (optional - can add audio)
    playPageSound();
    
    // Load new page after animation starts
    setTimeout(() => {
        loadPage(targetPage);
        
        // Remove animation class
        setTimeout(() => {
            pages.forEach(page => {
                page.classList.remove('flipping');
            });
        }, 100);
    }, 400);
}

// Play page turn sound (optional)
function playPageSound() {
    // You can add an audio element for page turn sound
    // const audio = new Audio('sounds/page-turn.mp3');
    // audio.volume = 0.3;
    // audio.play();
}

function gotoPageFromInput() {
    const pageNum = parseInt(document.getElementById('pageInput').value);
    if (pageNum >= 1 && pageNum <= totalPages) {
        goToPage(pageNum);
        closeModal('gotoModal');
    } else {
        alert('الرجاء إدخال رقم صفحة صحيح (1-604)');
    }
}

// Update Buttons
function updateButtons() {
    document.getElementById('prevPageBtn').disabled = currentPage <= 1;
    document.getElementById('firstPageBtn').disabled = currentPage <= 1;
    document.getElementById('nextPageBtn').disabled = currentPage >= totalPages;
    document.getElementById('lastPageBtn').disabled = currentPage >= totalPages;
}

// Populate Surah List
function populateSurahList() {
    const grid = document.getElementById('surahGrid');
    grid.innerHTML = '';
    
    surahs.forEach(surah => {
        const item = document.createElement('div');
        item.className = 'surah-item';
        item.innerHTML = `
            <div class="number">${surah.number}</div>
            <div class="name">${surah.name}</div>
            <div class="info">${surah.ayahs} آية</div>
        `;
        item.addEventListener('click', () => {
            goToPage(surah.page);
            closeModal('surahModal');
        });
        grid.appendChild(item);
    });
}

// Populate Juz List
function populateJuzList() {
    const grid = document.getElementById('juzGrid');
    grid.innerHTML = '';
    
    for (let i = 1; i <= 30; i++) {
        const item = document.createElement('div');
        item.className = 'juz-item';
        item.innerHTML = `
            <div class="number">${i}</div>
            <div class="label">الجزء</div>
        `;
        item.addEventListener('click', () => {
            goToPage(juzPages[i - 1]);
            closeModal('juzModal');
        });
        grid.appendChild(item);
    }
}

// Modal Functions
function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}
