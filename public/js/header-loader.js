document.addEventListener('DOMContentLoaded', function() {
    // First try with absolute path
    fetch('/components/header.html')
        .then(response => {
            if (!response.ok) {
                // If absolute path fails, try relative path
                return fetch('../components/header.html');
            }
            return response;
        })
        .then(response => {
            if (!response.ok) {
                // If neither path works, try one more option
                return fetch('components/header.html');
            }
            return response;
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load header: ${response.status} ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
            // Insert the header at the start of the body
            document.body.insertAdjacentHTML('afterbegin', data);
            
            // Setup mobile menu functionality after header is loaded
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            const nav = document.querySelector('nav ul');
            
            // Get current path
            const currentPath = window.location.pathname;
            
            // Find all navigation links
            const navLinks = document.querySelectorAll('nav ul a');
            
            // Remove any existing active classes
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === currentPath || 
                    (currentPath !== '/' && link.getAttribute('href') !== '/' && currentPath.includes(link.getAttribute('href')))) {
                    link.classList.add('active');
                }
            });
            
            // Handle mobile menu
            if (mobileMenuBtn && nav) {
                // Remove any existing listeners
                const newMobileBtn = mobileMenuBtn.cloneNode(true);
                mobileMenuBtn.parentNode.replaceChild(newMobileBtn, mobileMenuBtn);
                
                // Add click listener to toggle menu
                newMobileBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    nav.classList.toggle('show');
                });
                
                // Close menu when clicking outside
                document.addEventListener('click', (e) => {
                    if (nav.classList.contains('show') && 
                        !nav.contains(e.target) && 
                        !newMobileBtn.contains(e.target)) {
                        nav.classList.remove('show');
                    }
                });

                // Close menu when clicking a link
                navLinks.forEach(link => {
                    link.addEventListener('click', () => {
                        nav.classList.remove('show');
                    });
                });
            }
        })
        .catch(error => {
            console.error('Error loading header:', error);
            // Fallback to a simple header if loading fails
            const fallbackHeader = `
            <header>
                <nav>
                    <div class="logo"><a href="/">Joe Phair</a></div>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/coaching">1:1 Coaching</a></li>
                        <li><a href="/cohort">Cohort Program</a></li>
                        <li><a href="https://modernmanrebirth.kit.com/profile" target="_blank">Blog</a></li>
                    </ul>
                </nav>
            </header>`;
            document.body.insertAdjacentHTML('afterbegin', fallbackHeader);
        });
}); 