// DMFT Premium interactions (smooth anchors)
(() => {
  const qs = (s, p=document) => p.querySelector(s);
  const qsa = (s, p=document) => [...p.querySelectorAll(s)];

  // Year
  const year = qs('#year');
  if (year) year.textContent = new Date().getFullYear();

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
