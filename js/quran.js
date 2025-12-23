// Quran Page JavaScript

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

// Make function available globally
window.loadSurah = loadSurah;
