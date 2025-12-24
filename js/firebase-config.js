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

// Initialize Firebase immediately
function initializeFirebase() {
    if (typeof firebase === 'undefined') {
        console.error('❌ Firebase SDK not loaded');
        return false;
    }

    try {
        // Initialize Firebase App
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
            console.log('✅ Firebase App initialized');
        }
        
        // Initialize Firebase services
        window.firebaseAuth = firebase.auth();
        window.firebaseDb = firebase.firestore();
        
        // Initialize Analytics only if available
        try {
            window.firebaseAnalytics = firebase.analytics();
        } catch (e) {
            console.warn('⚠️ Analytics not available');
        }
        
        console.log('✅ Firebase services initialized');
        console.log('✅ window.firebaseAuth:', typeof window.firebaseAuth);
        console.log('✅ window.firebaseDb:', typeof window.firebaseDb);
        
        return true;
    } catch (error) {
        console.error('❌ Firebase initialization error:', error);
        return false;
    }
}

// Try to initialize immediately
if (typeof firebase !== 'undefined') {
    initializeFirebase();
} else {
    console.warn('⚠️ Firebase not loaded yet, will retry...');
    // Retry after a short delay
    setTimeout(() => {
        if (typeof firebase !== 'undefined') {
            initializeFirebase();
        } else {
            console.error('❌ Firebase failed to load after retry');
        }
    }, 500);
}

