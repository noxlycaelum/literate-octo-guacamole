const card = document.querySelector('.profile-card');
const cherry = document.querySelector('.cherry');
const video = document.getElementById('bgVideo');

card.addEventListener('mouseenter', () => {
    video.playbackRate = 0.5;
    if (window.innerWidth >= 600) {
        cherry.style.width = '350px';
    }
});

card.addEventListener('mouseleave', () => {
    video.playbackRate = 1;
    if (window.innerWidth >= 600) {
        cherry.style.width = '300px';
    }
});
