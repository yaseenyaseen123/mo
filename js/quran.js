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
    }
};

// Surah Names
const surahNames = {
    1: 'الفاتحة', 2: 'البقرة', 3: 'آل عمران', 18: 'الكهف',
    36: 'يس', 55: 'الرحمن', 56: 'الواقعة', 67: 'الملك',
    78: 'النبأ', 112: 'الإخلاص', 113: 'الفلق', 114: 'الناس'
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
