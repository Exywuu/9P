/* ==========================================================================
   LA VEILLÉE — découverte narrative (défilement + nappe sonore facultative)
   ========================================================================== */
(function () {
  'use strict';

  var frags = Array.prototype.slice.call(document.querySelectorAll('.fragment'));
  var bar = document.getElementById('progBar');

  /* --- Apparition progressive ------------------------------------------- */
  if ('IntersectionObserver' in window && !(window.NP && window.NP.prefersReduced())) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) en.target.classList.add('is-in');
      });
    }, { threshold: 0.22, rootMargin: '0px 0px -8% 0px' });
    frags.forEach(function (f) { io.observe(f); });
  } else {
    frags.forEach(function (f) { f.classList.add('is-in'); });
  }

  /* --- Progression de lecture ------------------------------------------- */
  var raf = false;
  function paint() {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    var p = h > 0 ? Math.min(1, Math.max(0, window.pageYOffset / h)) : 0;
    if (bar) bar.style.width = (p * 100).toFixed(2) + '%';
    raf = false;
  }
  window.addEventListener('scroll', function () {
    if (!raf) { raf = true; window.requestAnimationFrame(paint); }
  }, { passive: true });
  window.addEventListener('resize', paint);
  paint();

  /* --- Nappe sonore ------------------------------------------------------ */
  var btn = document.getElementById('soundBtn');
  var note = document.getElementById('soundNote');
  if (!btn) return;

  if (!window.NP || !window.NP.Sound.supported) {
    btn.disabled = true;
    btn.textContent = 'Son non disponible';
    if (note) note.textContent = 'Votre navigateur ne fournit pas de synthèse audio. La veillée reste entièrement lisible sans son.';
    return;
  }

  btn.addEventListener('click', function () {
    var on = window.NP.Sound.toggle();
    var playing = window.NP.Sound.playing;
    btn.setAttribute('aria-pressed', playing ? 'true' : 'false');
    btn.textContent = playing ? 'Couper la nappe sonore' : 'Activer la nappe sonore';
    if (note) {
      note.textContent = playing
        ? 'Nappe en cours : deux sinus graves et un filtre lent, synthétisés à la volée. Volume volontairement bas.'
        : 'Son généré en direct dans le navigateur (aucun fichier, aucun droit musical). Facultatif, coupé par défaut.';
    }
  });

  window.addEventListener('pagehide', function () { window.NP.Sound.stop(); });
})();
