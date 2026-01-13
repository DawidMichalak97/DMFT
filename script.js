// DMFT Premium interactions (drawer fix + smooth anchors)
(() => {
  const qs = (s, p=document) => p.querySelector(s);
  const qsa = (s, p=document) => [...p.querySelectorAll(s)];

  // Year
  const year = qs('#year');
  if (year) year.textContent = new Date().getFullYear();

  // Mobile drawer (solid overlay + scroll lock)
  const burger = qs('.burger');
  const drawer = qs('[data-drawer]');
  const drawerInner = qs('.drawer__inner');
  let scrollY = 0;

  const openDrawer = () => {
    if (!drawer) return;
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden','false');
    burger?.setAttribute('aria-expanded', 'true');

    scrollY = window.scrollY || 0;
    document.body.classList.add('drawer-open');

    // iOS friendly lock
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
  };

  const closeDrawer = () => {
    if (!drawer) return;
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden','true');
    burger?.setAttribute('aria-expanded', 'false');

    const top = document.body.style.top;
    document.body.classList.remove('drawer-open');
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';
    window.scrollTo(0, Math.abs(parseInt(top || '0', 10)) || scrollY);
  };

  if (burger && drawer) {
    burger.addEventListener('click', (e) => {
      e.preventDefault();
      drawer.classList.contains('open') ? closeDrawer() : openDrawer();
    });

    // Close via dedicated close buttons
    qsa('[data-close-drawer]', drawer).forEach(btn => {
      btn.addEventListener('click', (e) => { e.preventDefault(); closeDrawer(); });
    });

    // Close when clicking a link inside drawer
    qsa('.drawer__link, .drawer__cta a', drawer).forEach(link => {
      link.addEventListener('click', closeDrawer);
    });

    // Close when tapping the overlay (outside inner)
    drawer.addEventListener('click', (e) => {
      if (drawerInner && drawerInner.contains(e.target)) return;
      closeDrawer();
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('open')) closeDrawer();
    });
  }

  // Active menu link on scroll (desktop)
  const sections = qsa('section[id]');
  const links = qsa('.menu__link');
  const setActive = () => {
    const y = window.scrollY + 120;
    let current = sections[0]?.id;
    sections.forEach(sec => { if (y >= sec.offsetTop) current = sec.id; });
    links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
  };
  window.addEventListener('scroll', setActive, { passive: true });
  setActive();

  // Smooth anchor scroll (incl. back-to-top)
  qsa('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const target = qs(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Reveal
  const els = qsa('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => { if (en.isIntersecting) en.target.classList.add('visible'); });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
})();
