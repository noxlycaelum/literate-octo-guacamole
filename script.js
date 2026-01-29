const cursorOutline = document.querySelector("#cursor-outline");

window.addEventListener("mousemove", (e) => {
  const { clientX, clientY, target } = e;
  cursorOutline.style.translate = `${clientX}px ${clientY}px`;
  const isHoverable = target.closest('a, button, img, h1, .hover');
  if (isHoverable) {
    cursorOutline.classList.add('scale-150');
  } else {
    cursorOutline.classList.remove('scale-150');
  }
});

document.addEventListener("mouseout", () => {
    cursorOutline.style.opacity = "0";
});

document.addEventListener("mouseover", () => {
    cursorOutline.style.opacity = "1";
});

const textElements = document.querySelectorAll('.anime-text');

textElements.forEach(textElement => {
  const words = textElement.textContent.trim().split(/\s+/);

  textElement.innerHTML = words.map(word => 
    `<span class="word inline-block overflow-hidden">
       <span class="char inline-block">${word}</span>
     </span>`
  ).join(' ');
});