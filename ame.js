const observerOptions = {
  threshold: 0.5 
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
      const target = entry.target; // This is the .reveal-image
      const section = target.closest('section');
      
      // Safety check if no section exists
      if (!section) return;

      const words = section.querySelectorAll('.char');
      const fadeElements = section.querySelectorAll('.text-fade');
      const slideDownElements = section.querySelectorAll('.element-slide');

      // Check if this section has already performed its text animation
      const hasAnimated = section.getAttribute('data-animated') === 'true';

      if (entry.isIntersecting) {
          // 1. Image Animation (ALWAYS runs when entering)
          anime({
              targets: target,
              filter: 'grayscale(0%)',
              scale: 1.1,
              duration: 1200,
              easing: 'easeOutExpo'
          });

          // 2. Text Animations (ONLY runs if it hasn't animated yet)
          if (!hasAnimated) {
              anime({
                  targets: words,
                  translateY: [60, 0],
                  opacity: [0, 1],
                  delay: anime.stagger(80, {start: 200}),
                  duration: 900,
                  easing: 'easeOutExpo'
              });

              anime({
                  targets: fadeElements,
                  translateY: [30, 0],
                  opacity: [0, 1],
                  delay: anime.stagger(150, {start: 600}),
                  duration: 1100,
                  easing: 'easeOutCubic'
              });

              anime({
                  targets: slideDownElements,
                  translateY: [-50, 0],
                  opacity: [0, 1],
                  delay: anime.stagger(250, {start: 800}),
                  duration: 1200,
                  easing: 'easeOutQuint'
              });

              // Mark this section as "done" so text never resets or re-animates
              section.setAttribute('data-animated', 'true');
          }
      } else {
          // EXIT LOGIC: Only reset the image, leave the text alone
          anime({
              targets: target,
              filter: 'grayscale(100%)',
              scale: 1.0,
              duration: 600,
              easing: 'easeInOutQuad'
          });
          
          // We removed the resets for words, fadeElements, and slideDownElements here
      }
  });
}, observerOptions);

document.querySelectorAll('.reveal-image').forEach(img => {
  observer.observe(img);
});