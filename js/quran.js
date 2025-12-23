// Quran Page JavaScript

// Reciters Database with their API identifiers
const reciters = {
    abdul_basit: {
        name: 'عبد الباسط عبد الصمد',
        server: 'https://server8.mp3quran.net/abd_basit/Alafasy_128kbps'
    },
    mishary: {
        name: 'مشاري راشد العفاسي',
        server: 'https://server8.mp3quran.net/afs'
    },
    sudais: {
        name: 'عبد الرحمن السديس',
        server: 'https://server11.mp3quran.net/sds'
    },
    minshawi: {
        name: 'محمد صديق المنشاوي',
        server: 'https://server10.mp3quran.net/minsh'
    },
    afasy: {
        name: 'مشاري بن راشد العفاسي',
        server: 'https://server8.mp3quran.net/afs'
    },
    ghamdi: {
        name: 'سعد الغامدي',
        server: 'https://server7.mp3quran.net/s_gmd'
    },
    husary: {
        name: 'محمود خليل الحصري',
        server: 'https://server14.mp3quran.net/husary'
    },
    ajmi: {
        name: 'أحمد العجمي',
        server: 'https://server10.mp3quran.net/ajm'
    },
    alqatami: {
        name: 'ناصر القطامي',
        server: 'https://server6.mp3quran.net/qtm'
    },
    shuraim: {
        name: 'سعود الشريم',
        server: 'https://server11.mp3quran.net/shr'
    },
    jibreen: {
        name: 'عبد الله الجهني',
        server: 'https://server12.mp3quran.net/jhn'
    },
    tablawi: {
        name: 'محمد محمود الطبلاوي',
        server: 'https://server11.mp3quran.net/tablaway'
    },
    rifai: {
        name: 'ياسر الدوسري',
        server: 'https://server11.mp3quran.net/yasser'
    },
    basfar: {
        name: 'عبد الله بصفر',
        server: 'https://server7.mp3quran.net/basfer'
    },
    muaiqly: {
        name: 'ماهر المعيقلي',
        server: 'https://server12.mp3quran.net/maher'
    },
    hudhaifi: {
        name: 'علي الحذيفي',
        server: 'https://server12.mp3quran.net/hthfi'
    }
};

// All 114 Surah Names
const surahNames = {
    1: 'الفاتحة', 2: 'البقرة', 3: 'آل عمران', 4: 'النساء', 5: 'المائدة',
    6: 'الأنعام', 7: 'الأعراف', 8: 'الأنفال', 9: 'التوبة', 10: 'يونس',
    11: 'هود', 12: 'يوسف', 13: 'الرعد', 14: 'إبراهيم', 15: 'الحجر',
    16: 'النحل', 17: 'الإسراء', 18: 'الكهف', 19: 'مريم', 20: 'طه',
    21: 'الأنبياء', 22: 'الحج', 23: 'المؤمنون', 24: 'النور', 25: 'الفرقان',
    26: 'الشعراء', 27: 'النمل', 28: 'القصص', 29: 'العنكبوت', 30: 'الروم',
    31: 'لقمان', 32: 'السجدة', 33: 'الأحزاب', 34: 'سبأ', 35: 'فاطر',
    36: 'يس', 37: 'الصافات', 38: 'ص', 39: 'الزمر', 40: 'غافر',
    41: 'فصلت', 42: 'الشورى', 43: 'الزخرف', 44: 'الدخان', 45: 'الجاثية',
    46: 'الأحقاف', 47: 'محمد', 48: 'الفتح', 49: 'الحجرات', 50: 'ق',
    51: 'الذاريات', 52: 'الطور', 53: 'النجم', 54: 'القمر', 55: 'الرحمن',
    56: 'الواقعة', 57: 'الحديد', 58: 'المجادلة', 59: 'الحشر', 60: 'الممتحنة',
    61: 'الصف', 62: 'الجمعة', 63: 'المنافقون', 64: 'التغابن', 65: 'الطلاق',
    66: 'التحريم', 67: 'الملك', 68: 'القلم', 69: 'الحاقة', 70: 'المعارج',
    71: 'نوح', 72: 'الجن', 73: 'المزمل', 74: 'المدثر', 75: 'القيامة',
    76: 'الإنسان', 77: 'المرسلات', 78: 'النبأ', 79: 'النازعات', 80: 'عبس',
    81: 'التكوير', 82: 'الانفطار', 83: 'المطففين', 84: 'الانشقاق', 85: 'البروج',
    86: 'الطارق', 87: 'الأعلى', 88: 'الغاشية', 89: 'الفجر', 90: 'البلد',
    91: 'الشمس', 92: 'الليل', 93: 'الضحى', 94: 'الشرح', 95: 'التين',
    96: 'العلق', 97: 'القدر', 98: 'البينة', 99: 'الزلزلة', 100: 'العاديات',
    101: 'القارعة', 102: 'التكاثر', 103: 'العصر', 104: 'الهمزة', 105: 'الفيل',
    106: 'قريش', 107: 'الماعون', 108: 'الكوثر', 109: 'الكافرون', 110: 'النصر',
    111: 'المسد', 112: 'الإخلاص', 113: 'الفلق', 114: 'الناس'
};

