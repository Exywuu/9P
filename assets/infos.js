/* ==========================================================================
   INFOS PRATIQUES — filtres de programme + billetterie simulée
   Aucune donnée personnelle, aucun envoi réseau.
   ========================================================================== */
(function () {
  'use strict';

  /* --- Filtre du programme ---------------------------------------------- */
  var chips = Array.prototype.slice.call(document.querySelectorAll('.chip[data-night]'));
  var rows = Array.prototype.slice.call(document.querySelectorAll('#progTable tbody tr'));
  var count = document.getElementById('progCount');

  function apply(night) {
    var n = 0;
    rows.forEach(function (tr) {
      var show = night === 'all' || tr.dataset.night === night;
      tr.classList.toggle('is-hidden', !show);
      if (show) n++;
    });
    chips.forEach(function (c) {
      var on = c.dataset.night === night;
      c.classList.toggle('is-active', on);
      c.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    if (count) count.textContent = n + (n > 1 ? ' actes affichés.' : ' acte affiché.');
  }

  chips.forEach(function (c) {
    c.addEventListener('click', function () { apply(c.dataset.night); });
  });
  apply('all');

  /* --- Pass (simulation) ------------------------------------------------- */
  var checks = Array.prototype.slice.call(document.querySelectorAll('.pass-check'));
  var totalEl = document.getElementById('cartTotal');
  var makeBtn = document.getElementById('makePass');
  var resetBtn = document.getElementById('resetPass');
  var ticket = document.getElementById('ticket');
  var ticketName = document.getElementById('ticketName');
  var ticketMeta = document.getElementById('ticketMeta');
  var ticketSigil = document.getElementById('ticketSigil');

  function total() {
    return checks.reduce(function (s, c) { return s + (c.checked ? Number(c.value) : 0); }, 0);
  }

  function refresh() {
    var t = total();
    if (totalEl) totalEl.textContent = t + ' €';
    if (makeBtn) makeBtn.disabled = t === 0;
    if (t === 0 && ticket) ticket.hidden = true;
  }

  checks.forEach(function (c) { c.addEventListener('change', refresh); });
  refresh();

  if (makeBtn) {
    makeBtn.addEventListener('click', function () {
      var picked = checks.filter(function (c) { return c.checked; })
        .map(function (c) { return c.dataset.label; });
      var t = total();
      ticketName.textContent = 'Pass ' + picked.join(' + ');
      ticketMeta.textContent = '12–14 novembre 2027 · Le Val des Neuf Portes, Clisson · ' +
        t + ' € (tarif fictif)';
      var idx = [];
      for (var k = 0; k < 9; k++) { if ((t * 7 + k * 13) % 3 === 0) idx.push(k); }
      if (!idx.length) idx = [0, 4, 8];
      if (window.NP && ticketSigil) window.NP.buildSigil(ticketSigil, idx, { label: 'Sceau du pass de démonstration' });
      ticket.hidden = false;
      ticket.scrollIntoView({ behavior: window.NP && window.NP.prefersReduced() ? 'auto' : 'smooth', block: 'center' });
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      checks.forEach(function (c) { c.checked = false; });
      refresh();
    });
  }
})();
