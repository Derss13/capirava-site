/* Reveal suave para elementos com .capx-reveal */
(() => {
  const els = Array.from(document.querySelectorAll('.capx-reveal'));
  if (!els.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('capx-in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });

  els.forEach((el) => io.observe(el));
})();

/* FAQ acordeão (estrutura: .capx-qa > .capx-q + .capx-a) */
(() => {
  const items = Array.from(document.querySelectorAll('.capx-qa'));
  if (!items.length) return;

  items.forEach((item, idx) => {
    const btn = item.querySelector('.capx-q');
    const ans = item.querySelector('.capx-a');
    const plus = item.querySelector('.capx-plus');
    if (!btn || !ans) return;

    const contentId = `capx-a-${idx}`;
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', contentId);
    btn.setAttribute('role', 'button');
    btn.setAttribute('tabindex', '0');
    ans.setAttribute('id', contentId);
    ans.setAttribute('role', 'region');
    ans.setAttribute('aria-hidden', 'true');

    const toggle = () => {
      const isOpen = ans.style.maxHeight && ans.style.maxHeight !== '0px';

      // Fecha todos
      items.forEach((it) => {
        const a = it.querySelector('.capx-a');
        const b = it.querySelector('.capx-q');
        const p = it.querySelector('.capx-plus');
        if (a) a.style.maxHeight = null;
        if (b) b.setAttribute('aria-expanded', 'false');
        if (a) a.setAttribute('aria-hidden', 'true');
        if (p) p.textContent = '+';
      });

      // Abre atual
      if (!isOpen) {
        ans.style.maxHeight = ans.scrollHeight + 'px';
        btn.setAttribute('aria-expanded', 'true');
        ans.setAttribute('aria-hidden', 'false');
        if (plus) plus.textContent = '–';
      }
    };

    btn.addEventListener('click', toggle);
    btn.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
        toggle();
      }
    });
  });
})();
