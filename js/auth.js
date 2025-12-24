// Authentication System with Firebase

// User Roles
const USER_ROLES = {
    ADMIN: 'admin',
    MODERATOR: 'moderator',
    USER: 'user'
};

// Check if user is logged in
function isLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true' && localStorage.getItem('userEmail');
}

// Check if user is admin or moderator
function isAuthorized() {
    const userRole = localStorage.getItem('userRole');
    return userRole === USER_ROLES.ADMIN || userRole === USER_ROLES.MODERATOR;
}

// Get current user data
function getCurrentUser() {
    return {
        name: localStorage.getItem('userName'),
        email: localStorage.getItem('userEmail'),
        role: localStorage.getItem('userRole') || USER_ROLES.USER,
        loginTime: localStorage.getItem('loginTime')
    };
}

// Save user to database
async function saveUserToDatabase(userData) {
    try {
        // محاكاة حفظ في قاعدة البيانات
        const users = JSON.parse(localStorage.getItem('usersDatabase') || '[]');
        
        // التحقق من عدم وجود المستخدم
        const existingUser = users.find(u => u.email === userData.email);
        if (existingUser) {
            throw new Error('البريد الإلكتروني مسجل مسبقاً');
        }
        
        // إضافة المستخدم
        const newUser = {
            id: Date.now(),
            name: userData.name,
            email: userData.email,
            password: btoa(userData.password), // تشفير بسيط (في التطبيق الحقيقي استخدم bcrypt)
            role: userData.role || USER_ROLES.USER,
            createdAt: new Date().toISOString(),
            isActive: true
        };
        
        users.push(newUser);
        localStorage.setItem('usersDatabase', JSON.stringify(users));
        
        return newUser;
    } catch (error) {
        throw error;
    }
}

// Verify user credentials
async function verifyUserCredentials(email, password) {
    try {
        const users = JSON.parse(localStorage.getItem('usersDatabase') || '[]');
        const user = users.find(u => u.email === email);
        
        if (!user) {
            throw new Error('البريد الإلكتروني غير مسجل');
        }
        
        if (!user.isActive) {
            throw new Error('الحساب معطل. يرجى التواصل مع الإدارة');
        }
        
        // فك تشفير كلمة المرور
        const decryptedPassword = atob(user.password);
        
        if (decryptedPassword !== password) {
            throw new Error('كلمة المرور غير صحيحة');
        }
        
        return user;
    } catch (error) {
        throw error;
    }
}

// Login user
async function loginUser(email, password, remember = false) {
    try {
        const user = await verifyUserCredentials(email, password);
        
        // حفظ بيانات المستخدم
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', user.name);
        localStorage.setItem('userEmail', user.email);
        localStorage.setItem('userRole', user.role);
        localStorage.setItem('userId', user.id);
        localStorage.setItem('loginTime', new Date().toISOString());
        
        if (remember) {
            localStorage.setItem('rememberMe', 'true');
        }
        
        // تحديث آخر تسجيل دخول
        const users = JSON.parse(localStorage.getItem('usersDatabase') || '[]');
        const userIndex = users.findIndex(u => u.id === user.id);
        if (userIndex !== -1) {
            users[userIndex].lastLogin = new Date().toISOString();
            localStorage.setItem('usersDatabase', JSON.stringify(users));
        }
        
        return user;
    } catch (error) {
        throw error;
    }
}

// Register new user
async function registerUser(name, email, password) {
    try {
        // التحقق من البيانات
        if (!name || name.length < 3) {
            throw new Error('الاسم يجب أن يكون 3 أحرف على الأقل');
        }
        
        if (!email || !email.includes('@')) {
            throw new Error('البريد الإلكتروني غير صحيح');
        }
        
        if (!password || password.length < 8) {
            throw new Error('كلمة المرور يجب أن تكون 8 أحرف على الأقل');
        }
        
        // حفظ المستخدم
        const userData = {
            name: name,
            email: email,
            password: password,
            role: USER_ROLES.USER // المستخدمون الجدد يحصلون على دور عادي
        };
        
        const newUser = await saveUserToDatabase(userData);
        
        // تسجيل الدخول تلقائياً
        await loginUser(email, password);
        
        return newUser;
    } catch (error) {
        throw error;
    }
}

// Logout user
function logoutUser() {
    const rememberMe = localStorage.getItem('rememberMe');
    
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    localStorage.removeItem('loginTime');
    
    if (!rememberMe) {
        localStorage.removeItem('userEmail');
    }
}

// Get all users (Admin only)
function getAllUsers() {
    if (!isAuthorized()) {
        throw new Error('غير مصرح لك بالوصول');
    }
    
    const users = JSON.parse(localStorage.getItem('usersDatabase') || '[]');
    return users.map(user => ({
        ...user,
        password: undefined // عدم إرجاع كلمة المرور
    }));
}

// Update user role (Admin only)
function updateUserRole(userId, newRole) {
    if (!isAuthorized()) {
        throw new Error('غير مصرح لك بالوصول');
    }
    
    const users = JSON.parse(localStorage.getItem('usersDatabase') || '[]');
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
        throw new Error('المستخدم غير موجود');
    }
    
    users[userIndex].role = newRole;
    users[userIndex].updatedAt = new Date().toISOString();
    localStorage.setItem('usersDatabase', JSON.stringify(users));
    
    return users[userIndex];
}

// Toggle user status (Admin only)
function toggleUserStatus(userId) {
    if (!isAuthorized()) {
        throw new Error('غير مصرح لك بالوصول');
    }
    
    const users = JSON.parse(localStorage.getItem('usersDatabase') || '[]');
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
        throw new Error('المستخدم غير موجود');
    }
    
    users[userIndex].isActive = !users[userIndex].isActive;
    users[userIndex].updatedAt = new Date().toISOString();
    localStorage.setItem('usersDatabase', JSON.stringify(users));
    
    return users[userIndex];
}

// Initialize default admin account
function initializeDefaultAdmin() {
    const users = JSON.parse(localStorage.getItem('usersDatabase') || '[]');
    
    // التحقق من وجود مدير
    const adminExists = users.some(u => u.role === USER_ROLES.ADMIN);
    
    if (!adminExists) {
        const defaultAdmin = {
            id: 1,
            name: 'المدير',
            email: 'admin@islamic-app.com',
            password: btoa('admin123456'), // كلمة المرور: admin123456
            role: USER_ROLES.ADMIN,
            createdAt: new Date().toISOString(),
            isActive: true
        };
        
        users.push(defaultAdmin);
        localStorage.setItem('usersDatabase', JSON.stringify(users));
        
        console.log('تم إنشاء حساب المدير الافتراضي:');
        console.log('البريد: admin@islamic-app.com');
        console.log('كلمة المرور: admin123456');
    }
}

// Export functions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        USER_ROLES,
        isLoggedIn,
        isAuthorized,
        getCurrentUser,
        loginUser,
        registerUser,
        logoutUser,
        getAllUsers,
        updateUserRole,
        toggleUserStatus,
        initializeDefaultAdmin
    };
}
