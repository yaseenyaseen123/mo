// Main JavaScript File for Islamic Web App

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            }
        });
    }, observerOptions);

    // Observe all cards
    document.querySelectorAll('.feature-card, .prayer-card, .stat-card').forEach(card => {
        observer.observe(card);
    });
});

// Notification Function
window.showNotification = function(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === 'success' ? '#27ae60' : '#e74c3c'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 9999;
        animation: slideDown 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideUp 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Copy to Clipboard Function
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('تم النسخ بنجاح');
    }).catch(() => {
        showNotification('فشل النسخ', 'error');
    });
}

// Share Function
function shareContent(title, text) {
    if (navigator.share) {
        navigator.share({
            title: title,
            text: text
        }).then(() => {
            showNotification('تمت المشاركة بنجاح');
        }).catch(console.error);
    } else {
        copyToClipboard(text);
        showNotification('تم نسخ النص للمشاركة');
    }
}

// Add CSS animations
if (!document.getElementById('main-animations-style')) {
    const animationsStyle = document.createElement('style');
    animationsStyle.id = 'main-animations-style';
    animationsStyle.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
    
    @keyframes slideUp {
        from {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        to {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
    }
    
    @media (max-width: 768px) {
        .nav-menu.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            right: 0;
            left: 0;
            background: linear-gradient(135deg, var(--primary-color) 0%, var(--dark-green) 100%);
            padding: 1rem;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }
    }
`;
    document.head.appendChild(animationsStyle);
}
