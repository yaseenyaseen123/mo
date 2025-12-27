// Ruqyah Page JavaScript

// Audio URLs from EveryAyah.com (highly reliable and stable source)
// Using Mishary Rashid Alafasy (128kbps quality)
// Format: https://everyayah.com/data/Alafasy_128kbps/SSSAAA.mp3
// SSS = Surah number (3 digits), AAA = Ayah number (3 digits)
const ruqyahAudios = {
    'fatiha': 'https://everyayah.com/data/Alafasy_128kbps/001001.mp3', // Al-Fatiha verse 1
    'ayat-kursi': 'https://everyayah.com/data/Alafasy_128kbps/002255.mp3', // Ayat Al-Kursi (2:255)
    'baqarah-end': 'https://everyayah.com/data/Alafasy_128kbps/002285.mp3', // Last verses of Baqarah (2:285)
    'muawwidhaat': 'https://everyayah.com/data/Alafasy_128kbps/112001.mp3' // Surah Al-Ikhlas (112:1)
};

// Complete Ruqyah playlist - all verses in sequence
const completeRuqyahPlaylist = [
    // Surah Al-Fatiha (7 verses)
    'https://everyayah.com/data/Alafasy_128kbps/001001.mp3',
    'https://everyayah.com/data/Alafasy_128kbps/001002.mp3',
    'https://everyayah.com/data/Alafasy_128kbps/001003.mp3',
    'https://everyayah.com/data/Alafasy_128kbps/001004.mp3',
    'https://everyayah.com/data/Alafasy_128kbps/001005.mp3',
    'https://everyayah.com/data/Alafasy_128kbps/001006.mp3',
    'https://everyayah.com/data/Alafasy_128kbps/001007.mp3',
    
    // Ayat Al-Kursi (2:255)
    'https://everyayah.com/data/Alafasy_128kbps/002255.mp3',
    
    // Last 2 verses of Baqarah (2:285-286)
    'https://everyayah.com/data/Alafasy_128kbps/002285.mp3',
    'https://everyayah.com/data/Alafasy_128kbps/002286.mp3',
    
    // Surah Al-Ikhlas (112:1-4)
    'https://everyayah.com/data/Alafasy_128kbps/112001.mp3',
    'https://everyayah.com/data/Alafasy_128kbps/112002.mp3',
    'https://everyayah.com/data/Alafasy_128kbps/112003.mp3',
    'https://everyayah.com/data/Alafasy_128kbps/112004.mp3',
    
    // Surah Al-Falaq (113:1-5)
    'https://everyayah.com/data/Alafasy_128kbps/113001.mp3',
    'https://everyayah.com/data/Alafasy_128kbps/113002.mp3',
    'https://everyayah.com/data/Alafasy_128kbps/113003.mp3',
    'https://everyayah.com/data/Alafasy_128kbps/113004.mp3',
    'https://everyayah.com/data/Alafasy_128kbps/113005.mp3',
    
    // Surah An-Nas (114:1-6)
    'https://everyayah.com/data/Alafasy_128kbps/114001.mp3',
    'https://everyayah.com/data/Alafasy_128kbps/114002.mp3',
    'https://everyayah.com/data/Alafasy_128kbps/114003.mp3',
    'https://everyayah.com/data/Alafasy_128kbps/114004.mp3',
    'https://everyayah.com/data/Alafasy_128kbps/114005.mp3',
    'https://everyayah.com/data/Alafasy_128kbps/114006.mp3'
];

// Global audio player
let currentAudio = null;
let currentButton = null;
let currentPlaylistIndex = 0;
let isPlayingPlaylist = false;

