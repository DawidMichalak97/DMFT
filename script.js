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
  const body = document.body;

  const closeDrawer = () => {
    if (!drawer || !burger) return;
    drawer.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    body.classList.remove('drawer-open');
  };

  const openDrawer = () => {
    if (!drawer || !burger) return;
    drawer.classList.add('open');
    burger.setAttribute('aria-expanded', 'true');
    body.classList.add('drawer-open');
  };

  if (burger && drawer) {
    burger.addEventListener('click', () => {
      const isOpen = drawer.classList.contains('open');
      isOpen ? closeDrawer() : openDrawer();
    });

    // Close when clicking a link
    qsa('.drawer__link', drawer).forEach(a => {
      a.addEventListener('click', () => closeDrawer());
    });

    // Close on ESC
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeDrawer();
    });

    // Close when tapping outside inner area
    drawer.addEventListener('click', (e) => {
      const inner = qs('.drawer__inner', drawer);
      if (inner && !inner.contains(e.target)) closeDrawer();
    });
  }


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
