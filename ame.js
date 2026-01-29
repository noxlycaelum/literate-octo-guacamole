const observerOptions = {
    threshold: 0.4 // Trigger when 40% is visible for a better feel
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const target = entry.target;
        const section = target.closest('section');
        const words = section ? section.querySelectorAll('.char') : [];
        const fadeElements = section ? section.querySelectorAll('.text-fade') : [];
        const slideDownElements = section ? section.querySelectorAll('.element-slide') : [];

        // Stop current animations to prevent overlap
        anime.remove([target, ...words, ...fadeElements, ...slideDownElements]);

        if (entry.isIntersecting) {
            // 1. Image Animation (Existing)
            anime({
                targets: target,
                filter: 'grayscale(0%)',
                scale: 1.1,
                duration: 1200,
                easing: 'easeOutExpo'
            });

            // 2. Header Animation (Existing)
            anime({
                targets: words,
                translateY: [60, 0],
                opacity: [0, 1],
                delay: anime.stagger(80, {start: 200}),
                duration: 900,
                easing: 'easeOutExpo'
            });

            // 3. Simple Slide Up & Fade for .text-fade
            anime({
                targets: fadeElements,
                translateY: [30, 0], // Smaller distance for a subtler feel
                opacity: [0, 1],
                delay: anime.stagger(150, {start: 600}), // Starts after the header
                duration: 1100,
                easing: 'easeOutCubic'
            });

            anime({
                targets: slideDownElements,
                translateY: [-50, 0], // Starts 50px higher
                opacity: [0, 1],
                delay: anime.stagger(250, {start: 800}), // Triggers late in the sequence
                duration: 1200,
                easing: 'easeOutQuint'
            });
        } else {
            // Reset everything when scrolling out
            anime({
                targets: [target, ...words, ...fadeElements],
                filter: (el) => el.classList.contains('reveal-image') ? 'grayscale(100%)' : 'none',
                scale: (el) => el.classList.contains('reveal-image') ? 1.0 : 1.0,
                translateY: (el) => el.classList.contains('reveal-image') ? 0 : 30,
                opacity: (el) => el.classList.contains('reveal-image') ? 1 : 0,
                duration: 600,
                easing: 'easeInOutQuad'
            });
            anime({
                targets: slideDownElements,
                translateY: -50,
                opacity: 0,
                duration: 500,
                easing: 'linear'
            });
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal-image').forEach(img => {
    observer.observe(img);
});