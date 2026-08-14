/* ============================================================
   Trayce González — Portafolio Profesional
   Lógica principal: navegación, idioma, scrolltop, galería, formulario
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- Idioma inicial ---------- */
  applyLanguage("es");

  /* ---------- AOS (animaciones al hacer scroll) ---------- */
  if (window.AOS) {
    AOS.init({ once: true, offset: 60, duration: 800, easing: "ease-out-cubic" });
  }

  /* ---------- Año dinámico en el footer ---------- */
  const yearEl = document.getElementById("footerYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Navbar: efecto al hacer scroll + link activo ---------- */
  const nav = document.getElementById("mainNav");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link[href^='#']");
  const sections = Array.from(navLinks)
    .map(link => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  function onScroll(){
    // Navbar background
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 40);

    // Active link
    let currentId = sections[0] ? sections[0].id : "";
    const scrollPos = window.scrollY + 140;
    sections.forEach(sec => {
      if (sec.offsetTop <= scrollPos) currentId = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
    });

    // Scrolltop button visibility
    if (scrollTopBtn) scrollTopBtn.classList.toggle("show", window.scrollY > 500);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Cerrar menú móvil al hacer click en un link
  const navCollapseEl = document.getElementById("navContent");
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (navCollapseEl && navCollapseEl.classList.contains("show")) {
        const collapseInstance = bootstrap.Collapse.getOrCreateInstance(navCollapseEl);
        collapseInstance.hide();
      }
    });
  });

  /* ---------- Switch de idioma ES / EN ---------- */
  const langToggle = document.getElementById("langToggle");
  if (langToggle) {
    langToggle.addEventListener("click", () => {
      const newLang = currentLang === "es" ? "en" : "es";
      applyLanguage(newLang);
    });
  }

  /* ---------- Botón Scrolltop ---------- */
  var scrollTopBtn = document.getElementById("scrollTopBtn");
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Filtros de la galería de proyectos ---------- */
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card-wrap");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.getAttribute("data-filter");

      projectCards.forEach(card => {
        const match = filter === "all" || card.getAttribute("data-category") === filter;
        card.classList.toggle("hide", !match);
      });
    });
  });

  /* ---------- Formulario de contacto (validación + envío) ---------- */
  const form = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");
  const submitBtn = document.getElementById("contactSubmit");

  // --- Configura aquí tu cuenta gratuita de EmailJS (https://www.emailjs.com) ---
  // 1. Crea una cuenta y un "Email Service" (por ejemplo Gmail).
  // 2. Crea un "Email Template" con variables: {{name}}, {{email}}, {{subject}}, {{message}}.
  // 3. Sustituye los valores de abajo por los tuyos (Public Key, Service ID, Template ID).
  const EMAILJS_PUBLIC_KEY  = "TU_PUBLIC_KEY";
  const EMAILJS_SERVICE_ID  = "TU_SERVICE_ID";
  const EMAILJS_TEMPLATE_ID = "TU_TEMPLATE_ID";
  const emailjsConfigured = ![EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID]
    .some(v => v.startsWith("TU_"));

  if (emailjsConfigured && window.emailjs) {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const fields = ["cf-name", "cf-email", "cf-subject", "cf-message"];
      let valid = true;

      fields.forEach(id => {
        const input = document.getElementById(id);
        if (!input.checkValidity()) {
          input.classList.add("is-invalid");
          valid = false;
        } else {
          input.classList.remove("is-invalid");
        }
      });

      if (!valid) {
        setStatus(translations[currentLang]["contact.formMessageError"] || "Revisa los campos del formulario.", "error");
        return;
      }

      const data = {
        name: document.getElementById("cf-name").value.trim(),
        email: document.getElementById("cf-email").value.trim(),
        subject: document.getElementById("cf-subject").value.trim(),
        message: document.getElementById("cf-message").value.trim()
      };

      submitBtn.disabled = true;
      setStatus(translations[currentLang]["contact.formSending"] || "Enviando…", "");

      if (emailjsConfigured && window.emailjs) {
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, data)
          .then(() => {
            setStatus(translations[currentLang]["contact.formSuccess"], "success");
            form.reset();
          })
          .catch(() => {
            setStatus(translations[currentLang]["contact.formError"], "error");
          })
          .finally(() => { submitBtn.disabled = false; });
      } else {
        // Fallback sin backend configurado: abre el cliente de correo con los datos precargados
        const mailBody = encodeURIComponent(
          `Nombre: ${data.name}\nCorreo: ${data.email}\n\n${data.message}`
        );
        window.location.href = `mailto:trey0594@gmail.com?subject=${encodeURIComponent(data.subject)}&body=${mailBody}`;
        setStatus(translations[currentLang]["contact.formSuccess"], "success");
        submitBtn.disabled = false;
        form.reset();
      }
    });

    // Quitar estado de error mientras el usuario escribe
    form.querySelectorAll(".form-control").forEach(input => {
      input.addEventListener("input", () => input.classList.remove("is-invalid"));
    });
  }

  function setStatus(message, type){
    if (!formStatus) return;
    formStatus.textContent = message;
    formStatus.className = "form-status" + (type ? " " + type : "");
  }

});
