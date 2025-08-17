// Isolado: não mexe no seu script.js nem no resto do DOM
(() => {
  const $ = (s, ctx = document) => ctx.querySelector(s);
  const $$ = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));

  const sec = $('#projetos');
  if (!sec) return;

  // 1) Tenta imagens dentro de #projetos
  let srcs = $$('#projetos img').map(img => img.getAttribute('src')).filter(Boolean);

  // 2) Se não houver, usa as da #galeria
  if (!srcs.length) {
    srcs = $$('#galeria img').map(img => img.getAttribute('src')).filter(Boolean);
  }

  const uniqueSrcs = Array.from(new Set(srcs));
  if (!uniqueSrcs.length) return;

  // 3) Garante 3 cenas
  let show = uniqueSrcs.slice(0, 3);
  while (show.length < 3) show.push(show[show.length - 1]);

  // 4) Constrói o split-showcase
  const wrap = document.createElement('div');
  wrap.className = 'capx-split';
  wrap.innerHTML = `
    <div class="capx-sticky">
      <h3 class="capx-sub capx-reveal">Do Pantanal para o mundo</h3>
      <h2 class="capx-title capx-reveal">Projetos que falam alto com imagens</h2>
      <p class="capx-desc capx-reveal">Role e veja a narrativa visual evoluir — detalhe, contexto e impacto.</p>
    </div>
    <div class="capx-scenes">
      ${show.map((src, i) => `
        <article class="capx-scene capx-reveal" data-capx-scene>
          <figure class="capx-fig">
            <img src="${src}" alt="Projeto ${i+1}" loading="lazy">
          </figure>
          <div class="capx-cap">
            <h4>${['Identidade e Hero','Detalhe que vende','Experiência'][i]}</h4>
            <p>${[
              'Entrada forte, tipografia segura e CTA em destaque.',
              'Textura, luz e foco elevam o valor percebido.',
              'Marca no mundo real: escala, contexto e emoção.'
            ][i]}</p>
          </div>
        </article>
      `).join('')}
    </div>
  `;

  // 5) Insere após o primeiro título da seção
  const heading = sec.querySelector('h1, h2, h3');
  if (heading) {
    heading.insertAdjacentElement('afterend', wrap);
  } else {
    sec.insertBefore(wrap, sec.firstElementChild);
  }

  // 6) Reveal on scroll
  const revealEls = $$('.capx-reveal', sec);
  if (revealEls.length) {
    const ioReveal = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('capx-in');
          ioReveal.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => ioReveal.observe(el));
  }

  // 7) Destaca a cena ativa conforme rolagem
  const scenes = $$('[data-capx-scene]', sec);
  if (scenes.length) {
    const ioScenes = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          scenes.forEach(s => s.classList.remove('capx-active'));
          e.target.classList.add('capx-active');
        }
      });
    }, { rootMargin: '-35% 0px -50% 0px', threshold: 0.01 });
    scenes.forEach(s => ioScenes.observe(s));
  }
})();
