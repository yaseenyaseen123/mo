// Login Success Handler - يُحمل بعد تسجيل الدخول الناجح

document.addEventListener('DOMContentLoaded', function() {
    // التحقق من حالة تسجيل الدخول
    const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
    const userName = localStorage.getItem('userName');
    
    if (isLoggedIn && userName) {
        console.log('المستخدم مسجل دخول:', userName);
        
        // التحقق من إذن الموقع
        setTimeout(() => {
            checkAndRequestLocation();
        }, 1000);
    }
});

// التحقق وطلب إذن الموقع
function checkAndRequestLocation() {
    const permissionGranted = localStorage.getItem('locationPermissionGranted');
    const permissionAsked = localStorage.getItem('locationPermissionAsked');
    
    // إذا لم يُسأل المستخدم من قبل
    if (permissionGranted !== 'true' && permissionAsked !== 'true') {
        // عرض نافذة طلب الإذن
        if (typeof checkLocationPermissionAfterLogin === 'function') {
            checkLocationPermissionAfterLogin();
        }
    }
}
