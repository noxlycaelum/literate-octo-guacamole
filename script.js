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

function raf(time) {
    lenis.raf(time);
    lenis.on('scroll', ({ scroll }) => {
        const target = document.querySelector('.end-text');
        target.style.transform = `translateY(${scroll * 0.05}px)`;
    });
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);