// Sample Surah Data (in real app, this would come from API)
const surahs = [
    { number: 1, name: 'الفاتحة', type: 'مكية', ayahs: 7, ayat: [
        'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
        'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
        'الرَّحْمَٰنِ الرَّحِيمِ',
        'مَالِكِ يَوْمِ الدِّينِ',
        'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
        'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
        'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ'
    ]},
    { number: 112, name: 'الإخلاص', type: 'مكية', ayahs: 4, ayat: [
        'قُلْ هُوَ اللَّهُ أَحَدٌ',
        'اللَّهُ الصَّمَدُ',
        'لَمْ يَلِدْ وَلَمْ يُولَدْ',
        'وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ'
    ]},
    { number: 113, name: 'الفلق', type: 'مكية', ayahs: 5, ayat: [
        'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ',
        'مِن شَرِّ مَا خَلَقَ',
        'وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ',
        'وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ',
        'وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ'
    ]},
    { number: 114, name: 'الناس', type: 'مكية', ayahs: 6, ayat: [
        'قُلْ أَعُوذُ بِرَبِّ النَّاسِ',
        'مَلِكِ النَّاسِ',
        'إِلَٰهِ النَّاسِ',
        'مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ',
        'الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ',
        'مِنَ الْجِنَّةِ وَالنَّاسِ'
    ]}
];

// Load Surah in Modal
function loadSurah(surahNumber) {
    const surah = surahs.find(s => s.number === surahNumber);
    
    if (!surah) {
        showNotification('السورة غير متوفرة حالياً', 'error');
        return;
    }
    
    const modal = document.getElementById('surahModal');
    const title = document.getElementById('surahTitle');
    const container = document.getElementById('ayatContainer');
    
    // Set title
    title.textContent = `سورة ${surah.name}`;
    
    // Clear container
    container.innerHTML = '';
    
    // Add ayat
    surah.ayat.forEach((ayah, index) => {
        const ayahDiv = document.createElement('div');
        ayahDiv.className = 'ayah';
        ayahDiv.innerHTML = `
            <span class="ayah-number">${index + 1}</span>
            ${ayah}
        `;
        container.appendChild(ayahDiv);
    });
    
    // Show modal
    modal.classList.add('active');
}

// Close Modal
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('surahModal');
    const closeBtn = modal?.querySelector('.close');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.classList.remove('active');
        });
    }
    
    // Close on outside click
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }
    
    // Search functionality
    const searchInput = document.getElementById('surahSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const surahCards = document.querySelectorAll('.surah-card');
            
            surahCards.forEach(card => {
                const surahName = card.querySelector('.surah-info h3').textContent.toLowerCase();
                if (surahName.includes(searchTerm)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
});

// Audio Player Functionality
function playQuran() {
    const reciterSelect = document.getElementById('reciterSelect');
    const surahSelect = document.getElementById('surahSelectAudio');
    const audio = document.getElementById('quranAudio');
    const nowPlaying = document.getElementById('nowPlaying');
    const currentInfo = document.getElementById('currentInfo');
    
    if (!reciterSelect || !surahSelect || !audio) return;
    
    const selectedReciter = reciterSelect.value;
    const selectedSurah = surahSelect.value.padStart(3, '0');
    const reciterInfo = reciters[selectedReciter];
    const surahName = surahNames[parseInt(selectedSurah)];
    
    // Build audio URL
    const audioUrl = `${reciterInfo.server}/${selectedSurah}.mp3`;
    
    // Set audio source
    audio.src = audioUrl;
    audio.load();
    
    // Play audio
    audio.play().then(() => {
        nowPlaying.style.display = 'flex';
        currentInfo.textContent = `${reciterInfo.name} - سورة ${surahName}`;
        showNotification(`جاري تشغيل سورة ${surahName}`);
    }).catch(error => {
        console.error('Error playing audio:', error);
        showNotification('حدث خطأ في تشغيل الصوت. جرب قارئاً آخر', 'error');
    });
}

// Initialize Audio Player
function initAudioPlayer() {
    const playBtn = document.getElementById('playSelectedBtn');
    const audio = document.getElementById('quranAudio');
    const nowPlaying = document.getElementById('nowPlaying');
    
    if (playBtn) {
        playBtn.addEventListener('click', playQuran);
    }
    
    // Update UI when audio ends
    if (audio) {
        audio.addEventListener('ended', function() {
            nowPlaying.style.display = 'none';
            showNotification('انتهى التشغيل');
        });
        
        audio.addEventListener('error', function() {
            nowPlaying.style.display = 'none';
            showNotification('حدث خطأ في تحميل الصوت', 'error');
        });
    }
    
    // Auto-play on selection change
    const reciterSelect = document.getElementById('reciterSelect');
    const surahSelect = document.getElementById('surahSelectAudio');
    
    if (reciterSelect && surahSelect) {
        // Optional: Auto-play when changing selection
        // Uncomment if you want auto-play
        // reciterSelect.addEventListener('change', playQuran);
        // surahSelect.addEventListener('change', playQuran);
    }
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAudioPlayer);
} else {
    initAudioPlayer();
}

// Make function available globally
window.loadSurah = loadSurah;
window.playQuran = playQuran;
