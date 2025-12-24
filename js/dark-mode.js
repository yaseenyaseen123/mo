// Dark Mode Toggle System - نظام الوضع المظلم
// بارك الله فيكم 🌙

class DarkModeManager {
    constructor() {
        this.darkModeKey = 'islamicAppDarkMode';
        this.init();
    }

    init() {
        // Load saved preference
        this.loadPreference();
        
        // Create toggle button
        this.createToggleButton();
        
        // Add event listeners
        this.setupEventListeners();
        
        // Apply initial mode
        this.applyMode();
    }

    loadPreference() {
        // Check localStorage for saved preference
        const savedMode = localStorage.getItem(this.darkModeKey);
        
        if (savedMode !== null) {
            this.isDarkMode = savedMode === 'true';
        } else {
            // Check system preference
            this.isDarkMode = window.matchMedia && 
                             window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
    }

    savePreference() {
        localStorage.setItem(this.darkModeKey, this.isDarkMode.toString());
    }

    createToggleButton() {
        // Create toggle button element
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'dark-mode-toggle';
        toggleBtn.setAttribute('aria-label', 'تبديل الوضع المظلم');
        toggleBtn.setAttribute('title', 'تبديل الوضع المظلم / العادي');
        
        // Add icons
        toggleBtn.innerHTML = `
            <i class="fas fa-sun icon-sun"></i>
            <i class="fas fa-moon icon-moon"></i>
        `;
        
        // Add to body
        document.body.appendChild(toggleBtn);
        
        this.toggleBtn = toggleBtn;
    }

    setupEventListeners() {
        // Toggle button click
        this.toggleBtn.addEventListener('click', () => {
            this.toggle();
        });

        // Keyboard shortcut: Ctrl/Cmd + Shift + D
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
                e.preventDefault();
                this.toggle();
            }
        });

        // Listen for system theme changes
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)')
                .addEventListener('change', (e) => {
                    // Only auto-switch if user hasn't set a preference
                    if (localStorage.getItem(this.darkModeKey) === null) {
                        this.isDarkMode = e.matches;
                        this.applyMode();
                    }
                });
        }
    }

    toggle() {
        this.isDarkMode = !this.isDarkMode;
        this.applyMode();
        this.savePreference();
        this.showNotification();
    }

    applyMode() {
        if (this.isDarkMode) {
            document.body.classList.add('dark-mode');
            this.updateMetaThemeColor('#1a1a1a');
        } else {
            document.body.classList.remove('dark-mode');
            this.updateMetaThemeColor('#1e5a3e');
        }

        // Trigger custom event for other components
        const event = new CustomEvent('darkModeChanged', { 
            detail: { isDarkMode: this.isDarkMode } 
        });
        document.dispatchEvent(event);
    }

    updateMetaThemeColor(color) {
        // Update meta theme-color for mobile browsers
        let metaTheme = document.querySelector('meta[name="theme-color"]');
        if (!metaTheme) {
            metaTheme = document.createElement('meta');
            metaTheme.setAttribute('name', 'theme-color');
            document.head.appendChild(metaTheme);
        }
        metaTheme.setAttribute('content', color);
    }

    showNotification() {
        const message = this.isDarkMode 
            ? '🌙 تم التبديل إلى الوضع المظلم' 
            : '☀️ تم التبديل إلى الوضع العادي';
        
        // Use existing notification system if available
        if (typeof window.showNotification === 'function') {
            window.showNotification(message);
        } else {
            // Fallback: simple notification
            this.showSimpleNotification(message);
        }
    }

    showSimpleNotification(message) {
        // Create simple notification
        const notification = document.createElement('div');
        notification.className = 'dark-mode-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 100px;
            right: 30px;
            background: var(--islamic-green);
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 4px 15px var(--shadow-color);
            z-index: 10000;
            font-family: 'Cairo', sans-serif;
            animation: slideInRight 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Public method to get current mode
    getCurrentMode() {
        return this.isDarkMode;
    }

    // Public method to set mode programmatically
    setMode(isDark) {
        this.isDarkMode = isDark;
        this.applyMode();
        this.savePreference();
    }
}

// Initialize Dark Mode Manager when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDarkMode);
} else {
    initDarkMode();
}

function initDarkMode() {
    window.darkModeManager = new DarkModeManager();
}

// Add animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DarkModeManager;
}
