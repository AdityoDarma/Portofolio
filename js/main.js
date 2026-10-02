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
     2b. Filter Achievements (Semua / Sertifikat / Lomba)
  ───────────────────────────────────────── */
  const achFilters = document.querySelectorAll(".ach-filter");
  const achCards = document.querySelectorAll(".achievements .card");

  achFilters.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;
      achFilters.forEach((b) => b.classList.toggle("active", b === btn));
      achCards.forEach((card) => {
        card.hidden = filter !== "all" && card.dataset.category !== filter;
      });
      const slider = document.querySelector(".achievements .cards-scroll");
      if (slider) slider.scrollTo({ left: 0 });
    });
  });


  /* ─────────────────────────────────────────
     2c. Blog carousel (satu kartu besar, panah + swipe)
  ───────────────────────────────────────── */
  const blogCarousel = document.getElementById("blogCarousel");
  if (blogCarousel) {
    const track = blogCarousel.querySelector(".blog-track");
    const viewport = blogCarousel.querySelector(".blog-viewport");
    const slides = track.children;
    const counter = document.getElementById("blogCounter");
    let current = 0;

    const pad = (n) => String(n).padStart(2, "0");

    function goTo(index) {
      current = (index + slides.length) % slides.length; // berputar
      track.style.transform = `translateX(-${current * 100}%)`;
      counter.textContent = `${pad(current + 1)} / ${pad(slides.length)}`;
    }

    document.getElementById("blogPrev").addEventListener("click", () => goTo(current - 1));
    document.getElementById("blogNext").addEventListener("click", () => goTo(current + 1));

    // Keyboard: panah kiri/kanan saat carousel difokuskan
    blogCarousel.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") goTo(current - 1);
      if (e.key === "ArrowRight") goTo(current + 1);
    });

    // Swipe / drag
    let startX = 0;
    let dragging = false;

    viewport.addEventListener("pointerdown", (e) => {
      dragging = true;
      startX = e.clientX;
      track.classList.add("dragging");
    });

    viewport.addEventListener("pointermove", (e) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      track.style.transform = `translateX(calc(-${current * 100}% + ${dx}px))`;
    });

    function endDrag(e) {
      if (!dragging) return;
      dragging = false;
      track.classList.remove("dragging");
      const dx = e.clientX - startX;
      if (dx < -50) goTo(current + 1);
      else if (dx > 50) goTo(current - 1);
      else goTo(current);
    }

    viewport.addEventListener("pointerup", endDrag);
    viewport.addEventListener("pointercancel", endDrag);
    viewport.addEventListener("pointerleave", endDrag);

    goTo(0);
  }

  // Link placeholder href="#" jangan melompat ke atas halaman
  document.querySelectorAll('a[href="#"]').forEach((a) => {
    a.addEventListener("click", (e) => e.preventDefault());
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
