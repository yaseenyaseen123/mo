// Firebase Authentication System
// Requires firebase-config.js to be loaded first

const FirebaseAuth = {
    // User Roles
    USER_ROLES: {
        ADMIN: 'admin',
        MODERATOR: 'moderator',
        USER: 'user'
    },

    // Register new user
    async registerUser(email, password, displayName) {
        try {
            // Create user in Firebase Auth
            const userCredential = await window.firebaseAuth.createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;

            // Update profile
            await user.updateProfile({ displayName: displayName });

            // Create user document in Firestore
            await window.firebaseDb.collection('users').doc(user.uid).set({
                uid: user.uid,
                email: email,
                displayName: displayName,
                role: this.USER_ROLES.USER,
                active: true,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                lastLogin: firebase.firestore.FieldValue.serverTimestamp()
            });

            console.log('✅ User registered:', email);
            return { success: true, user: user };
        } catch (error) {
            console.error('❌ Registration error:', error);
            return { success: false, error: this.getErrorMessage(error.code) };
        }
    },

    // Login user
    async loginUser(email, password, rememberMe = false) {
        try {
            // Set persistence
            const persistence = rememberMe 
                ? firebase.auth.Auth.Persistence.LOCAL 
                : firebase.auth.Auth.Persistence.SESSION;
            
            await window.firebaseAuth.setPersistence(persistence);

            // Sign in
            const userCredential = await window.firebaseAuth.signInWithEmailAndPassword(email, password);
            const user = userCredential.user;

            // Update last login
            await window.firebaseDb.collection('users').doc(user.uid).update({
                lastLogin: firebase.firestore.FieldValue.serverTimestamp()
            });

            console.log('✅ User logged in:', email);
            return { success: true, user: user };
        } catch (error) {
            console.error('❌ Login error:', error);
            return { success: false, error: this.getErrorMessage(error.code) };
        }
    },

    // Logout user
    async logoutUser() {
        try {
            await window.firebaseAuth.signOut();
            console.log('✅ User logged out');
            return { success: true };
        } catch (error) {
            console.error('❌ Logout error:', error);
            return { success: false, error: error.message };
        }
    },

    // Get current user
    getCurrentUser() {
        return window.firebaseAuth.currentUser;
    },

    // Get user data from Firestore
    async getUserData(uid) {
        try {
            const doc = await window.firebaseDb.collection('users').doc(uid).get();
            if (doc.exists) {
                return { success: true, data: doc.data() };
            } else {
                return { success: false, error: 'المستخدم غير موجود' };
            }
        } catch (error) {
            console.error('❌ Get user data error:', error);
            return { success: false, error: error.message };
        }
    },

    // Get all users (admin only)
    async getAllUsers() {
        try {
            const snapshot = await window.firebaseDb.collection('users').get();
            const users = [];
            snapshot.forEach(doc => {
                users.push({ id: doc.id, ...doc.data() });
            });
            return { success: true, users: users };
        } catch (error) {
            console.error('❌ Get all users error:', error);
            return { success: false, error: error.message };
        }
    },

    // Update user role (admin only)
    async updateUserRole(uid, newRole) {
        try {
            await window.firebaseDb.collection('users').doc(uid).update({
                role: newRole,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            console.log('✅ User role updated:', uid, newRole);
            return { success: true };
        } catch (error) {
            console.error('❌ Update role error:', error);
            return { success: false, error: error.message };
        }
    },

    // Toggle user status (admin only)
    async toggleUserStatus(uid, active) {
        try {
            await window.firebaseDb.collection('users').doc(uid).update({
                active: active,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            console.log('✅ User status updated:', uid, active);
            return { success: true };
        } catch (error) {
            console.error('❌ Toggle status error:', error);
            return { success: false, error: error.message };
        }
    },

    // Check if user is admin
    async isAdmin(uid) {
        const result = await this.getUserData(uid);
        if (result.success) {
            return result.data.role === this.USER_ROLES.ADMIN;
        }
        return false;
    },

    // Auth state observer
    onAuthStateChanged(callback) {
        return window.firebaseAuth.onAuthStateChanged(callback);
    },

    // Error messages in Arabic
    getErrorMessage(errorCode) {
        const messages = {
            'auth/email-already-in-use': 'البريد الإلكتروني مستخدم بالفعل',
            'auth/invalid-email': 'البريد الإلكتروني غير صالح',
            'auth/operation-not-allowed': 'العملية غير مسموحة',
            'auth/weak-password': 'كلمة المرور ضعيفة جداً (6 أحرف على الأقل)',
            'auth/user-disabled': 'هذا الحساب معطل',
            'auth/user-not-found': 'البريد الإلكتروني غير مسجل',
            'auth/wrong-password': 'كلمة المرور غير صحيحة',
            'auth/too-many-requests': 'محاولات كثيرة، حاول لاحقاً',
            'auth/network-request-failed': 'خطأ في الاتصال بالإنترنت'
        };
        return messages[errorCode] || 'حدث خطأ غير متوقع';
    }
};

// Export to window
window.FirebaseAuth = FirebaseAuth;
