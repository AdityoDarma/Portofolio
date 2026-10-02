// =========================================================
// main.js — Interaktivitas Website
// 1) Smooth scroll
// 2) Accordion "My Coaching Process"
// 3) Hamburger menu mobile
// 4) Reveal on scroll (Intersection Observer)
// 5) Navbar aktif berdasarkan section yang terlihat
// 6) Navbar sticky dengan shadow saat scroll
// =========================================================

document.addEventListener("DOMContentLoaded", () => {

  /* ─────────────────────────────────────────
     1. Smooth Scroll untuk semua anchor link
  ───────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });

          // Tutup mobile nav jika terbuka
          closeMobileNav();
        }
      }
    });
  });


  /* ─────────────────────────────────────────
     2. Accordion "My Coaching Process"
  ───────────────────────────────────────── */
  const accordionItems = document.querySelectorAll(".process .accordion-item");

  accordionItems.forEach((item) => {
    const row = item.querySelector(".row");
    if (!row) return;

    row.addEventListener("click", () => {
      const isActive = item.classList.contains("active");
      accordionItems.forEach((el) => el.classList.remove("active"));
      if (!isActive) {
        item.classList.add("active");
      }
    });
  });


  /* ─────────────────────────────────────────
     3. Hamburger Menu Mobile
  ───────────────────────────────────────── */
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const mobileNav = document.getElementById("mobileNav");

  function openMobileNav() {
    hamburgerBtn.classList.add("open");
    hamburgerBtn.setAttribute("aria-expanded", "true");
    mobileNav.classList.add("open");
    document.body.style.overflow = "hidden"; // cegah scroll saat nav terbuka
  }

  function closeMobileNav() {
    if (!hamburgerBtn || !mobileNav) return;
    hamburgerBtn.classList.remove("open");
    hamburgerBtn.setAttribute("aria-expanded", "false");
    mobileNav.classList.remove("open");
    document.body.style.overflow = "";
  }

  // Hamburger berubah jadi ✕ saat menu terbuka, jadi tombolnya toggle
  if (hamburgerBtn) {
    hamburgerBtn.addEventListener("click", () => {
      if (mobileNav.classList.contains("open")) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });
  }

  // Tutup dengan tombol Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMobileNav();
  });

  // Tutup juga jika klik di luar nav
  if (mobileNav) {
    mobileNav.addEventListener("click", (e) => {
      if (e.target === mobileNav) closeMobileNav();
    });
  }


  /* ─────────────────────────────────────────
     4. Reveal on Scroll (Intersection Observer)
  ───────────────────────────────────────── */
  const revealEls = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target); // animasi hanya sekali
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: "0px 0px -40px 0px"
  });

  revealEls.forEach((el) => revealObserver.observe(el));


  /* ─────────────────────────────────────────
     5. Active nav link berdasarkan section terlihat
  ───────────────────────────────────────── */
  const sections = document.querySelectorAll("section[id], footer[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${id}`
          );
        });
      }
    });
  }, {
    threshold: 0.4
  });

  sections.forEach((section) => sectionObserver.observe(section));


  /* ─────────────────────────────────────────
     6. Navbar sticky dengan adaptive theme
  ───────────────────────────────────────── */
  const navbarWrap = document.querySelector(".navbar-wrap");
  const navbar = document.querySelector(".navbar");
  const allSections = document.querySelectorAll("section, footer");

  function updateNavbar() {
    if (window.scrollY > 60) {
      navbarWrap.classList.add("scrolled");
    } else {
      navbarWrap.classList.remove("scrolled");
    }

    // Adaptive Theme Logic
    const navCenter = 50;
    let currentTheme = "dark";

    for (const section of allSections) {
      const rect = section.getBoundingClientRect();
      if (rect.top <= navCenter && rect.bottom >= navCenter) {
        if (section.getAttribute("data-nav-theme") === "light") {
          currentTheme = "light";
        }
        break;
      }
    }

    if (currentTheme === "light") {
      navbar.classList.add("nav-light");
    } else {
      navbar.classList.remove("nav-light");
    }
  }

  window.addEventListener("scroll", updateNavbar, { passive: true });
  window.addEventListener("resize", updateNavbar);
  // load: browser bisa memulihkan posisi scroll setelah reload / buka link #anchor
  window.addEventListener("load", updateNavbar);
  updateNavbar();
});
