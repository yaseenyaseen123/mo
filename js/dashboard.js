// Dashboard JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // تحميل بيانات المستخدمين
    loadUsersData();
    
    // Sidebar Navigation
    const navItems = document.querySelectorAll('.sidebar-nav .nav-item');
    const sections = document.querySelectorAll('.dashboard-section');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            // Remove active class from all items and sections
            navItems.forEach(nav => nav.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked item and target section
            this.classList.add('active');
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });
    
    // Modal Functions
    window.openAddHadithModal = function() {
        document.getElementById('addHadithModal').classList.add('active');
    };
    
    window.closeAddHadithModal = function() {
        document.getElementById('addHadithModal').classList.remove('active');
    };
    
    // Form Submission
    const addHadithForm = document.getElementById('addHadithForm');
    if (addHadithForm) {
        addHadithForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            
            // In real app, send to server
            showNotification('تم إضافة الحديث بنجاح');
            closeAddHadithModal();
            this.reset();
            
            // Reload table (in real app, this would fetch from server)
            setTimeout(() => {
                location.reload();
            }, 1500);
        });
    }
    
    // Delete buttons
    document.querySelectorAll('.data-table .btn-icon[title="حذف"]').forEach(btn => {
        btn.addEventListener('click', function() {
            if (confirm('هل أنت متأكد من حذف هذا العنصر؟')) {
                const row = this.closest('tr');
                row.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => {
                    row.remove();
                    showNotification('تم الحذف بنجاح');
                }, 300);
            }
        });
    });
    
    // Edit buttons
    document.querySelectorAll('.data-table .btn-icon[title="تعديل"]').forEach(btn => {
        btn.addEventListener('click', function() {
            showNotification('سيتم فتح نافذة التعديل قريباً', 'error');
        });
    });
    
    // Settings forms
    document.querySelectorAll('.settings-form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('تم حفظ الإعدادات بنجاح');
        });
    });
    
    // Stats Animation
    const animateValue = (element, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value.toLocaleString('ar-EG');
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };
    
    // Animate stat numbers when they come into view
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('.stat-number');
                if (statNumber && !statNumber.dataset.animated) {
                    const finalValue = parseInt(statNumber.textContent.replace(/,/g, ''));
                    statNumber.textContent = '0';
                    animateValue(statNumber, 0, finalValue, 2000);
                    statNumber.dataset.animated = 'true';
                }
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.stat-card').forEach(card => {
        statObserver.observe(card);
    });
    
    // Chart placeholder (in real app, use Chart.js or similar)
    const chartPlaceholder = document.querySelector('.chart-placeholder');
    if (chartPlaceholder) {
        chartPlaceholder.innerHTML = `
            <div style="text-align: center; color: var(--text-light);">
                <i class="fas fa-chart-line" style="font-size: 4rem; margin-bottom: 1rem; opacity: 0.3;"></i>
                <p>الرسم البياني سيتم عرضه هنا</p>
            </div>
        `;
    }
});

// تحميل بيانات المستخدمين من قاعدة البيانات
function loadUsersData() {
    try {
        // جلب جميع المستخدمين من نظام المصادقة
        const users = getAllUsers();
        
        // تحديث الإحصائيات
        updateUsersStats(users);
        
        // عرض المستخدمين في الجدول
        displayUsersTable(users);
    } catch (error) {
        console.error('خطأ في تحميل بيانات المستخدمين:', error);
    }
}

// تحديث إحصائيات المستخدمين
function updateUsersStats(users) {
    const totalUsers = users.length;
    const adminCount = users.filter(u => u.role === 'admin' || u.role === 'moderator').length;
    const activeUsers = users.filter(u => u.isActive).length;
    
    const totalElement = document.getElementById('totalUsersCount');
    const adminElement = document.getElementById('adminCount');
    const activeElement = document.getElementById('activeUsersCount');
    
    if (totalElement) totalElement.textContent = totalUsers;
    if (adminElement) adminElement.textContent = adminCount;
    if (activeElement) activeElement.textContent = activeUsers;
}

// عرض المستخدمين في الجدول
function displayUsersTable(users) {
    const tbody = document.getElementById('usersTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    users.forEach((user, index) => {
        const row = document.createElement('tr');
        
        // تحديد لون الشارة حسب الدور
        let badgeClass = 'badge-primary';
        let roleText = 'عضو';
        
        if (user.role === 'admin') {
            badgeClass = 'badge-danger';
            roleText = 'مدير';
        } else if (user.role === 'moderator') {
            badgeClass = 'badge-warning';
            roleText = 'مشرف';
        }
        
        // تحديد حالة المستخدم
        const statusBadge = user.isActive 
            ? '<span class="badge badge-success">نشط</span>' 
            : '<span class="badge badge-secondary">معطل</span>';
        
        // تنسيق التاريخ
        const dateFormatted = new Date(user.createdAt).toLocaleDateString('ar-EG', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td><span class="badge ${badgeClass}">${roleText}</span></td>
            <td>${statusBadge}</td>
            <td>${dateFormatted}</td>
            <td>
                <select class="role-select" onchange="changeUserRole('${user.email}', this.value)" ${user.role === 'admin' ? 'disabled' : ''}>
                    <option value="user" ${user.role === 'user' ? 'selected' : ''}>عضو</option>
                    <option value="moderator" ${user.role === 'moderator' ? 'selected' : ''}>مشرف</option>
                    <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>مدير</option>
                </select>
                <button class="btn-icon" onclick="toggleUserStatus('${user.email}')" title="${user.isActive ? 'تعطيل' : 'تفعيل'}">
                    <i class="fas ${user.isActive ? 'fa-ban' : 'fa-check'}"></i>
                </button>
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

// تغيير دور المستخدم
window.changeUserRole = function(email, newRole) {
    if (confirm(`هل أنت متأكد من تغيير صلاحية هذا المستخدم إلى "${newRole}"؟`)) {
        try {
            updateUserRole(email, newRole);
            showNotification('تم تحديث صلاحية المستخدم بنجاح');
            loadUsersData(); // إعادة تحميل البيانات
        } catch (error) {
            showNotification(error.message, 'error');
        }
    }
};

// تبديل حالة المستخدم (نشط/معطل)
window.toggleUserStatus = function(email) {
    try {
        toggleUserStatus(email);
        showNotification('تم تحديث حالة المستخدم بنجاح');
        loadUsersData(); // إعادة تحميل البيانات
    } catch (error) {
        showNotification(error.message, 'error');
    }
};

// Add fadeOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: scale(1);
        }
        to {
            opacity: 0;
            transform: scale(0.8);
        }
    }
`;
document.head.appendChild(style);
