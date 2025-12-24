// Login Page JavaScript - Firebase Version

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
    console.log('🔵 Login page loaded');
    console.log('Firebase available:', typeof firebase !== 'undefined');
    console.log('FirebaseAuth available:', typeof FirebaseAuth !== 'undefined');
    console.log('window.firebaseAuth available:', typeof window.firebaseAuth !== 'undefined');
    
    const loginForm = document.getElementById('loginForm');
    
    // Wait for all Firebase components to load
    const checkAndInit = () => {
        if (typeof firebase === 'undefined') {
            console.warn('⚠️ Firebase not loaded, waiting...');
            showNotification('جاري تحميل Firebase...', 'info');
            setTimeout(checkAndInit, 500);
            return;
        }
        
        if (typeof FirebaseAuth === 'undefined') {
            console.warn('⚠️ FirebaseAuth not loaded, waiting...');
            setTimeout(checkAndInit, 500);
            return;
        }
        
        if (!window.firebaseAuth) {
            console.warn('⚠️ Firebase Auth not initialized, waiting...');
            setTimeout(checkAndInit, 500);
            return;
        }
        
        console.log('✅ All Firebase components ready');
        initLoginSystem();
    };
    
    checkAndInit();
    
    function initLoginSystem() {
        // Check if already logged in
        if (window.firebaseAuth) {
            window.firebaseAuth.onAuthStateChanged(async (user) => {
                if (user) {
                    // User is signed in, check if active
                    try {
                        const userData = await FirebaseAuth.getUserData(user.uid);
                        if (userData.success && userData.data.active) {
                            // Redirect to Quran page
                            window.location.href = 'quran.html';
                        }
                    } catch (error) {
                        console.error('Error checking user:', error);
                    }
                }
            });
        }
    
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const remember = document.getElementById('remember')?.checked || false;
            
            // Validation
            if (!email || !password) {
                showNotification('الرجاء إدخال البريد الإلكتروني وكلمة المرور', 'error');
                return;
            }
            
            try {
                showNotification('جاري تسجيل الدخول...', 'info');
                
                console.log('Attempting login for:', email);
                
                // Login with Firebase
                const result = await FirebaseAuth.loginUser(email, password, remember);
                
                console.log('Login result:', result);
                
                if (result.success) {
                    console.log('✅ Login successful!');
                    
                    // Get user data
                    const userData = await FirebaseAuth.getUserData(result.user.uid);
                    
                    console.log('User data:', userData);
                    
                    if (userData.success) {
                        if (!userData.data.active) {
                            showNotification('حسابك غير نشط. يرجى الاتصال بالإدارة', 'error');
                            await FirebaseAuth.logoutUser();
                            return;
                        }

                        showNotification(`مرحباً ${userData.data.displayName}! تم تسجيل الدخول بنجاح`, 'success');
                        
                        console.log('🚀 Redirecting to quran.html...');
                        alert('سيتم الانتقال إلى صفحة القرآن الآن!');
                        
                        // Redirect to Quran page immediately
                        window.location.href = 'quran.html';
                    } else {
                        console.error('❌ Failed to get user data');
                        showNotification('حدث خطأ في جلب بيانات المستخدم', 'error');
                    }
                } else {
                    console.error('❌ Login failed:', result.error);
                    showNotification(result.error || 'فشل تسجيل الدخول', 'error');
                }
            } catch (error) {
                console.error('Login error:', error);
                showNotification(error.message || 'حدث خطأ في تسجيل الدخول', 'error');
            }
        });
    }
    
    // Social Login Buttons
    const socialBtns = document.querySelectorAll('.social-btn');
    socialBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const platform = this.classList.contains('google-btn') ? 'Google' : 'Facebook';
            showNotification(`جاري التوجيه إلى ${platform}...`);
            
            setTimeout(() => {
                showNotification('هذه الميزة ستكون متاحة قريباً', 'info');
            }, 1000);
        });
    });
    
    // Forgot Password
    const forgotPassword = document.querySelector('.forgot-password');
    if (forgotPassword) {
        forgotPassword.addEventListener('click', async function(e) {
            e.preventDefault();
            const email = prompt('أدخل بريدك الإلكتروني:');
            if (email) {
                try {
                    if (window.firebaseAuth) {
                        await window.firebaseAuth.sendPasswordResetEmail(email);
                        showNotification('تم إرسال رابط استعادة كلمة المرور', 'success');
                    }
                } catch (error) {
                    showNotification('حدث خطأ. تحقق من البريد', 'error');
                }
            }
        });
    }
    
    // Animate elements on load
    animateLogin();
    }
}

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
