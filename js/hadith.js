// Hadith Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Category Filter
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
            const selectedCategory = this.value;
            const hadithItems = document.querySelectorAll('.hadith-item');
            
            hadithItems.forEach(item => {
                if (selectedCategory === 'all' || item.dataset.category === selectedCategory) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
    
    // Search functionality
    const searchInput = document.getElementById('hadithSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const hadithItems = document.querySelectorAll('.hadith-item');
            
            hadithItems.forEach(item => {
                const hadithText = item.querySelector('.hadith-text p').textContent.toLowerCase();
                const narrator = item.querySelector('.hadith-info p:first-child').textContent.toLowerCase();
                
                if (hadithText.includes(searchTerm) || narrator.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
    
    // Copy, Share, Bookmark functionality
    document.querySelectorAll('.hadith-item').forEach(item => {
        const actions = item.querySelector('.hadith-actions');
        if (!actions) return;
        
        const copyBtn = actions.querySelector('.btn-icon:nth-child(1)');
        const shareBtn = actions.querySelector('.btn-icon:nth-child(2)');
        const bookmarkBtn = actions.querySelector('.btn-icon:nth-child(3)');
        
        const hadithText = item.querySelector('.hadith-text p').textContent;
        const narrator = item.querySelector('.hadith-info p:first-child').textContent;
        const source = item.querySelector('.hadith-info p:nth-child(2)').textContent;
        
        const fullText = `${hadithText}\n\n${narrator}\n${source}`;
        
        // Copy
        if (copyBtn) {
            copyBtn.addEventListener('click', function() {
                copyToClipboard(fullText);
            });
        }
        
        // Share
        if (shareBtn) {
            shareBtn.addEventListener('click', function() {
                shareContent('حديث نبوي شريف', fullText);
            });
        }
        
        // Bookmark
        if (bookmarkBtn) {
            bookmarkBtn.addEventListener('click', function() {
                const isBookmarked = this.classList.toggle('bookmarked');
                this.style.color = isBookmarked ? '#d4af37' : '';
                
                // Save to localStorage
                const bookmarks = JSON.parse(localStorage.getItem('hadithBookmarks') || '[]');
                if (isBookmarked) {
                    bookmarks.push(fullText);
                } else {
                    const index = bookmarks.indexOf(fullText);
                    if (index > -1) bookmarks.splice(index, 1);
                }
                localStorage.setItem('hadithBookmarks', JSON.stringify(bookmarks));
                
                showNotification(isBookmarked ? 'تم إضافة الحديث للمفضلة' : 'تم إزالة الحديث من المفضلة');
            });
            
            // Check if already bookmarked
            const bookmarks = JSON.parse(localStorage.getItem('hadithBookmarks') || '[]');
            if (bookmarks.includes(fullText)) {
                bookmarkBtn.classList.add('bookmarked');
                bookmarkBtn.style.color = '#d4af37';
            }
        }
    });
});
