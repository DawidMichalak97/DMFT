// DMFT Premium interactions
(() => {
  const qs = (s, p=document) => p.querySelector(s);
  const qsa = (s, p=document) => [...p.querySelectorAll(s)];

  // Year
  const year = qs('#year');
  if (year) year.textContent = new Date().getFullYear();

  // Mobile drawer
  const burger = qs('.burger');
  const drawer = qs('[data-drawer]');
  if (burger && drawer) {
    burger.addEventListener('click', () => {
      const open = drawer.classList.toggle('open');
      document.body.classList.toggle('drawer-open', open);
      burger.setAttribute('aria-expanded', String(open));
    });

    qsa('.drawer__link', drawer).forEach(link => {
      link.addEventListener('click', () => {
        drawer.classList.remove('open');
        document.body.classList.remove('drawer-open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  
  // Close drawer on ESC
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer && drawer.classList.contains('open')) {
      drawer.classList.remove('open');
      document.body.classList.remove('drawer-open');
      if (burger) burger.setAttribute('aria-expanded', 'false');
    }
  });
// Active menu link on scroll
  const sections = qsa('section[id]');
  const links = qsa('.menu__link');
  const setActive = () => {
    const y = window.scrollY + 120;
    let current = sections[0]?.id;
    sections.forEach(sec => {
      if (y >= sec.offsetTop) current = sec.id;
    });
    links.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  };
  window.addEventListener('scroll', setActive, { passive: true });
  setActive();

  // Reveal on scroll
  const els = qsa('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.12 });

  els.forEach(el => io.observe(el));
})();
