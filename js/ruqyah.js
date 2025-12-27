// Ruqyah Page JavaScript

// Audio URLs from reliable Islamic sources
const ruqyahAudios = {
    'fatiha': 'https://server8.mp3quran.net/ahmad_huth/001.mp3',
    'ayat-kursi': 'https://server8.mp3quran.net/ahmad_huth/002.mp3',
    'baqarah-end': 'https://server8.mp3quran.net/ahmad_huth/002.mp3',
    'muawwidhaat': 'https://server8.mp3quran.net/ahmad_huth/112.mp3',
    'complete': 'https://server11.mp3quran.net/sds/Rewayat-Hafs-A-n-Assem/Ruqia.mp3'
};

// Global audio player
let currentAudio = null;
let currentButton = null;

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
    playButtons.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            const isPlaying = icon.classList.contains('fa-pause');
            
            if (isPlaying) {
                // Pause current audio
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
                
                // Play audio
                playAudio(audioUrl, this);
            }
        });
    });
    
    // Main player controls
    const mainPlayBtn = document.querySelector('.play-main');
    if (mainPlayBtn) {
        mainPlayBtn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            const isPlaying = icon.classList.contains('fa-pause');
            
            if (isPlaying) {
                stopAudio();
            } else {
                stopAudio();
                playAudio(ruqyahAudios['complete'], this);
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

// Function to play audio
function playAudio(url, button) {
    try {
        currentAudio = new Audio(url);
        currentButton = button;
        
        const icon = button.querySelector('i');
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
        
        showNotification('جاري تحميل التلاوة...');
        
        currentAudio.addEventListener('loadeddata', function() {
            showNotification('جاري التشغيل...');
        });
        
        currentAudio.addEventListener('playing', function() {
            updateProgress();
        });
        
        currentAudio.addEventListener('ended', function() {
            stopAudio();
            showNotification('انتهت التلاوة');
        });
        
        currentAudio.addEventListener('error', function(e) {
            console.error('Audio error:', e);
            stopAudio();
            showNotification('حدث خطأ في تحميل الصوت، يرجى المحاولة مرة أخرى');
        });
        
        currentAudio.play().catch(error => {
            console.error('Play error:', error);
            stopAudio();
            showNotification('يرجى السماح بتشغيل الصوت في المتصفح');
        });
        
    } catch (error) {
        console.error('Error creating audio:', error);
        showNotification('حدث خطأ في تشغيل الصوت');
    }
}

// Function to stop audio
function stopAudio() {
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
