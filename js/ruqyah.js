// Ruqyah Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabName = this.dataset.tab;
            
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(tabName).classList.add('active');
        });
    });
    
    // Play button functionality
    const playButtons = document.querySelectorAll('.play-btn');
    playButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            const isPlaying = icon.classList.contains('fa-pause');
            
            // Reset all play buttons
            playButtons.forEach(b => {
                const i = b.querySelector('i');
                i.classList.remove('fa-pause');
                i.classList.add('fa-play');
            });
            
            if (!isPlaying) {
                icon.classList.remove('fa-play');
                icon.classList.add('fa-pause');
                showNotification('جاري تشغيل الرقية...');
                
                // In real app, this would trigger audio playback
                setTimeout(() => {
                    icon.classList.remove('fa-pause');
                    icon.classList.add('fa-play');
                }, 5000);
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
                icon.classList.remove('fa-pause');
                icon.classList.add('fa-play');
                showNotification('تم إيقاف التشغيل');
            } else {
                icon.classList.remove('fa-play');
                icon.classList.add('fa-pause');
                showNotification('جاري تشغيل الرقية الكاملة...');
            }
        });
    }
    
    // Progress bar click
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        progressBar.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const width = rect.width;
            const percentage = (clickX / width) * 100;
            
            const progress = this.querySelector('.progress');
            progress.style.width = percentage + '%';
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
    
    // Auto-play progress simulation
    let progressInterval;
    const startProgress = () => {
        const progress = document.querySelector('.progress');
        const timeStart = document.querySelector('.time-info span:first-child');
        
        if (!progress || !timeStart) return;
        
        let currentTime = 0;
        const duration = 45 * 60 + 30; // 45:30 in seconds
        
        progressInterval = setInterval(() => {
            currentTime++;
            const percentage = (currentTime / duration) * 100;
            progress.style.width = percentage + '%';
            
            const minutes = Math.floor(currentTime / 60);
            const seconds = currentTime % 60;
            timeStart.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            
            if (currentTime >= duration) {
                clearInterval(progressInterval);
                const mainPlayIcon = document.querySelector('.play-main i');
                if (mainPlayIcon) {
                    mainPlayIcon.classList.remove('fa-pause');
                    mainPlayIcon.classList.add('fa-play');
                }
            }
        }, 1000);
    };
    
    // Listen for main play button
    if (mainPlayBtn) {
        mainPlayBtn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-pause')) {
                startProgress();
            } else {
                if (progressInterval) clearInterval(progressInterval);
            }
        });
    }
});
