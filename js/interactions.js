/**
 * ============================================================
 *  INTERACTIONS.JS
 *  Contador em tempo real, navegação, barra de progresso,
 *  animações de entrada (Intersection Observer), lightbox
 *  da galeria, carta especial e botão de voltar ao topo.
 * ============================================================
 */

(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- Ícones Lucide ---------------- */
  if (window.lucide) {
    window.lucide.createIcons();
  } else {
    window.addEventListener("load", function () {
      if (window.lucide) window.lucide.createIcons();
    });
  }

  /* ---------------- Contador em tempo real ---------------- */
  (function initCounter() {
    const cfg = (typeof SITE_CONFIG !== "undefined") ? SITE_CONFIG : {};
    const startValue = cfg.datas && cfg.datas.inicioRelacionamento;
    const helpers = window.SiteHelpers || {};

    const daysEl = document.getElementById("countDays");
    const hoursEl = document.getElementById("countHours");
    const minutesEl = document.getElementById("countMinutes");
    const secondsEl = document.getElementById("countSeconds");

    if (!daysEl || !startValue || (helpers.isPlaceholderDate && helpers.isPlaceholderDate(startValue))) {
      return; // mantém "00" se a data não estiver configurada
    }

    const startDate = new Date(startValue);
    if (isNaN(startDate.getTime())) return;

    function tick() {
      const now = new Date();
      let diffMs = now.getTime() - startDate.getTime();
      if (diffMs < 0) diffMs = 0;

      const totalSeconds = Math.floor(diffMs / 1000);
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      daysEl.textContent = String(days);
      if (hoursEl) hoursEl.textContent = String(hours).padStart(2, "0");
      if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, "0");
      if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, "0");
    }

    tick();
    setInterval(tick, 1000);
  })();

  /* ---------------- Navegação: fundo ao rolar + progresso ---------------- */
  const nav = document.getElementById("siteNav");
  const progressBar = document.getElementById("progressBar");
  const toTopBtn = document.getElementById("toTopBtn");

  function onScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (nav) nav.classList.toggle("is-scrolled", scrollTop > 60);

    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = progress + "%";

    if (toTopBtn) toTopBtn.hidden = scrollTop < 500;
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (toTopBtn) {
    toTopBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
    });
  }

  /* ---------------- Menu mobile ---------------- */
  const navToggle = document.getElementById("navToggle");
  const navList = document.getElementById("navList");

  if (navToggle && navList) {
    navToggle.addEventListener("click", function () {
      const isOpen = navList.classList.toggle("is-open");
      navToggle.classList.toggle("is-active", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navList.querySelectorAll("a[data-nav]").forEach(function (link) {
      link.addEventListener("click", function () {
        navList.classList.remove("is-open");
        navToggle.classList.remove("is-active");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------------- Animações de entrada (Intersection Observer) ---------------- */
  if (!prefersReducedMotion && "IntersectionObserver" in window) {
    // Marca elementos a animar
    const toObserve = document.querySelectorAll(
      ".timeline-item, .gallery-item, .card, .counter, .letter-section .envelope"
    );
    toObserve.forEach(function (el) {
      if (!el.hasAttribute("data-animate")) el.setAttribute("data-animate", "");
    });

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });

    document.querySelectorAll("[data-animate]").forEach(function (el) {
      observer.observe(el);
    });
  } else {
    document.querySelectorAll("[data-animate]").forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ---------------- Lightbox da galeria ---------------- */
  (function initLightbox() {
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const lightboxCaption = document.getElementById("lightboxCaption");
    const closeBtn = document.getElementById("lightboxClose");
    const prevBtn = document.getElementById("lightboxPrev");
    const nextBtn = document.getElementById("lightboxNext");
    const galleryEl = document.getElementById("gallery");

    if (!lightbox || !galleryEl) return;

    let currentIndex = 0;
    let lastFocused = null;

    function getData() {
      return Array.isArray(window.__galleryData) ? window.__galleryData : [];
    }

    function openAt(index) {
      const data = getData();
      if (!data.length) return;
      currentIndex = (index + data.length) % data.length;
      const item = data[currentIndex];

      if (!item.imagem) {
        // Sem fotografia real: não há o que ampliar
        return;
      }

      lightboxImage.src = item.imagem;
      lightboxImage.alt = item.legenda || "";
      lightboxCaption.textContent = item.legenda || "";

      lastFocused = document.activeElement;
      lightbox.hidden = false;
      document.body.style.overflow = "hidden";
      closeBtn.focus();
    }

    function close() {
      lightbox.hidden = true;
      document.body.style.overflow = "";
      if (lastFocused && lastFocused.focus) lastFocused.focus();
    }

    galleryEl.addEventListener("click", function (event) {
      const item = event.target.closest(".gallery-item");
      if (!item) return;
      const index = Number(item.getAttribute("data-gallery-index"));
      openAt(index);
    });

    if (closeBtn) closeBtn.addEventListener("click", close);
    if (prevBtn) prevBtn.addEventListener("click", function () { openAt(currentIndex - 1); });
    if (nextBtn) nextBtn.addEventListener("click", function () { openAt(currentIndex + 1); });

    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) close();
    });

    document.addEventListener("keydown", function (event) {
      if (lightbox.hidden) return;
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") openAt(currentIndex - 1);
      if (event.key === "ArrowRight") openAt(currentIndex + 1);
    });
  })();

  /* ---------------- Carta especial ---------------- */
  (function initLetter() {
    const envelope = document.getElementById("envelope");
    const envelopeButton = document.getElementById("envelopeButton");
    const letter = document.getElementById("letter");
    const letterClose = document.getElementById("letterClose");

    if (!envelope || !letter) return;

    function openLetter() {
      envelope.classList.add("is-hidden");
      letter.hidden = false;
      letter.setAttribute("tabindex", "-1");
      letter.focus();
    }

    function closeLetter() {
      letter.hidden = true;
      envelope.classList.remove("is-hidden");
    }

    if (envelopeButton) envelopeButton.addEventListener("click", openLetter);
    if (letterClose) letterClose.addEventListener("click", closeLetter);
  })();

})();
