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

// متغيرات Firebase العامة
let auth = null;
let db = null;
let analytics = null;
let isFirebaseEnabled = false;

// تهيئة Firebase
function initFirebase() {
    try {
        // التحقق من أن Firebase محمّل
        if (typeof firebase === 'undefined') {
            console.warn('⚠️ Firebase SDK not loaded. Using localStorage fallback.');
            return false;
        }

        // التحقق من صحة البيانات
        if (firebaseConfig.apiKey === 'YOUR_API_KEY_HERE') {
            console.warn('⚠️ Firebase not configured. Please update firebase-config.js with your project credentials.');
            return false;
        }

        // تهيئة Firebase
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        
        auth = firebase.auth();
        db = firebase.firestore();
        isFirebaseEnabled = true;
        
        console.log('✅ Firebase initialized successfully!');
        return true;
    } catch (error) {
        console.error('❌ Error initializing Firebase:', error);
        return false;
    }
}

// دوال المصادقة مع Firebase
const FirebaseAuth = {
    // تسجيل الدخول
    async signIn(email, password) {
        if (!isFirebaseEnabled) {
            throw new Error('Firebase is not enabled');
        }
        
        try {
            const userCredential = await auth.signInWithEmailAndPassword(email, password);
            const user = userCredential.user;
            
            // جلب بيانات المستخدم من Firestore
            const userDoc = await db.collection('users').doc(user.uid).get();
            
            if (userDoc.exists) {
                return {
                    uid: user.uid,
                    email: user.email,
                    ...userDoc.data()
                };
            } else {
                throw new Error('User data not found');
            }
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },

    // تسجيل مستخدم جديد
    async signUp(email, password, userData) {
        if (!isFirebaseEnabled) {
            throw new Error('Firebase is not enabled');
        }
        
        try {
            // إنشاء حساب
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;
            
            // حفظ بيانات المستخدم في Firestore
            await db.collection('users').doc(user.uid).set({
                name: userData.name,
                email: email,
                role: userData.role || 'user',
                status: 'active',
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                lastLogin: firebase.firestore.FieldValue.serverTimestamp()
            });
            
            return {
                uid: user.uid,
                email: user.email,
                name: userData.name,
                role: userData.role || 'user',
                status: 'active'
            };
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    },

    // تسجيل الخروج
    async signOut() {
        if (!isFirebaseEnabled) return;
        await auth.signOut();
    },

    // الحصول على المستخدم الحالي
    getCurrentUser() {
        return auth ? auth.currentUser : null;
    },

    // مراقبة حالة المصادقة
    onAuthStateChanged(callback) {
        if (!isFirebaseEnabled) return () => {};
        return auth.onAuthStateChanged(callback);
    }
};

// دوال قاعدة البيانات
const FirebaseDB = {
    // جلب جميع المستخدمين (للمسؤولين)
    async getAllUsers() {
        if (!isFirebaseEnabled) {
            throw new Error('Firebase is not enabled');
        }
        
        try {
            const snapshot = await db.collection('users').get();
            return snapshot.docs.map(doc => ({
                uid: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error('Error getting users:', error);
            throw error;
        }
    },

    // تحديث دور المستخدم
    async updateUserRole(userId, newRole) {
        if (!isFirebaseEnabled) {
            throw new Error('Firebase is not enabled');
        }
        
        try {
            await db.collection('users').doc(userId).update({
                role: newRole,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            return true;
        } catch (error) {
            console.error('Error updating user role:', error);
            throw error;
        }
    },

    // تحديث حالة المستخدم
    async updateUserStatus(userId, status) {
        if (!isFirebaseEnabled) {
            throw new Error('Firebase is not enabled');
        }
        
        try {
            await db.collection('users').doc(userId).update({
                status: status,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            return true;
        } catch (error) {
            console.error('Error updating user status:', error);
            throw error;
        }
    },

    // تحديث آخر تسجيل دخول
    async updateLastLogin(userId) {
        if (!isFirebaseEnabled) return;
        
        try {
            await db.collection('users').doc(userId).update({
                lastLogin: firebase.firestore.FieldValue.serverTimestamp()
            });
        } catch (error) {
            console.error('Error updating last login:', error);
        }
    }
};
