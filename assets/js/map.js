/* Pagina Dintorni: segnaposto sulla mappa disegnata, filtri e schede.
   I luoghi stanno nell'HTML (data-id, data-x, data-y): la pagina si legge anche senza JavaScript. */
(function () {
  'use strict';

  var box = document.querySelector('[data-map]');
  if (!box) return;

  var O = window.Ostro;
  var svg = box.querySelector('svg');
  var routes = svg.querySelector('#routes');
  var spot = document.querySelector('[data-spot]');
  var entries = [].slice.call(document.querySelectorAll('.entry'));
  var HOME = { x: 178, y: 292 };
  var pins = {};
  var current = null;
  var filter = 'tutti';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function at(el, x, y) {
    el.style.left = (x / 400 * 100) + '%';
    el.style.top = (y / 520 * 100) + '%';
  }
  function text(el, sel) { var n = el.querySelector(sel); return n ? n.textContent.trim() : ''; }

  /* La casa: un disegno, non un pulsante */
  var home = document.createElement('span');
  home.className = 'pin pin--home';
  home.setAttribute('aria-hidden', 'true');
  home.innerHTML = '<svg viewBox="0 0 40 40"><path d="M6 19L20 7l14 12" fill="none" stroke="#2c1a22" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>' +
    '<path d="M10 18v15h20V18" fill="#fbf4e6" stroke="#2c1a22" stroke-width="2.6" stroke-linejoin="round"/>' +
    '<path d="M17 33V24h6v9" fill="#f6b93b" stroke="#2c1a22" stroke-width="2.4" stroke-linejoin="round"/></svg>';
  at(home, HOME.x, HOME.y);
  box.appendChild(home);

  /* Un segnaposto e un tratteggio per ogni luogo */
  entries.forEach(function (en) {
    var id = en.getAttribute('data-id');
    var x = +en.getAttribute('data-x'), y = +en.getAttribute('data-y');
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'pin';
    b.setAttribute('aria-pressed', 'false');
    b.setAttribute('data-pin', id);
    at(b, x, y);
    b.addEventListener('click', function () { select(id, false); });
    box.appendChild(b);

    var mx = (HOME.x + x) / 2, my = (HOME.y + y) / 2;
    var dx = y - HOME.y, dy = HOME.x - x, len = Math.hypot(dx, dy) || 1;
    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('class', 'map__route');
    path.setAttribute('d', 'M' + HOME.x + ' ' + HOME.y + 'Q' + (mx + dx / len * 22) + ' ' + (my + dy / len * 22) + ' ' + x + ' ' + y);
    routes.appendChild(path);
    pins[id] = { btn: b, route: path, entry: en };
  });

  function labels() {   // il nome del pulsante segue la lingua
    entries.forEach(function (en) {
      var id = en.getAttribute('data-id');
      pins[id].btn.setAttribute('aria-label', text(en, 'h3') + ', ' + text(en, '.mins') + ' min');
    });
  }

  function emptySpot() {
    spot.className = 'spot spot--empty';
    spot.innerHTML = '<p>' + O.t('Tocca un segnaposto sulla mappa: qui compare la sua storia.') + '</p>';
  }

  function select(id, scrollList) {
    var p = pins[id];
    if (!p || p.entry.hidden) return;
    current = id;
    Object.keys(pins).forEach(function (k) {
      pins[k].btn.setAttribute('aria-pressed', String(k === id));
      pins[k].entry.classList.toggle('is-active', k === id);
    });
    var en = p.entry;
    spot.className = 'spot';
    spot.innerHTML = '';
    var h = document.createElement('h2'); h.textContent = text(en, 'h3');
    var meta = document.createElement('p'); meta.className = 'spot__meta';
    meta.textContent = text(en, '.mins') + ' ' + O.t('minuti di esempio');
    var pr = document.createElement('p'); pr.textContent = text(en, 'div > p:not(.entry__time):not(.entry__cap)');
    spot.appendChild(h); spot.appendChild(meta); spot.appendChild(pr);
    if (history.replaceState) history.replaceState(null, '', '#' + id);
    if (scrollList) en.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
  }

  function applyFilter(f) {
    filter = f;
    [].forEach.call(document.querySelectorAll('[data-filter]'), function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-filter') === f));
    });
    entries.forEach(function (en) {
      var id = en.getAttribute('data-id');
      var off = f !== 'tutti' && en.getAttribute('data-cat') !== f;
      en.hidden = off;
      pins[id].btn.classList.toggle('is-off', off);
      pins[id].btn.tabIndex = off ? -1 : 0;
      pins[id].route.style.opacity = off ? '0.12' : '1';
    });
    if (current && pins[current].entry.hidden) { current = null; Object.keys(pins).forEach(function (k) { pins[k].btn.setAttribute('aria-pressed', 'false'); pins[k].entry.classList.remove('is-active'); }); emptySpot(); }
  }

  document.addEventListener('click', function (e) {
    var f = e.target.closest('[data-filter]');
    if (f) { applyFilter(f.getAttribute('data-filter')); return; }
    var g = e.target.closest('[data-focus]');
    if (g) {
      select(g.getAttribute('data-focus'), false);
      box.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
    }
  });

  document.addEventListener('langchange', function () {
    labels();
    if (current) select(current, false); else emptySpot();
  });

  labels();
  var hash = location.hash.replace('#', '');
  if (hash && pins[hash]) select(hash, true);
})();
