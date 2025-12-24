// Firebase Configuration
// Ramadan Qalqilya Project
const firebaseConfig = {
    apiKey: "AIzaSyBYawGRectZWAaCSADTIJzZWZ1NgKY0g-k",
    authDomain: "ramadan-qalqilya.firebaseapp.com",
    projectId: "ramadan-qalqilya",
    storageBucket: "ramadan-qalqilya.firebasestorage.app",
    messagingSenderId: "969700595208",
    appId: "1:969700595208:web:7a29c2a0b061e6b27123bd",
    measurementId: "G-P5ZY7M36HZ"
};

// Initialize Firebase
if (typeof firebase !== 'undefined') {
    try {
        // Initialize Firebase App
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
            console.log('✅ Firebase App initialized');
        }
        
        // Initialize Firebase services
        window.firebaseAuth = firebase.auth();
        window.firebaseDb = firebase.firestore();
        window.firebaseAnalytics = firebase.analytics();
        
        console.log('✅ Firebase services ready');
    } catch (error) {
        console.error('❌ Firebase initialization error:', error);
    }
} else {
    console.warn('⚠️ Firebase SDK not loaded');
}

