/* ==========================================================================
   LES NEUF PORTES — socle commun
   Aucune dépendance, aucun appel réseau, aucun stockage persistant.
   ========================================================================== */
(function () {
  'use strict';

  /* --- Navigation mobile ------------------------------------------------- */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.textContent = open ? 'Fermer' : 'Menu';
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
        burger.textContent = 'Menu';
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
        burger.textContent = 'Menu';
        burger.focus();
      }
    });
  }

  /* --- Utilitaires ------------------------------------------------------- */
  var reduceQuery = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  var prefersReduced = function () { return !!(reduceQuery && reduceQuery.matches); };

  var clamp = function (v, min, max) { return Math.min(max, Math.max(min, v)); };

  /* --- Moteur sonore procédural (facultatif, coupé par défaut) ----------- */
  var Sound = {
    ctx: null,
    nodes: null,
    playing: false,
    supported: !!(window.AudioContext || window.webkitAudioContext),

    _build: function () {
      var Ctx = window.AudioContext || window.webkitAudioContext;
      var ctx = new Ctx();
      var master = ctx.createGain();
      master.gain.value = 0;
      master.connect(ctx.destination);

      var filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 520;
      filter.Q.value = 0.6;
      filter.connect(master);

      var lfo = ctx.createOscillator();
      var lfoGain = ctx.createGain();
      lfo.frequency.value = 0.055;
      lfoGain.gain.value = 260;
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);

      var specs = [
        { f: 55.0, type: 'sine', g: 0.50, d: 0 },
        { f: 82.41, type: 'sine', g: 0.22, d: 4 },
        { f: 110.0, type: 'triangle', g: 0.05, d: -6 }
      ];
      var oscs = specs.map(function (s) {
        var o = ctx.createOscillator();
        o.type = s.type;
        o.frequency.value = s.f;
        o.detune.value = s.d;
        var g = ctx.createGain();
        g.gain.value = s.g;
        o.connect(g);
        g.connect(filter);
        o.start();
        return o;
      });
      lfo.start();

      return { ctx: ctx, master: master, oscs: oscs, lfo: lfo };
    },

    start: function () {
      if (!this.supported) return false;
      try {
        if (!this.nodes) this.nodes = this._build();
        var n = this.nodes;
        if (n.ctx.state === 'suspended') n.ctx.resume();
        var t = n.ctx.currentTime;
        n.master.gain.cancelScheduledValues(t);
        n.master.gain.setValueAtTime(Math.max(n.master.gain.value, 0.0001), t);
        n.master.gain.exponentialRampToValueAtTime(0.085, t + 2.4);
        this.playing = true;
        return true;
      } catch (err) { return false; }
    },

    stop: function () {
      if (!this.nodes) { this.playing = false; return; }
      var n = this.nodes, t = n.ctx.currentTime;
      n.master.gain.cancelScheduledValues(t);
      n.master.gain.setValueAtTime(Math.max(n.master.gain.value, 0.0001), t);
      n.master.gain.exponentialRampToValueAtTime(0.0001, t + 0.9);
      this.playing = false;
    },

    toggle: function () { return this.playing ? (this.stop(), false) : this.start(); }
  };

  /* --- Générateur de sceau ----------------------------------------------
     Dessin déterministe : les portes franchies deviennent des rayons.
     Aucune donnée envoyée, aucun identifiant.
     ---------------------------------------------------------------------- */
  function buildSigil(target, indices, options) {
    var opt = options || {};
    var size = 200, c = size / 2;
    var NS = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', '0 0 200 200');
    svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', opt.label || 'Sceau généré à partir des portes franchies');

    function el(name, attrs) {
      var n = document.createElementNS(NS, name);
      for (var k in attrs) if (Object.prototype.hasOwnProperty.call(attrs, k)) n.setAttribute(k, attrs[k]);
      svg.appendChild(n);
      return n;
    }

    el('circle', { cx: c, cy: c, r: 92, fill: 'none', stroke: 'rgba(244,238,227,.22)', 'stroke-width': 1 });

    for (var i = 0; i < 9; i++) {
      var a = (-90 + i * 40) * Math.PI / 180;
      var lit = indices.indexOf(i) !== -1;
      el('line', {
        x1: c + Math.cos(a) * 84, y1: c + Math.sin(a) * 84,
        x2: c + Math.cos(a) * 92, y2: c + Math.sin(a) * 92,
        stroke: lit ? '#ff6a1f' : 'rgba(244,238,227,.18)', 'stroke-width': lit ? 2 : 1
      });
      if (lit) {
        el('line', {
          x1: c + Math.cos(a) * 20, y1: c + Math.sin(a) * 20,
          x2: c + Math.cos(a) * 72, y2: c + Math.sin(a) * 72,
          stroke: 'rgba(255,106,31,.85)', 'stroke-width': 1.6, 'stroke-linecap': 'round'
        });
        el('circle', {
          cx: c + Math.cos(a) * 80, cy: c + Math.sin(a) * 80, r: 4.2,
          fill: '#ffb066'
        });
      }
    }

    var sorted = indices.slice().sort(function (x, y) { return x - y; });
    for (var j = 0; j < sorted.length - 1; j++) {
      var a1 = (-90 + sorted[j] * 40) * Math.PI / 180;
      var a2 = (-90 + sorted[j + 1] * 40) * Math.PI / 180;
      el('path', {
        d: 'M ' + (c + Math.cos(a1) * 58) + ' ' + (c + Math.sin(a1) * 58) +
           ' A 58 58 0 0 1 ' + (c + Math.cos(a2) * 58) + ' ' + (c + Math.sin(a2) * 58),
        fill: 'none', stroke: 'rgba(244,238,227,.28)', 'stroke-width': 1
      });
    }

    el('circle', { cx: c, cy: c, r: 10, fill: 'none', stroke: '#ff6a1f', 'stroke-width': 1.6 });
    el('circle', { cx: c, cy: c, r: 3, fill: '#ff6a1f' });

    if (indices.length === 0) {
      var t = el('text', {
        x: c, y: c + 34, 'text-anchor': 'middle', fill: 'rgba(244,238,227,.45)',
        'font-family': 'ui-monospace, monospace', 'font-size': 8, 'letter-spacing': 2
      });
      t.textContent = 'AUCUNE BRAISE';
    }

    target.innerHTML = '';
    target.appendChild(svg);
    return svg;
  }

  window.NP = {
    prefersReduced: prefersReduced,
    clamp: clamp,
    Sound: Sound,
    buildSigil: buildSigil
  };
})();
