// Reveal on scroll
(function () {
  const els = document.querySelectorAll('.capx-reveal');
  if (!('IntersectionObserver' in window) || els.length === 0) {
    els.forEach(el => el.classList.add('capx-visible'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('capx-visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  els.forEach(el => io.observe(el));
})();

// FAQ accordion
(function () {
  const qs = document.querySelectorAll('.capx-faq .capx-q');
  qs.forEach(btn => {
    btn.addEventListener('click', () => {
      const wrapper = btn.closest('.capx-qa');
      const ans = wrapper.querySelector('.capx-a');
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      wrapper.classList.toggle('open', !expanded);
      if (ans) {
        if (expanded) {
          ans.setAttribute('hidden', '');
        } else {
          ans.removeAttribute('hidden');
        }
      }
    });
  });
})();
