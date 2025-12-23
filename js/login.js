// Login Page JavaScript

// Toggle Password Visibility
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eyeIcon');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.classList.remove('fa-eye');
        eyeIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        eyeIcon.classList.remove('fa-eye-slash');
        eyeIcon.classList.add('fa-eye');
    }
}

// Login Form Submission
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const remember = document.getElementById('remember')?.checked;
            
            // Simulate login
            showNotification('جاري تسجيل الدخول...');
            
            setTimeout(() => {
                // Save to localStorage (for demo)
                if (remember) {
                    localStorage.setItem('userEmail', email);
                }
                localStorage.setItem('isLoggedIn', 'true');
                
                showNotification('تم تسجيل الدخول بنجاح!');
                
                // Redirect to dashboard
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);
            }, 1000);
        });
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const fullname = document.getElementById('fullname').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            const terms = document.getElementById('terms').checked;
            
            // Validate
            if (password !== confirmPassword) {
                showNotification('كلمة المرور غير متطابقة', 'error');
                return;
            }
            
            if (!terms) {
                showNotification('يجب الموافقة على الشروط والأحكام', 'error');
                return;
            }
            
            // Simulate registration
            showNotification('جاري إنشاء الحساب...');
            
            setTimeout(() => {
                // Save to localStorage (for demo)
                localStorage.setItem('userName', fullname);
                localStorage.setItem('userEmail', email);
                localStorage.setItem('isLoggedIn', 'true');
                
                showNotification('تم إنشاء الحساب بنجاح!');
                
                // Redirect to dashboard
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);
            }, 1000);
        });
    }
    
    // Social Login Buttons
    const socialBtns = document.querySelectorAll('.social-btn');
    socialBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const platform = this.classList.contains('google-btn') ? 'Google' : 'Facebook';
            showNotification(`جاري التوجيه إلى ${platform}...`);
            
            setTimeout(() => {
                showNotification('هذه الميزة ستكون متاحة قريباً', 'error');
            }, 1000);
        });
    });
    
    // Forgot Password
    const forgotPassword = document.querySelector('.forgot-password');
    if (forgotPassword) {
        forgotPassword.addEventListener('click', function(e) {
            e.preventDefault();
            const email = prompt('أدخل بريدك الإلكتروني:');
            if (email) {
                showNotification('تم إرسال رابط استعادة كلمة المرور إلى بريدك الإلكتروني');
            }
        });
    }
    
    // Animate elements on load
    animateLogin();
});

// Animate Login Elements
function animateLogin() {
    const formGroups = document.querySelectorAll('.form-group-login');
    formGroups.forEach((group, index) => {
        group.style.opacity = '0';
        group.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            group.style.transition = 'all 0.5s ease';
            group.style.opacity = '1';
            group.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Notification Function (if not already defined)
if (typeof showNotification !== 'function') {
    function showNotification(message, type = 'success') {
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
}

// Make togglePassword available globally
window.togglePassword = togglePassword;
