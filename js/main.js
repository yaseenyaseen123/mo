// Main JavaScript File for Islamic Web App

// التحقق من حالة تسجيل الدخول وعرض اسم المستخدم
function updateUserDisplay() {
    const loginBtn = document.querySelector('.login-btn');
    
    if (!loginBtn) return;
    
    // التحقق من تسجيل الدخول
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userName = localStorage.getItem('userName');
    const userRole = localStorage.getItem('userRole');
    
    if (isLoggedIn && userName) {
        // التحقق من الصلاحية لعرض لوحة التحكم
        const isDashboardAllowed = userRole === 'admin' || userRole === 'moderator';
        
        // تحديد المسار الصحيح حسب الصفحة الحالية
        const currentPath = window.location.pathname;
        const isInPagesFolder = currentPath.includes('/pages/');
        const dashboardPath = isInPagesFolder ? 'dashboard.html' : 'pages/dashboard.html';
        
        // إنشاء قائمة المستخدم
        const userMenu = document.createElement('li');
        userMenu.className = 'user-menu-item';
        userMenu.innerHTML = `
            <a href="#" class="user-profile-link">
                <i class="fas fa-user-circle"></i>
                <span>${userName}</span>
            </a>
            <div class="user-dropdown">
                ${isDashboardAllowed ? `<a href="${dashboardPath}"><i class="fas fa-dashboard"></i> لوحة التحكم</a>` : ''}
                <a href="#" onclick="logoutUser()"><i class="fas fa-sign-out-alt"></i> تسجيل الخروج</a>
            </div>
        `;
        
        // استبدال زر الدخول بقائمة المستخدم
        const loginLi = loginBtn.parentElement;
        loginLi.parentElement.replaceChild(userMenu, loginLi);
        
        // إضافة الأنماط للقائمة المنسدلة
        addUserMenuStyles();
    }
}

// إضافة أنماط القائمة المنسدلة
function addUserMenuStyles() {
    if (!document.getElementById('user-menu-styles')) {
        const style = document.createElement('style');
        style.id = 'user-menu-styles';
        style.textContent = `
            .user-menu-item {
                position: relative;
            }
            
            .user-profile-link {
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            
            .user-dropdown {
                display: none;
                position: absolute;
                top: 100%;
                right: 0;
                background: var(--bg-card);
                border-radius: 8px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                min-width: 200px;
                padding: 0.5rem 0;
                z-index: 1000;
                margin-top: 0.5rem;
            }
            
            body.dark-mode .user-dropdown {
                background: linear-gradient(135deg, rgba(26, 77, 51, 0.95), rgba(15, 61, 42, 0.95));
                border: 1px solid rgba(72, 199, 116, 0.2);
            }
            
            .user-dropdown a {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.75rem 1rem;
                color: var(--text-primary);
                text-decoration: none;
                transition: all 0.3s ease;
            }
            
            .user-dropdown a:hover {
                background: rgba(72, 199, 116, 0.1);
                color: var(--islamic-green);
            }
            
            .user-menu-item:hover .user-dropdown {
                display: block;
            }
        `;
        document.head.appendChild(style);
    }
}

// تسجيل الخروج
window.logoutUser = function() {
    if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userId');
        localStorage.removeItem('loginTime');
        
        showNotification('تم تسجيل الخروج بنجاح');
        
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }
};

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    // تحديث عرض المستخدم
    updateUserDisplay();
    
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
