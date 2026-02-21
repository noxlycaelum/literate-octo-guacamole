const textElements = document.querySelectorAll('.anime-text');

textElements.forEach(textElement => {
    const words = textElement.textContent.trim().split(/\s+/);

    textElement.innerHTML = words.map(word =>
        `<span class="word inline-block overflow-hidden">
       <span class="char inline-block">${word}</span>
     </span>`
    ).join(' ');
});