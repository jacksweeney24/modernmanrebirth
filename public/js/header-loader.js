// Function to load and insert the header
document.addEventListener('DOMContentLoaded', function() {
    fetch('/components/header.html')
        .then(response => response.text())
        .then(data => {
            // Insert the header at the start of the body
            document.body.insertAdjacentHTML('afterbegin', data);
            
            // Setup mobile menu functionality after header is loaded
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            const nav = document.querySelector('nav ul');
            
            if (mobileMenuBtn && nav) {
                mobileMenuBtn.addEventListener('click', () => {
                    nav.classList.toggle('show');
                    // Close menu when clicking outside
                    document.addEventListener('click', (e) => {
                        if (!nav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                            nav.classList.remove('show');
                        }
                    });
                });
            }
        })
        .catch(error => console.error('Error loading header:', error));
}); 