document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabName = this.dataset.tab;
            
            // Stop any playing audio when switching tabs
            stopAudio();
            
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(tabName).classList.add('active');
        });
    });
    
    // Play button functionality for individual items
    const playButtons = document.querySelectorAll('.play-btn');
    console.log('Found play buttons:', playButtons.length);
    
    playButtons.forEach((btn, index) => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Play button clicked, index:', index);
            
            const icon = this.querySelector('i');
            const isPlaying = icon.classList.contains('fa-pause');
            
            if (isPlaying) {
                // Pause current audio
                console.log('Pausing audio');
                stopAudio();
            } else {
                // Stop any other playing audio
                stopAudio();
                
                // Determine which audio to play based on index
                let audioUrl;
                switch(index) {
                    case 0: audioUrl = ruqyahAudios['fatiha']; break;
                    case 1: audioUrl = ruqyahAudios['ayat-kursi']; break;
                    case 2: audioUrl = ruqyahAudios['baqarah-end']; break;
                    case 3: audioUrl = ruqyahAudios['muawwidhaat']; break;
                    default: audioUrl = ruqyahAudios['complete']; break;
                }
                
                console.log('Playing audio:', audioUrl);
                // Play audio
                playAudio(audioUrl, this);
            }
        });
    });
    
    // Main player controls
    const mainPlayBtn = document.querySelector('.play-main');
    if (mainPlayBtn) {
        mainPlayBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Main play button clicked - Complete Ruqyah');
            
            const icon = this.querySelector('i');
            const isPlaying = icon.classList.contains('fa-pause');
            
            if (isPlaying) {
                stopAudio();
            } else {
                stopAudio();
                // Start playing complete ruqyah playlist
                playCompleteRuqyah(this);
            }
        });
    }
    
    // Progress bar click
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        progressBar.addEventListener('click', function(e) {
            if (currentAudio) {
                const rect = this.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const width = rect.width;
                const percentage = clickX / width;
                
                currentAudio.currentTime = currentAudio.duration * percentage;
            }
        });
    }
    
    // Download buttons
    const downloadButtons = document.querySelectorAll('.download-options .btn');
    downloadButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const type = this.textContent.includes('MP3') ? 'MP3' : 'PDF';
            showNotification(`جاري تحميل الرقية بصيغة ${type}...`);
            
            // In real app, this would trigger actual download
            setTimeout(() => {
                showNotification(`تم تحميل الملف بنجاح`);
            }, 2000);
        });
    });
});

// Function to play complete Ruqyah (playlist)
function playCompleteRuqyah(button) {
    console.log('Starting complete Ruqyah playlist with', completeRuqyahPlaylist.length, 'verses');
    
    currentPlaylistIndex = 0;
    isPlayingPlaylist = true;
    currentButton = button;
    
    const icon = button.querySelector('i');
    icon.classList.remove('fa-play');
    icon.classList.add('fa-pause');
    
    showNotification('بدء الرقية الشرعية الكاملة... (الفاتحة، آية الكرسي، خواتيم البقرة، المعوذات)');
    
    playNextInPlaylist();
}

// Function to play next verse in playlist
function playNextInPlaylist() {
    if (!isPlayingPlaylist || currentPlaylistIndex >= completeRuqyahPlaylist.length) {
        console.log('Playlist finished');
        stopAudio();
        showNotification('انتهت الرقية الشرعية الكاملة');
        return;
    }
    
    const url = completeRuqyahPlaylist[currentPlaylistIndex];
    console.log(`Playing verse ${currentPlaylistIndex + 1}/${completeRuqyahPlaylist.length}:`, url);
    
    try {
        currentAudio = new Audio(url);
        currentAudio.preload = "metadata";
        currentAudio.volume = 1.0;
        
        currentAudio.addEventListener('ended', function() {
            console.log('Verse ended, playing next...');
            currentPlaylistIndex++;
            playNextInPlaylist();
        });
        
        currentAudio.addEventListener('error', function(e) {
            console.error('Error playing verse:', url, e);
            // Try next verse on error
            currentPlaylistIndex++;
            playNextInPlaylist();
        });
        
        currentAudio.addEventListener('playing', function() {
            updateProgress();
        });
        
        currentAudio.play().catch(error => {
            console.error('Play error:', error);
            currentPlaylistIndex++;
            playNextInPlaylist();
        });
        
    } catch (error) {
        console.error('Error in playNextInPlaylist:', error);
        currentPlaylistIndex++;
        playNextInPlaylist();
    }
}

