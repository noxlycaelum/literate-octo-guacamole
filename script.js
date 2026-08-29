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

function updateNavColors() {
    const footerElement = document.getElementById('footer');
    if (!footerElement) return;
    const footerRect = footerElement.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    
    // Bottom nav is at the bottom of the viewport (around 80px from bottom)
    if (footerRect.top <= viewportHeight - 80) {
        document.body.classList.add('bottom-nav-dark');
    } else {
        document.body.classList.remove('bottom-nav-dark');
    }
    
    // Top nav is at the top of the viewport (around 80px from top)
    if (footerRect.top <= 80) {
        document.body.classList.add('top-nav-dark');
    } else {
        document.body.classList.remove('top-nav-dark');
    }
}

// Run updates on events
window.addEventListener('load', updateNavColors);
window.addEventListener('resize', updateNavColors);
// Run initially and after a short delay to ensure rendering is stable
updateNavColors();
setTimeout(updateNavColors, 100);

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
