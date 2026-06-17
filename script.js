const textElements = document.querySelectorAll('.anime-text');

textElements.forEach(textElement => {
    const words = textElement.textContent.trim().split(/\s+/);

    textElement.innerHTML = words.map(word =>
        `<span class="word inline-block overflow-hidden">
       <span class="char inline-block">${word}</span>
     </span>`
    ).join(' ');
});

const lenis = new Lenis({
    duration: 1.35,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 0.8,
});

// Register scroll event listener once (prevents memory leak and CPU thrashing)
lenis.on('scroll', ({ scroll }) => {
    const targets = document.querySelectorAll('.end-text');
    targets.forEach(target => {
        target.style.transform = `translateY(${scroll * 0.05}px)`;
    });
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
