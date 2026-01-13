// DMFT interactions (clean mobile drawer)
(() => {
  const $ = (sel, parent = document) => parent.querySelector(sel);
  const $$ = (sel, parent = document) => Array.from(parent.querySelectorAll(sel));

  const burger = $('.burger');
  const drawer = $('[data-drawer]');
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
    burger.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = drawer.classList.contains('open');
      isOpen ? closeDrawer() : openDrawer();
    });

    // Close after clicking any drawer link
    $$('.drawer__link', drawer).forEach((a) => {
      a.addEventListener('click', () => closeDrawer());
    });

    // Close on ESC
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeDrawer();
    });

    // Close when tapping outside inner panel
    drawer.addEventListener('click', (e) => {
      const inner = $('.drawer__inner', drawer);
      if (inner && !inner.contains(e.target)) closeDrawer();
    });
  }

  // Smooth scroll for in-page anchors (desktop + mobile)
  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();
