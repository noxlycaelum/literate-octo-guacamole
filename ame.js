const observerOptions = {
    threshold: 0.5 
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const target = entry.target;
        const section = target.closest('section');
        if (!section) return;
        const words = section.querySelectorAll('.char');
        const fadeElements = section.querySelectorAll('.text-fade');
        const slideDownElements = section.querySelectorAll('.element-slide');
        const hasAnimated = section.getAttribute('data-animated') === 'true';

        if (entry.isIntersecting) {
            anime({
                targets: target,
                filter: 'grayscale(0%)',
                scale: 1.1,
                duration: 1200,
                easing: 'easeOutExpo'
            });
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
                section.setAttribute('data-animated', 'true');
            }
        } else {
            anime({
                targets: target,
                filter: 'grayscale(100%)',
                scale: 1.0,
                duration: 600,
                easing: 'easeInOutQuad'
            });
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal-image').forEach(img => {
    observer.observe(img);
});
