# 🔥 دليل إعداد Firebase لتطبيق رمضان قلقيلية

## الخطوة 1: إنشاء مشروع Firebase

1. اذهب إلى [Firebase Console](https://console.firebase.google.com/)
2. اضغط **Add project** (إضافة مشروع)
3. أدخل اسم المشروع: `ramadan-qalqilya`
4. اختر إعدادات Google Analytics (اختياري)
5. اضغط **Create project**

## الخطوة 2: إضافة تطبيق الويب

1. في صفحة المشروع، اضغط على أيقونة الويب `</>`
2. أدخل اسم التطبيق: `Ramadan Qalqilya Web App`
3. ✅ اختر **Also set up Firebase Hosting**
4. اضغط **Register app**
5. **انسخ بيانات firebaseConfig** - ستحتاجها!

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "ramadan-qalqilya.firebaseapp.com",
  projectId: "ramadan-qalqilya",
  storageBucket: "ramadan-qalqilya.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

## الخطوة 3: تفعيل Authentication (المصادقة)

1. في القائمة الجانبية، اذهب إلى **Build** → **Authentication**
2. اضغط **Get started**
3. اختر **Email/Password**
4. فعّل **Email/Password**
5. اضغط **Save**

### إضافة مستخدم مسؤول:
1. اذهب لتبويب **Users**
2. اضغط **Add user**
3. أدخل:
   - Email: `admin@ramadan-qalqilya.com`
   - Password: `Admin@123456`
4. اضغط **Add user**

## الخطوة 4: تفعيل Firestore Database

1. في القائمة الجانبية، اذهب إلى **Build** → **Firestore Database**
2. اضغط **Create database**
3. اختر **Start in production mode**
4. اختر موقع الخادم: `europe-west1` (أوروبا - قريب من فلسطين)
5. اضغط **Enable**

### إعداد قواعد الأمان:

اذهب لتبويب **Rules** والصق هذا:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // السماح للمستخدمين المسجلين فقط
    match /users/{userId} {
      // القراءة: المستخدم يقرأ بياناته أو المسؤول
      allow read: if request.auth != null && 
                     (request.auth.uid == userId || 
                      get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
      
      // الكتابة: المسؤول فقط
      allow write: if request.auth != null && 
                      get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // منع أي وصول آخر
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

اضغط **Publish**

## الخطوة 5: تحديث الكود

### 1. أضف Firebase SDK في HTML

أضف هذه السكريبتات قبل `</body>` في جميع صفحات HTML:

```html
<!-- Firebase SDK -->
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-auth-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js"></script>

<!-- تهيئة Firebase -->
<script src="../js/firebase-config.js"></script>
```

### 2. حدّث ملف firebase-config.js

افتح `js/firebase-config.js` واستبدل القيم:

```javascript
const firebaseConfig = {
    apiKey: "ضع_API_KEY_هنا",
    authDomain: "ramadan-qalqilya.firebaseapp.com",
    projectId: "ramadan-qalqilya",
    storageBucket: "ramadan-qalqilya.appspot.com",
    messagingSenderId: "ضع_SENDER_ID_هنا",
    appId: "ضع_APP_ID_هنا"
};
```

### 3. إنشاء أول مستخدم مسؤول في Firestore

بعد إنشاء المستخدم في Authentication، أضف وثيقة في Firestore:

1. اذهب إلى **Firestore Database**
2. اضغط **Start collection**
3. Collection ID: `users`
4. Document ID: `[نسخ UID المستخدم من Authentication]`
5. أضف الحقول:

```
name: "المسؤول"
email: "admin@ramadan-qalqilya.com"
role: "admin"
status: "active"
createdAt: [timestamp]
lastLogin: [timestamp]
```

## الخطوة 6: الاختبار

1. افتح صفحة تسجيل الدخول
2. سجل دخول بـ:
   - Email: `admin@ramadan-qalqilya.com`
   - Password: `Admin@123456`
3. يجب أن تنتقل للوحة التحكم

## ✅ انتهى!

الآن تطبيقك متصل بقاعدة بيانات حقيقية في السحابة!

## 📊 مزايا Firebase:

- ✅ **مجاني**: 50,000 قراءة/يوم و 20,000 كتابة/يوم
- ✅ **آمن**: قواعد أمان قوية
- ✅ **سريع**: خوادم عالمية
- ✅ **Real-time**: تحديثات فورية
- ✅ **سهل**: لا حاجة لسيرفر خاص

## 🆘 المساعدة

إذا واجهتك مشكلة:
1. تحقق من Console في المتصفح (F12)
2. تأكد من أن firebaseConfig صحيح
3. تأكد من تفعيل Authentication و Firestore
4. تأكد من قواعد الأمان

---

**ملاحظة مهمة:** 🔒
- لا تشارك `apiKey` الخاص بك علناً في GitHub
- يمكنك استخدام GitHub Secrets للحماية
