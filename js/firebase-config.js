// Firebase Configuration
const firebaseConfig = {
    // سيتم إضافة بيانات Firebase هنا
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// للتفعيل: استبدل القيم أعلاه ببيانات مشروعك من Firebase Console
// https://console.firebase.google.com

// تهيئة Firebase (سيتم تحميلها من CDN)
let auth, db;

// تهيئة Firebase عند تحميل الصفحة
function initFirebase() {
    if (typeof firebase !== 'undefined') {
        firebase.initializeApp(firebaseConfig);
        auth = firebase.auth();
        db = firebase.firestore();
        return true;
    }
    return false;
}

export { firebaseConfig, initFirebase, auth, db };
