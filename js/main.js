/* AADFC — small progressive-enhancement layer. No dependencies. */
(function () {
  'use strict';

  /* ---- Mobile navigation ------------------------------------------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primary-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('is-open', !open);
      document.body.style.overflow = !open && window.innerWidth <= 1000 ? 'hidden' : '';
    });

    // Close when a link is chosen, or on Escape.
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
        document.body.style.overflow = '';
        toggle.focus();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 1000) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* ---- Header shadow once the page scrolls -------------------------- */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-stuck', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---- Reveal on scroll --------------------------------------------- */
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var targets = document.querySelectorAll('.reveal');

  if (reduced || !('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        // Stagger siblings slightly so grids animate in sequence.
        var delay = parseFloat(entry.target.dataset.delay || 0);
        setTimeout(function () { entry.target.classList.add('is-in'); }, delay);
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

    targets.forEach(function (el, i) {
      if (!el.dataset.delay) el.dataset.delay = String((i % 4) * 70);
      io.observe(el);
    });
  }

  /* ---- Contact form: mailto fallback --------------------------------
     The site is static, so there is no server to post to. Until a form
     backend is connected, compose a pre-filled email instead.          */
  var form = document.querySelector('form[data-mailto]');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var name = (data.get('name') || '').trim();
      var subject = (data.get('subject') || 'Website enquiry').trim();

      var lines = [
        'Name: ' + name,
        'Email: ' + (data.get('email') || '').trim(),
        'Phone: ' + ((data.get('phone') || '').trim() || '—'),
        'Interest: ' + (data.get('interest') || '—'),
        '',
        (data.get('message') || '').trim()
      ];

      window.location.href = 'mailto:' + form.dataset.mailto +
        '?subject=' + encodeURIComponent('[Website] ' + subject) +
        '&body=' + encodeURIComponent(lines.join('\n'));

      var status = form.querySelector('.form-note');
      if (status) {
        status.textContent =
          'Opening your email app with the message ready to send. ' +
          'If nothing happens, email info@aadfc.ca directly.';
        status.style.color = 'var(--red)';
      }
    });
  }

  /* ---- Footer year --------------------------------------------------- */
  var yr = document.getElementById('year');
  if (yr) yr.textContent = String(new Date().getFullYear());
})();
