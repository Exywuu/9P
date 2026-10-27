/* ==========================================================================
   LA DESCENTE — expérience immersive principale
   Une flamme, neuf portes, un sceau. Tout reste dans l'onglet.
   ========================================================================== */
(function () {
  'use strict';

  var DOORS = [
    { rom: 'I', name: 'Cendre', act: 'Les Veuves de Fer', stage: 'Grand Autel', date: 'Ven. 12 nov. 2027', time: '21:40',
      line: '« On ne balaie pas la poussière d’une veille : on la laisse tenir debout. »' },
    { rom: 'II', name: 'Sel', act: 'Marée Noire', stage: 'Le Puits', date: 'Ven. 12 nov. 2027', time: '23:10',
      line: '« Le val était une mer. Le sel s’en souvient mieux que nous. »' },
    { rom: 'III', name: 'Verre', act: 'Vitrail', stage: 'La Chapelle', date: 'Sam. 13 nov. 2027', time: '19:20',
      line: '« Derrière la vitre, il n’y a pas de dehors — seulement un souffle retenu. »' },
    { rom: 'IV', name: 'Fer', act: 'Les Marteaux de Clisson', stage: 'La Forge', date: 'Sam. 13 nov. 2027', time: '21:00',
      line: '« Un coup pour le fer, un coup pour le silence entre les deux. »' },
    { rom: 'V', name: 'Braise', act: 'Feu Follet', stage: 'Le Champ des Cendres', date: 'Sam. 13 nov. 2027', time: '00:30',
      line: '« Pas de projecteurs : neuf braises, une par porte. »' },
    { rom: 'VI', name: 'Cuir', act: 'Ronce', stage: 'Le Puits', date: 'Dim. 14 nov. 2027', time: '17:00',
      line: '« C’est la seule porte où l’on entre en marchant sur des lacets. »' },
    { rom: 'VII', name: 'Pluie', act: 'Novembre', stage: 'La Chapelle', date: 'Dim. 14 nov. 2027', time: '18:40',
      line: '« Une musique faite pour être écoutée sous un auvent, à trois mètres. »' },
    { rom: 'VIII', name: 'Silence', act: 'Chœur des Sans-Nom', stage: 'Grand Autel', date: 'Dim. 14 nov. 2027', time: '20:15',
      line: '« Fermez les yeux : c’est la seule condition pour entendre la neuvième. »' },
    { rom: 'IX', name: 'Aube', act: 'Le Pacte', stage: 'Grand Autel', date: 'Dim. 14 nov. 2027', time: '22:00',
      line: '« Vingt-deux minutes pendant lesquelles le public tient la lumière. »' }
  ];

  var section = document.getElementById('descente');
  var gatesEl = document.getElementById('gates');
  var countEl = document.getElementById('emberCount');
  var sealBtn = document.getElementById('sealBtn');
  var revealBtn = document.getElementById('revealAll');
  if (!section || !gatesEl) return;

  var gateEls = [];

  /* --- Rendu des portes -------------------------------------------------- */
  gatesEl.innerHTML = DOORS.map(function (d, i) {
    return '<button class="gate" type="button" data-i="' + i + '" ' +
      'aria-label="Porte ' + d.rom + ', ' + d.name + ' — ' + d.act + ', ' + d.stage + ', ' + d.date + ' à ' + d.time + '">' +
      '<span class="gate-rom">Porte ' + d.rom + '</span>' +
      '<span class="gate-name">' + d.name + '</span>' +
      '<span class="gate-arch" aria-hidden="true"></span>' +
      '<span class="gate-detail">' +
        '<span class="gate-act">' + d.act + '</span>' +
        '<span class="gate-meta">' + d.stage + ' · ' + d.date + ' · ' + d.time + '</span>' +
        '<span class="gate-line">' + d.line + '</span>' +
      '</span>' +
    '</button>';
  }).join('');
  gateEls = Array.prototype.slice.call(gatesEl.querySelectorAll('.gate'));

  /* --- Braises (mémoire d'onglet uniquement) ----------------------------- */
  var KEY = 'np.braises.v1';
  var braises = [];
  try {
    var raw = window.sessionStorage.getItem(KEY);
    if (raw) braises = JSON.parse(raw).filter(function (n) { return typeof n === 'number' && n >= 0 && n < 9; });
  } catch (e) { braises = []; }

  function save() {
    try { window.sessionStorage.setItem(KEY, JSON.stringify(braises)); } catch (e) { /* mode privé : on continue */ }
  }

  function paintState() {
    countEl.textContent = String(braises.length);
    section.classList.toggle('is-complete', braises.length === 9);
    gateEls.forEach(function (g) {
      g.classList.toggle('is-done', braises.indexOf(Number(g.dataset.i)) !== -1);
    });
  }
  paintState();

  /* --- Flamme ------------------------------------------------------------ */
  var root = document.documentElement;
  var vw = window.innerWidth, vh = window.innerHeight;
  var fx = vw / 2, fy = vh * 0.42;
  var ticking = false;
  var revealed = false;

  function place(x, y) {
    fx = x; fy = y;
    root.style.setProperty('--fx', x + 'px');
    root.style.setProperty('--fy', y + 'px');
    if (revealed) return;
    gateEls.forEach(function (g) {
      var r = g.getBoundingClientRect();
      var cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      var d = Math.sqrt((x - cx) * (x - cx) + (y - cy) * (y - cy));
      var t = Math.min(1, Math.max(0, 1 - (d - 80) / 280));
      g.style.setProperty('--lit', t.toFixed(3));
      g.classList.toggle('is-lit', t > 0.42);
    });
  }

  function onMove(e) {
    if (e.pointerType && e.pointerType !== 'mouse') return; /* tactile : le défilement reste roi */
    if (ticking) return;
    ticking = true;
    var x = e.clientX, y = e.clientY;
    window.requestAnimationFrame(function () { place(x, y); ticking = false; });
  }
  window.addEventListener('pointermove', onMove, { passive: true });
  window.addEventListener('resize', function () {
    vw = window.innerWidth; vh = window.innerHeight;
    place(Math.min(fx, vw), Math.min(fy, vh));
  });

  /* clavier : le focus éclaire la porte */
  gatesEl.addEventListener('focusin', function (e) {
    var g = e.target.closest ? e.target.closest('.gate') : null;
    if (!g) return;
    var r = g.getBoundingClientRect();
    place(r.left + r.width / 2, r.top + r.height / 2);
    gateEls.forEach(function (x) { x.style.setProperty('--lit', x === g ? '1' : '0.08'); });
  });

  place(fx, fy);
  if (window.NP && window.NP.prefersReduced()) {
    gateEls.forEach(function (g) { g.style.setProperty('--lit', '0.55'); });
  }

  /* --- Panneau d'une porte ----------------------------------------------- */
  var panel = document.getElementById('panel');
  var pRom = document.getElementById('panelRom');
  var pTitle = document.getElementById('panelTitle');
  var pAct = document.getElementById('panelAct');
  var pMeta = document.getElementById('panelMeta');
  var pLine = document.getElementById('panelLine');
  var pSeal = document.getElementById('panelSeal');
  var pBack = document.getElementById('panelBack');
  var pClose = document.getElementById('panelClose');
  var lastFocus = null;
  var current = -1;

  function openPanel(i) {
    var d = DOORS[i];
    current = i;
    pRom.textContent = 'Porte ' + d.rom + ' — ' + (i + 1) + ' / 9';
    pTitle.textContent = d.name;
    pAct.textContent = d.act;
    pMeta.textContent = d.stage + ' · ' + d.date + ' · ' + d.time + ' — fictif';
    pLine.textContent = d.line;
    var done = braises.indexOf(i) !== -1;
    pSeal.textContent = done ? 'Braise déjà scellée' : 'Sceller cette braise';
    pSeal.disabled = done;
    lastFocus = document.activeElement;
    panel.hidden = false;
    pClose.focus();
  }

  function closePanel() {
    panel.hidden = true;
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  gatesEl.addEventListener('click', function (e) {
    var g = e.target.closest ? e.target.closest('.gate') : null;
    if (!g) return;
    openPanel(Number(g.dataset.i));
  });

  pSeal.addEventListener('click', function () {
    if (current < 0) return;
    if (braises.indexOf(current) === -1) {
      braises.push(current);
      save();
      paintState();
    }
    pSeal.textContent = 'Braise scellée ✓';
    pSeal.disabled = true;
  });

  pBack.addEventListener('click', closePanel);
  pClose.addEventListener('click', closePanel);
  panel.addEventListener('click', function (e) { if (e.target === panel) closePanel(); });

  /* --- Sceau ------------------------------------------------------------- */
  var sealPanel = document.getElementById('sealPanel');
  var sealMeta = document.getElementById('sealMeta');
  var sigilEl = document.getElementById('sigil');
  var sealClose = document.getElementById('sealClose');
  var sealBack = document.getElementById('sealBack');
  var sealSave = document.getElementById('sealSave');
  var sealFocus = null;

  function openSeal() {
    var sorted = braises.slice().sort(function (a, b) { return a - b; });
    window.NP.buildSigil(sigilEl, sorted);
    sealMeta.textContent = sorted.length
      ? sorted.length + (sorted.length > 1 ? ' braises · portes ' : ' braise · porte ') +
        sorted.map(function (i) { return DOORS[i].rom; }).join(', ')
      : 'Aucune braise — franchissez une porte pour commencer';
    var complete = document.getElementById('sealComplete');
    if (complete) complete.hidden = sorted.length !== 9;
    sealFocus = document.activeElement;
    sealPanel.hidden = false;
    sealClose.focus();
  }
  function closeSeal() {
    sealPanel.hidden = true;
    if (sealFocus && sealFocus.focus) sealFocus.focus();
  }

  sealBtn.addEventListener('click', openSeal);
  sealClose.addEventListener('click', closeSeal);
  sealBack.addEventListener('click', closeSeal);
  sealPanel.addEventListener('click', function (e) { if (e.target === sealPanel) closeSeal(); });

  sealSave.addEventListener('click', function () {
    var svg = sigilEl.querySelector('svg');
    if (!svg) return;
    var clone = svg.cloneNode(true);
    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    clone.setAttribute('width', '600');
    clone.setAttribute('height', '600');
    var bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    bg.setAttribute('width', '200'); bg.setAttribute('height', '200'); bg.setAttribute('fill', '#08070a');
    clone.insertBefore(bg, clone.firstChild);
    var data = new XMLSerializer().serializeToString(clone);
    var blob = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'sceau-les-neuf-portes.svg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
  });

  /* --- Tout révéler (alternative accessible) ----------------------------- */
  revealBtn.addEventListener('click', function () {
    revealed = !revealed;
    section.classList.toggle('is-revealed', revealed);
    revealBtn.setAttribute('aria-pressed', revealed ? 'true' : 'false');
    revealBtn.textContent = revealed ? 'Masquer la lumière' : 'Tout révéler';
    gateEls.forEach(function (g) {
      g.style.setProperty('--lit', revealed ? '1' : '0.08');
      g.classList.toggle('is-lit', revealed);
    });
    if (revealed) {
      gateEls.forEach(function (g) { g.style.removeProperty('--lit'); });
    }
  });

  /* --- Clavier : Échap + piège de focus dans les panneaux ---------------- */
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (!sealPanel.hidden) { closeSeal(); return; }
    if (!panel.hidden) { closePanel(); }
  });

  [panel, sealPanel].forEach(function (p) {
    p.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;
      var f = p.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  });

  /* --- Flèches : déplacement de la flamme au clavier --------------------- */
  document.addEventListener('keydown', function (e) {
    if (panel.hidden === false || sealPanel.hidden === false) return;
    /* seulement quand le clavier est déjà dans la grille : les flèches doivent
       continuer à faire défiler la page partout ailleurs */
    if (!gatesEl.contains(document.activeElement)) return;
    var step = e.shiftKey ? 90 : 40;
    var handled = true;
    if (e.key === 'ArrowLeft') place(fx - step, fy);
    else if (e.key === 'ArrowRight') place(fx + step, fy);
    else if (e.key === 'ArrowUp') place(fx, fy - step);
    else if (e.key === 'ArrowDown') place(fx, fy + step);
    else handled = false;
    if (handled) e.preventDefault();
  });

  /* --- Le voile et la barre d'état ne doivent pas assombrir le reste ------ */
  function checkAway() {
    var r = section.getBoundingClientRect();
    var vis = Math.min(r.bottom, window.innerHeight) - Math.max(r.top, 0);
    var ratio = vis / Math.max(1, Math.min(r.height, window.innerHeight));
    document.body.classList.toggle('is-away', ratio < 0.35);
  }
  window.addEventListener('scroll', checkAway, { passive: true });
  window.addEventListener('resize', checkAway);
  checkAway();
})();
