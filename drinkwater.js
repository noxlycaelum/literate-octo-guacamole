document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);

    if (params.get('ce') === 'prive') {
        window.location.href = './prive.html';
    }
});