// Simple script to add classes and handle animations
document.addEventListener('DOMContentLoaded', function() {
  console.log('Cohort.js script loaded successfully');
  
  // Set a flag to indicate script is loaded
  window.cohortScriptLoaded = true;
  
  // Add a class to body to indicate JS is loaded
  document.body.classList.add('js-loaded');
  
  // Make all .guide elements have hover animation
  const guideCards = document.querySelectorAll('.guide');
  guideCards.forEach(card => {
    // Add hover class on mouseenter
    card.addEventListener('mouseenter', function() {
      this.classList.add('active');
    });
    
    // Remove hover class on mouseleave
    card.addEventListener('mouseleave', function() {
      this.classList.remove('active');
    });
  });
  
  // Add smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}); 