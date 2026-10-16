(() => {
  "use strict";
  const config = window.CRAVE_CUPS_CONFIG || {};
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  function whatsappReady() {
    return config.whatsappNumber &&
      !config.whatsappNumber.includes("REPLACE") &&
      /^[0-9]{8,15}$/.test(config.whatsappNumber);
  }
  function waUrl(message) {
    return `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(message)}`;
  }
  function openWhatsApp(message) {
    if (!whatsappReady()) {
      showNotice("WhatsApp is a demo placeholder. Add the owner's confirmed number in js/config.js to enable ordering.", "info");
      return;
    }
    window.open(waUrl(message), "_blank", "noopener,noreferrer");
  }
  function showNotice(message, type = "success", target = $("#site-notice")) {
    if (!target) {
      target = document.createElement("div");
      target.id = "site-notice";
      target.className = "notice";
      target.setAttribute("role", "status");
      document.body.appendChild(target);
    }
    target.className = `notice notice--${type}`;
    target.textContent = message;
    target.hidden = false;
    target.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  // Shared business details and placeholders.
  $$("[data-config]").forEach(el => {
    const value = config[el.dataset.config];
    if (value) el.textContent = value;
  });
  $$("[data-wa-link]").forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      openWhatsApp(link.dataset.message || `Hello ${config.brandName || "Crave Cups"}! I'd like to enquire about dessert cups.`);
    });
  });
  $$("[data-email-link]").forEach(link => {
    link.href = config.email && !config.email.includes("REPLACE") ? `mailto:${config.email}` : "#";
    if (!config.email || config.email.includes("REPLACE")) {
      link.addEventListener("click", e => {
        e.preventDefault();
        showNotice("Add the confirmed business email in js/config.js before launch.", "info");
      });
    }
  });
  $$("[data-instagram-link]").forEach(link => {
    link.href = config.instagramUrl || "#";
    if (!config.instagramUrl || config.instagramUrl.includes("REPLACE")) {
      link.addEventListener("click", e => {
        e.preventDefault();
        showNotice("Add the owner's confirmed Instagram URL in js/config.js before launch.", "info");
      });
    }
  });

  // Mobile navigation.
  const toggle = $(".nav-toggle");
  const nav = $(".site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      nav.classList.toggle("is-open", !expanded);
    });
    $$(".site-nav a").forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }));
  }

  // Reveal content as it enters the viewport; preserve content if reduced motion is preferred.
  const revealItems = $$(".reveal");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("is-visible"));
  }

  // Menu filters.
  const filterButtons = $$(".filter-button");
  const menuCards = $$(".menu-card");
  filterButtons.forEach(button => button.addEventListener("click", () => {
    filterButtons.forEach(btn => {
      const active = btn === button;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", String(active));
    });
    const category = button.dataset.filter;
    menuCards.forEach(card => {
      card.hidden = category !== "all" && card.dataset.category !== category;
    });
  }));

  // Dessert order buttons.
  $$("[data-order-product]").forEach(button => button.addEventListener("click", () => {
    const product = button.dataset.orderProduct;
    const price = button.dataset.price || "price to be confirmed";
    openWhatsApp(`Hello ${config.brandName || "Crave Cups"}! I'd like to enquire about ${product} (${price}). Could you please share availability, serving sizes and ordering details?`);
  }));

  // Reusable WhatsApp enquiry forms. Forms do not store data in this frontend-only demo.
  $$("form[data-whatsapp-form]").forEach(form => {
    form.addEventListener("submit", event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const lines = [`Hello ${config.brandName || "Crave Cups"}! I'd like to make an enquiry.`];
      for (const [key, value] of data.entries()) {
        if (String(value).trim()) {
          const label = key.replace(/[_-]/g, " ").replace(/\b\w/g, c => c.toUpperCase());
          lines.push(`${label}: ${String(value).trim()}`);
        }
      }
      if (!whatsappReady()) {
        showNotice("Your form is valid, but this demo has no connected submission service. Add the owner's WhatsApp number in js/config.js to send the enquiry. Nothing has been stored.", "info", $(".form-notice", form) || $("#site-notice"));
        return;
      }
      showNotice("Your enquiry is ready to send in WhatsApp. Please review the message and press Send in WhatsApp.", "success", $(".form-notice", form) || $("#site-notice"));
      window.open(waUrl(lines.join("\n")), "_blank", "noopener,noreferrer");
    });
  });

  // Accessible gallery lightbox.
  const lightbox = $("#lightbox");
  if (lightbox) {
    const lightboxImage = $("img", lightbox);
    const lightboxCaption = $(".lightbox-caption", lightbox);
    const closeButton = $(".lightbox-close", lightbox);
    let lastFocused = null;
    function closeLightbox() {
      lightbox.hidden = true;
      document.body.classList.remove("modal-open");
      if (lastFocused) lastFocused.focus();
    }
    $$(".gallery-item").forEach(item => {
      item.addEventListener("click", () => {
        const img = $("img", item);
        lastFocused = item;
        lightboxImage.src = img.currentSrc || img.src;
        lightboxImage.alt = img.alt;
        lightboxCaption.textContent = item.dataset.caption || img.alt;
        lightbox.hidden = false;
        document.body.classList.add("modal-open");
        closeButton.focus();
      });
    });
    closeButton.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", e => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener("keydown", e => {
      if (e.key === "Escape" && !lightbox.hidden) closeLightbox();
    });
  }

  // Footer year.
  $$("[data-year]").forEach(el => el.textContent = new Date().getFullYear());
})();
