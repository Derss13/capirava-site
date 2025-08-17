document.querySelectorAll('.grid-galeria a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const overlay = document.createElement('div');
    overlay.classList.add('lightbox-overlay');

    const img = document.createElement('img');
    img.src = link.href;

    overlay.appendChild(img);
    document.body.appendChild(overlay);

    overlay.addEventListener('click', () => {
      document.body.removeChild(overlay);
    });
  });
});