// Function to play audio
function playAudio(url, button) {
    console.log('playAudio called with URL:', url);
    
    // Make sure we're not in playlist mode
    isPlayingPlaylist = false;
    
    try {
        // Create new audio instance
        currentAudio = new Audio(url);
        currentButton = button;
        
        console.log('Audio object created successfully');
        
        const icon = button.querySelector('i');
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
        
        // Set audio properties (removed crossOrigin as it may cause issues)
        currentAudio.preload = "metadata";
        currentAudio.volume = 1.0;
        
        showNotification('جاري تحميل التلاوة...');
        
        // Event listeners
        currentAudio.addEventListener('loadstart', function() {
            console.log('Audio loading started');
        });
        
        currentAudio.addEventListener('loadedmetadata', function() {
            console.log('Audio metadata loaded, duration:', currentAudio.duration);
        });
        
        currentAudio.addEventListener('loadeddata', function() {
            console.log('Audio data loaded');
            showNotification('جاري التشغيل...');
        });
        
        currentAudio.addEventListener('canplay', function() {
            console.log('Audio can play');
        });
        
        currentAudio.addEventListener('playing', function() {
            console.log('Audio is now playing');
            updateProgress();
        });
        
        currentAudio.addEventListener('pause', function() {
            console.log('Audio paused');
        });
        
        currentAudio.addEventListener('ended', function() {
            console.log('Audio ended');
            stopAudio();
            showNotification('انتهت التلاوة');
        });
        
        currentAudio.addEventListener('error', function(e) {
            console.error('Audio error event:', e);
            console.error('Error details:', {
                code: currentAudio.error?.code,
                message: currentAudio.error?.message
            });
            stopAudio();
            showNotification('حدث خطأ في تحميل الصوت، يرجى المحاولة مرة أخرى');
        });
        
        // Attempt to play
        console.log('Attempting to play audio...');
        const playPromise = currentAudio.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                console.log('Audio playing successfully!');
            }).catch(error => {
                console.error('Play promise rejected:', error);
                console.error('Error name:', error.name);
                console.error('Error message:', error.message);
                stopAudio();
                
                if (error.name === 'NotAllowedError') {
                    showNotification('يرجى السماح بتشغيل الصوت في المتصفح. انقر على أيقونة القفل في شريط العنوان');
                } else if (error.name === 'NotSupportedError') {
                    showNotification('تنسيق الصوت غير مدعوم في متصفحك');
                } else {
                    showNotification('حدث خطأ: ' + error.message);
                }
            });
        }
        
    } catch (error) {
        console.error('Error in playAudio function:', error);
        console.error('Error stack:', error.stack);
        showNotification('حدث خطأ في تشغيل الصوت');
        stopAudio();
    }
}

// Function to stop audio
function stopAudio() {
    console.log('Stopping audio, isPlayingPlaylist:', isPlayingPlaylist);
    
    // Stop playlist mode
    isPlayingPlaylist = false;
    currentPlaylistIndex = 0;
    
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null;
    }
    
    if (currentButton) {
        const icon = currentButton.querySelector('i');
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
        currentButton = null;
    }
    
    // Reset all play buttons
    const playButtons = document.querySelectorAll('.play-btn, .play-main');
    playButtons.forEach(btn => {
        const icon = btn.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-play');
        }
    });
    
    // Reset progress bar
    const progress = document.querySelector('.progress');
    if (progress) {
        progress.style.width = '0%';
    }
}

// Function to update progress bar
function updateProgress() {
    if (!currentAudio) return;
    
    const progress = document.querySelector('.progress');
    const currentTimeEl = document.querySelector('.current-time');
    const durationEl = document.querySelector('.duration');
    
    const updateInterval = setInterval(() => {
        if (!currentAudio || currentAudio.paused || currentAudio.ended) {
            clearInterval(updateInterval);
            return;
        }
        
        const percentage = (currentAudio.currentTime / currentAudio.duration) * 100;
        
        if (progress) {
            progress.style.width = percentage + '%';
        }
        
        if (currentTimeEl) {
            currentTimeEl.textContent = formatTime(currentAudio.currentTime);
        }
        
        if (durationEl && !isNaN(currentAudio.duration)) {
            durationEl.textContent = formatTime(currentAudio.duration);
        }
    }, 100);
}

// Function to format time
function formatTime(seconds) {
    if (isNaN(seconds)) return '00:00';
    
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Notification function (if not available in main.js)
if (typeof showNotification !== 'function') {
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--islamic-green);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}
