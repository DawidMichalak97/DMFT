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
      burger.setAttribute('aria-expanded', String(open));
    });

    qsa('.drawer__link', drawer).forEach(link => {
      link.addEventListener('click', () => {
        drawer.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
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

  // Patch: lock scroll when drawer is open (mobile)
  const burger2 = qs('.burger');
  const drawer2 = qs('[data-drawer]');
  if (burger2 && drawer2) {
    const syncLock = () => {
      const open = drawer2.classList.contains('open');
      document.body.classList.toggle('drawer-open', open);
      burger2.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    // Ensure initial
    syncLock();
    // Observe class changes
    const mo = new MutationObserver(syncLock);
    mo.observe(drawer2, { attributes: true, attributeFilter: ['class'] });

    // Close on link click
    qsa('.drawer__link', drawer2).forEach(a => a.addEventListener('click', () => {
      drawer2.classList.remove('open');
      syncLock();
    }));
  }

})();