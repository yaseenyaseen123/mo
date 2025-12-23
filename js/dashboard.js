// Dashboard JavaScript

document.addEventListener('DOMContentLoaded', function() {
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
