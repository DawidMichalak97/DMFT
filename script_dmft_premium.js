/* DMFT – Premium script (stable) */
(() => {
  "use strict";

  const qs = (s, el = document) => el.querySelector(s);
  const qsa = (s, el = document) => [...el.querySelectorAll(s)];

  // ===== Mobile drawer (burger) =====
  const burger = qs(".burger");
  const drawer = qs("[data-drawer]");

  const openDrawer = () => {
    if (!drawer) return;
    drawer.classList.add("open");
    document.body.classList.add("drawer-open");
    if (burger) burger.setAttribute("aria-expanded", "true");
  };

  const closeDrawer = () => {
    if (!drawer) return;
    drawer.classList.remove("open");
    document.body.classList.remove("drawer-open");
    if (burger) burger.setAttribute("aria-expanded", "false");
  };

  if (burger && drawer) {
    burger.addEventListener("click", (e) => {
      e.preventDefault();
      const isOpen = drawer.classList.contains("open");
      if (isOpen) closeDrawer();
      else openDrawer();
    });

    // close drawer after clicking a link
    qsa("a", drawer).forEach((a) => {
      a.addEventListener("click", () => closeDrawer());
    });

    // click outside drawer -> close
    drawer.addEventListener("click", (e) => {
      if (e.target === drawer) closeDrawer();
    });

    // ESC -> close
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeDrawer();
    });
  }

  // ===== Reveal animations (THIS fixes “missing content”) =====
  const revealEls = qsa(".reveal");

  const revealNow = (el) => {
    el.classList.add("visible");
  };

  // fallback: show everything after 1s even if observer fails
  setTimeout(() => {
    revealEls.forEach((el) => el.classList.add("visible"));
  }, 1000);

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealNow(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealEls.forEach((el) => io.observe(el));
  } else {
    // old browsers
    revealEls.forEach(revealNow);
  }

  // ===== Active menu link on scroll =====
  const menuLinks = qsa(".menu__link");
  const sections = menuLinks
    .map((link) => qs(link.getAttribute("href")))
    .filter(Boolean);

  const setActive = () => {
    const y = window.scrollY + 120;
    let current = null;

    sections.forEach((sec) => {
      if (sec.offsetTop <= y) current = sec;
    });

    menuLinks.forEach((link) => link.classList.remove("active"));
    if (current) {
      const active = menuLinks.find(
        (l) => l.getAttribute("href") === `#${current.id}`
      );
      if (active) active.classList.add("active");
    }
  };

  window.addEventListener("scroll", setActive, { passive: true });
  setActive();
})();
