
/**
 * MinEnerLex Consulting - JavaScript
 * Funcionalidades mínimas e imprescindibles
 */

(function() {
  'use strict';

  // ========================================
  // MENÚ MÓVIL
  // ========================================
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('.main-nav');
  const navLinks = document.querySelectorAll('.nav-list__link');

  if (navToggle && mainNav) {
    // Toggle del menú
    navToggle.addEventListener('click', function() {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';

      this.setAttribute('aria-expanded', !isExpanded);
      mainNav.classList.toggle('is-open');
      document.body.style.overflow = isExpanded ? '' : 'hidden';
    });

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        navToggle.setAttribute('aria-expanded', 'false');
        mainNav.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(event) {
      if (!mainNav.contains(event.target) && !navToggle.contains(event.target)) {
        navToggle.setAttribute('aria-expanded', 'false');
        mainNav.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    });

    // Cerrar menú con tecla Escape
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && mainNav.classList.contains('is-open')) {
        navToggle.setAttribute('aria-expanded', 'false');
        mainNav.classList.remove('is-open');
        document.body.style.overflow = '';
        navToggle.focus();
      }
    });
  }

  // ========================================
  // HEADER AL HACER SCROLL
  // ========================================
  const header = document.querySelector('.site-header');
  let lastScroll = 0;
  let ticking = false;

  function updateHeader() {
    const currentScroll = window.pageYOffset;

    // Añadir sombra cuando hay scroll
    if (currentScroll > 10) {
      header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
    } else {
      header.style.boxShadow = '';
    }

    // Ocultar/mostrar header en scroll (opcional - descomentar si se desea)
    // if (currentScroll > lastScroll && currentScroll > 100) {
    //   header.style.transform = 'translateY(-100%)';
    // } else {
    //   header.style.transform = 'translateY(0)';
    // }

    lastScroll = currentScroll;
    ticking = false;
  }

  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }, { passive: true });

  // ========================================
  // SMOOTH SCROLL PARA ANCLAS
  // ========================================
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(event) {
      const href = this.getAttribute('href');

      if (href === '#') return;

      const target = document.querySelector(href);

      if (target) {
        event.preventDefault();

        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Actualizar URL sin salto
        history.pushState(null, null, href);
      }
    });
  });

  // ========================================
  // ACORDEÓN FAQ (MEJORAS DE ACCESIBILIDAD)
  // ========================================
  const accordions = document.querySelectorAll('.accordion__item');

  accordions.forEach(function(accordion) {
    const trigger = accordion.querySelector('.accordion__trigger');

    if (trigger) {
      trigger.addEventListener('click', function() {
        const isOpen = accordion.open;

        // Cerrar otros acordeones (comportamiento exclusivo)
        accordions.forEach(function(otherAccordion) {
          if (otherAccordion !== accordion && otherAccordion.open) {
            otherAccordion.removeAttribute('open');
          }
        });
      });
    }
  });

  // ========================================
  // ANIMACIÓN DE ENTRADA (INTERSECTION OBSERVER)
  // ========================================
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Aplicar a secciones principales
  document.querySelectorAll('.section, .process-step, .card, .benefit, .accordion__item').forEach(function(el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });

})();
