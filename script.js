// Muda cor do header ao rolar
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  header.classList.toggle('scrolled', window.scrollY > 50);
});

// Animação suave dos elementos ao entrar na tela
const elementos = document.querySelectorAll('[data-animar]');
const animaScroll = () => {
  const topo = window.pageYOffset + (window.innerHeight * 0.85);
  elementos.forEach(el => {
    if (topo > el.offsetTop) {
      el.classList.add('animar');
    }
  });
};
window.addEventListener('scroll', animaScroll);