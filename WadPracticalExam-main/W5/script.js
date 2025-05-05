document.addEventListener("DOMContentLoaded", function() {
    const categoryLinks = document.querySelectorAll('.category-link');
    const productCards = document.querySelectorAll('.product-card');
    
    // Add click event to category links
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            categoryLinks.forEach(l => l.classList.remove('active-category'));
            
            // Add active class to clicked link
            this.classList.add('active-category');
            
            const selectedCategory = this.getAttribute('data-category');
            
            // Filter products
            productCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (selectedCategory === 'all' || selectedCategory === cardCategory) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Set "All Products" as active by default
    document.querySelector('[data-category="all"]').classList.add('active-category');
});
