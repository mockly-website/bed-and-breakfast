/* Casa Ostro — comportamenti comuni a tutte le pagine.
   1 Lingua · 2 Foto · 3 Polaroid · 4 Comparse · 5 Menu e schede · 6 Cielo e sole */
(function () {
  'use strict';

  var d = document;
  var root = d.documentElement;
  var O = window.Ostro;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* 1 Lingua ---------------------------------------------------------- */
  O.apply(O.initial());
  d.addEventListener('click', function (e) {
    var t = e.target.closest('[data-lang-toggle],[data-lang]');
    if (!t) return;
    var next = t.hasAttribute('data-lang') ? t.getAttribute('data-lang') : (O.lang === 'en' ? 'it' : 'en');
    O.remember(next);
    O.apply(next);
  });

  /* 2 Foto: appaiono dolcemente, e se una manca c'è un messaggio ------- */
  [].forEach.call(d.querySelectorAll('.ph img'), function (img) {
    function ok() { img.classList.add('is-loaded'); }
    function ko() {
      img.style.display = 'none';
      var box = img.closest('.ph');
      if (box && !box.querySelector('.ph__msg')) {
        var m = d.createElement('span');
        m.className = 'ph__msg ph--err';
        m.textContent = O.t('Foto non disponibile');
        box.appendChild(m);
      }
    }
    if (img.complete && img.naturalWidth) ok();
    else if (img.complete) ko();
    else { img.addEventListener('load', ok); img.addEventListener('error', ko); }
  });

  /* 3 Polaroid: un tocco e si gira ------------------------------------ */
  d.addEventListener('click', function (e) {
    var p = e.target.closest('button.pol');
    if (!p) return;
    var on = p.classList.toggle('is-flipped');
    p.setAttribute('aria-pressed', String(on));
  });

  /* 4 Comparse allo scroll ------------------------------------------- */
  var rv = [].slice.call(d.querySelectorAll('.rv'));
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (list) {
      list.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.08 });
    rv.forEach(function (el) { io.observe(el); });
  } else {
    rv.forEach(function (el) { el.classList.add('in'); });
  }

  /* 5 Menu e scheda info: si aprono, si chiudono con X, Esc e fuori ---- */
  var scrim = d.querySelector('[data-scrim]');
  var open = null;
  var trigger = null;
  var lockable = [].slice.call(d.querySelectorAll('main, [data-chrome], .skip'));

  function setInert(on) {
    lockable.forEach(function (el) {
      if (on) el.setAttribute('inert', ''); else el.removeAttribute('inert');
    });
  }
  function openSheet(id, from) {
    var el = d.getElementById(id);
    if (!el) return;
    if (open) closeSheet(false);
    open = el;
    trigger = from || d.activeElement;
    el.classList.add('is-open');
    if (scrim) scrim.classList.add('is-open');
    root.classList.add('is-locked');
    setInert(true);
    if (trigger && trigger.hasAttribute('aria-expanded')) trigger.setAttribute('aria-expanded', 'true');
    var first = el.querySelector('[data-close]');
    if (first) first.focus({ preventScroll: true });
  }
  function closeSheet(restore) {
    if (!open) return;
    open.classList.remove('is-open');
    if (scrim) scrim.classList.remove('is-open');
    root.classList.remove('is-locked');
    setInert(false);
    if (trigger && trigger.hasAttribute('aria-expanded')) trigger.setAttribute('aria-expanded', 'false');
    var back = trigger;
    open = null;
    trigger = null;
    if (restore !== false && back && back.focus) back.focus({ preventScroll: true });
  }
  d.addEventListener('click', function (e) {
    var o = e.target.closest('[data-open]');
    if (o) { openSheet(o.getAttribute('data-open'), o); return; }
    if (e.target.closest('[data-close]') || e.target === scrim) closeSheet();
  });
  d.addEventListener('keydown', function (e) {
    if (!open) return;
    if (e.key === 'Escape') { e.preventDefault(); closeSheet(); return; }
    if (e.key === 'Tab') {   // il fuoco resta dentro la scheda
      var f = [].slice.call(open.querySelectorAll('a[href],button:not([disabled])'));
      if (!f.length) return;
      var a = f[0], z = f[f.length - 1];
      if (e.shiftKey && d.activeElement === a) { e.preventDefault(); z.focus(); }
      else if (!e.shiftKey && d.activeElement === z) { e.preventDefault(); a.focus(); }
    }
  });
  window.matchMedia('(min-width:1024px)').addEventListener('change', function (e) {
    if (e.matches && open && open.id === 'menu') closeSheet(false);
  });

  /* 6 Cielo, sole, luna, stelle e orologio ----------------------------
     Ogni sezione dichiara l'ora del suo momento (data-clock). Mentre scorri,
     l'ora si calcola fra una sezione e l'altra e da lì dipende tutto:
     il colore del cielo, la posizione del sole, la luce sulle foto.
     Si animano solo opacity e transform. */
  var layers = [].slice.call(d.querySelectorAll('.sky__l'));
  var sun = d.querySelector('[data-sun]');
  var moon = d.querySelector('[data-moon]');
  var stars = d.querySelector('[data-stars]');
  var clockOut = d.querySelector('[data-clock-out]');
  var themeMeta = d.querySelector('meta[name="theme-color"]');
  var TOPS = ['#f0a6a0', '#f9cf8e', '#7fbfe6', '#e27b50', '#0f1a3c'];
  var KEYS = [[330, 0], [480, 0.25], [780, 0.5], [1110, 0.75], [1260, 1]];   // minuti → tempo del cielo (0..1)
  var anchors = [];
  var vw = innerWidth, vh = innerHeight, maxScroll = 1;
  var last = { tone: '', clock: '', warm: -1, cool: -1, theme: '', op: [] };
  var ticking = false;

  function clamp(v, a, b) { return Math.min(b, Math.max(a, v)); }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function toMin(s) { var p = s.split(':'); return (+p[0]) * 60 + (+p[1]); }
  function skyTime(m) {
    if (m <= KEYS[0][0]) return 0;
    for (var i = 1; i < KEYS.length; i++) {
      if (m <= KEYS[i][0]) {
        var a = KEYS[i - 1], b = KEYS[i];
        return lerp(a[1], b[1], (m - a[0]) / (b[0] - a[0]));
      }
    }
    return 1;
  }
  function tri(m, a, peak, z) { return m <= a || m >= z ? 0 : (m < peak ? (m - a) / (peak - a) : (z - m) / (z - peak)); }

  function measure() {
    vw = innerWidth; vh = innerHeight;
    maxScroll = Math.max(1, root.scrollHeight - vh);
    anchors = [].slice.call(d.querySelectorAll('[data-clock]')).map(function (el) {
      var r = el.getBoundingClientRect();
      return { y: r.top + scrollY + r.height / 2, m: toMin(el.getAttribute('data-clock')) };
    }).sort(function (a, b) { return a.y - b.y; });
  }

  function minutesNow() {
    if (!anchors.length) return 330;
    if (anchors.length === 1) return anchors[0].m;
    var p = clamp(scrollY / maxScroll, 0, 1);
    var probe = scrollY + vh * (0.2 + 0.6 * p);
    if (probe <= anchors[0].y) return anchors[0].m;
    for (var i = 1; i < anchors.length; i++) {
      if (probe <= anchors[i].y) {
        var a = anchors[i - 1], b = anchors[i];
        return lerp(a.m, b.m, (probe - a.y) / Math.max(1, b.y - a.y));
      }
    }
    return anchors[anchors.length - 1].m;
  }

  function paint() {
    ticking = false;
    var m = minutesNow();
    var t = skyTime(m);

    for (var k = 1; k < layers.length; k++) {
      var o = Math.round(clamp(4 * t - (k - 1), 0, 1) * 500) / 500;
      if (last.op[k] !== o) { layers[k].style.opacity = o; last.op[k] = o; }
    }
    var tone = t > 0.82 ? 'dark' : 'light';
    if (tone !== last.tone) { root.setAttribute('data-tone', tone); last.tone = tone; }
    var theme = TOPS[Math.round(t * 4)];
    if (themeMeta && theme !== last.theme) { themeMeta.setAttribute('content', theme); last.theme = theme; }

    var warm = Math.round(Math.max(tri(m, 330, 420, 540), tri(m, 1030, 1110, 1200)) * 50) / 50;
    var cool = Math.round(clamp((m - 1150) / 130, 0, 1) * 50) / 50;
    if (warm !== last.warm) { root.style.setProperty('--warm', warm); last.warm = warm; }
    if (cool !== last.cool) { root.style.setProperty('--cool', cool); last.cool = cool; }

    if (sun && moon) {
      if (reduce) {               // con "riduci movimento" il sole sta fermo
        sun.style.transform = 'translate3d(' + vw * 0.82 + 'px,' + vh * 0.2 + 'px,0)';
        moon.style.transform = 'translate3d(' + vw * 0.82 + 'px,' + vh * 0.2 + 'px,0)';
        sun.style.opacity = m < 1140 ? 1 : 0;
        moon.style.opacity = m < 1140 ? 0 : 1;
      } else {
        var u = clamp((m - 330) / (1140 - 330), 0, 1);
        var base = vh * 0.8, top = vh * 0.13;
        sun.style.transform = 'translate3d(' + (vw * (0.1 + 0.8 * u)).toFixed(1) + 'px,' + (base - Math.sin(Math.PI * u) * (base - top)).toFixed(1) + 'px,0)';
        sun.style.opacity = clamp(1 - (m - 1140) / 40, 0, 1).toFixed(2);
        var v = clamp((m - 1150) / 230, 0, 1);
        moon.style.transform = 'translate3d(' + (vw * (0.18 + 0.64 * v)).toFixed(1) + 'px,' + (vh * 0.62 - Math.sin(Math.PI * v) * vh * 0.42).toFixed(1) + 'px,0)';
        moon.style.opacity = clamp((m - 1150) / 50, 0, 1).toFixed(2);
      }
    }
    if (stars) stars.style.opacity = clamp((m - 1150) / 120, 0, 1).toFixed(2);

    if (clockOut) {
      var r5 = Math.round(m / 5) * 5;
      var txt = ('0' + Math.floor(r5 / 60)).slice(-2) + ':' + ('0' + (r5 % 60)).slice(-2);
      if (txt !== last.clock) { clockOut.textContent = txt; last.clock = txt; }
    }
  }
  function schedule() { if (!ticking) { ticking = true; requestAnimationFrame(paint); } }

  // stelle: posizioni fisse, sempre uguali
  if (stars) {
    var seed = 7, html = '';
    for (var s = 0; s < 46; s++) {
      seed = (seed * 9301 + 49297) % 233280;
      var x = seed / 233280 * 100;
      seed = (seed * 9301 + 49297) % 233280;
      var y = seed / 233280 * 70;
      var size = 2 + (s % 3);
      html += '<i style="position:absolute;left:' + x.toFixed(1) + '%;top:' + y.toFixed(1) + '%;width:' + size + 'px;height:' + size + 'px;border-radius:50%;background:#fff6dc;opacity:' + (0.5 + (s % 5) * 0.1).toFixed(1) + '"></i>';
    }
    stars.innerHTML = html;
  }

  function remeasure() { measure(); schedule(); }
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', remeasure);
  addEventListener('load', remeasure);
  addEventListener('orientationchange', remeasure);
  if ('ResizeObserver' in window) new ResizeObserver(remeasure).observe(d.body);
  if (d.fonts && d.fonts.ready) d.fonts.ready.then(remeasure);
  measure();
  paint();
  d.addEventListener('langchange', remeasure);
})();
