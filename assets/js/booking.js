/* Pagina Prenota: calendario, camera, ospiti, riepilogo e messaggio WhatsApp.
   Tutto di esempio: prezzi per stagione e notti "occupate" sono calcolati qui, non vengono da nessun archivio. */
(function () {
  'use strict';

  var root = document.querySelector('[data-book]');
  if (!root) return;

  var O = window.Ostro;
  var WA = 'https://wa.me/393517578080';
  var DAY = 86400000;
  var ROOMS = { alba: { name: 'Alba', base: 85, max: 2 }, meriggio: { name: 'Meriggio', base: 95, max: 3 }, sera: { name: 'Sera', base: 110, max: 2 } };
  var SEASON = [1, 1, 1, 1.2, 1.2, 1.5, 1.8, 1.8, 1.5, 1.2, 1, 1];   // per mese, gennaio = 0
  var MAX_NIGHTS = 14;

  function $(s) { return root.querySelector(s); }
  function midnight(d) { return new Date(d.getFullYear(), d.getMonth(), d.getDate()); }
  function addDays(d, n) { return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n); }
  function key(d) { return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate(); }
  function iso(d) { return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2); }
  function fromIso(s) { var p = s.split('-'); return new Date(+p[0], +p[1] - 1, +p[2]); }

  var today = midnight(new Date());
  var lastDay = addDays(today, 365);
  var st = {
    start: null, end: null,
    month: new Date(today.getFullYear(), today.getMonth(), 1),
    room: 'alba', guests: 2, err: '', focus: null, sent: false
  };

  /* Notti "occupate": una regola fissa, uguale per tutti, solo per l'esempio */
  function taken(d) { return (d.getDate() * 7 + d.getMonth() * 5 + d.getFullYear()) % 13 === 0 && d >= today; }
  function nightPrice(room, d) { return Math.round(ROOMS[room].base * SEASON[d.getMonth()] / 5) * 5; }

  function fmt(d, opts) { return new Intl.DateTimeFormat(O.d.locale, opts).format(d); }
  function long(d) { return fmt(d, { day: 'numeric', month: 'long', year: 'numeric' }); }

  /* Calendario ---------------------------------------------------------- */
  var elDays = $('[data-cal-days]');
  var elDow = $('[data-cal-dow]');
  var elTitle = $('[data-cal-title]');
  var btnPrev = $('[data-cal-prev]');
  var btnNext = $('[data-cal-next]');
  var elHint = $('[data-cal-hint]');

  function renderDow() {
    var monday = new Date(2024, 0, 1), h = '';
    for (var i = 0; i < 7; i++) h += '<span class="cal__dow">' + fmt(addDays(monday, i), { weekday: 'short' }).replace('.', '') + '</span>';
    elDow.innerHTML = h;
  }

  function dayLabel(d, cls) {
    var s = long(d) + ', ';
    if (cls.past) return s + O.d.past;
    if (cls.start || cls.end) return s + O.d.sel;
    return s + (cls.taken ? O.d.taken : O.d.avail);
  }

  function renderCal() {
    var m = st.month;
    elTitle.textContent = fmt(m, { month: 'long', year: 'numeric' });
    var first = new Date(m.getFullYear(), m.getMonth(), 1);
    var lead = (first.getDay() + 6) % 7;
    var count = new Date(m.getFullYear(), m.getMonth() + 1, 0).getDate();
    var html = '';
    for (var i = 0; i < lead; i++) html += '<span class="cal__empty"></span>';
    for (var n = 1; n <= count; n++) {
      var d = new Date(m.getFullYear(), m.getMonth(), n);
      var cls = {
        past: d < today || d > lastDay,
        taken: taken(d),
        start: st.start && key(d) === key(st.start),
        end: st.end && key(d) === key(st.end),
        mid: st.start && st.end && d > st.start && d < st.end,
        today: key(d) === key(today)
      };
      var c = 'cal__day' + (cls.taken ? ' is-taken' : '') + (cls.today ? ' is-today' : '') + (cls.mid ? ' is-in-range' : '') +
        (cls.start ? ' is-start' : '') + (cls.end ? ' is-end' : '') + (cls.start && st.end ? ' has-range' : '');
      var isFocus = st.focus ? key(d) === st.focus : (cls.start || (!st.start && key(d) === key(today)));
      html += '<button type="button" class="' + c + '" data-d="' + iso(d) + '"' + (cls.past ? ' disabled' : '') +
        ' tabindex="' + (isFocus && !cls.past ? 0 : -1) + '" aria-label="' + dayLabel(d, cls) + '"' +
        ((cls.start || cls.end) ? ' aria-pressed="true"' : '') + '>' + n + '</button>';
    }
    elDays.innerHTML = html;
    if (!elDays.querySelector('[tabindex="0"]')) {
      var any = elDays.querySelector('.cal__day:not([disabled])');
      if (any) any.tabIndex = 0;
    }
    btnPrev.disabled = (m.getFullYear() === today.getFullYear() && m.getMonth() === today.getMonth());
    var lm = new Date(lastDay.getFullYear(), lastDay.getMonth(), 1);
    btnNext.disabled = key(m) >= key(lm);
    renderHint();
  }

  function renderHint() {
    var dd = O.d;
    elHint.style.color = st.err ? '#a3211a' : '';
    if (st.err) elHint.textContent = dd[st.err];
    else if (!st.start) elHint.textContent = dd.hintStart;
    else if (!st.end) elHint.textContent = dd.hintEnd;
    else elHint.textContent = dd.hintOk(nights(), long(st.start), long(st.end));
  }

  function nights() { return st.start && st.end ? Math.round((st.end - st.start) / DAY) : 0; }

  function pick(d) {
    st.err = '';
    st.focus = key(d);
    if (!st.start || st.end) {
      if (taken(d)) st.err = 'errStartTaken';
      else { st.start = d; st.end = null; }
    } else if (d <= st.start) {
      if (taken(d)) st.err = 'errStartTaken';
      else { st.start = d; }
    } else {
      var bad = false;
      for (var x = st.start; x < d; x = addDays(x, 1)) { if (taken(x)) { bad = true; break; } }
      if (bad) st.err = 'errTaken';
      else if (Math.round((d - st.start) / DAY) > MAX_NIGHTS) st.err = 'errLong';
      else st.end = d;
    }
    renderCal();
    renderSummary();
    var f = elDays.querySelector('[data-d="' + iso(d) + '"]');
    if (f) f.focus({ preventScroll: true });
  }

  elDays.addEventListener('click', function (e) {
    var b = e.target.closest('.cal__day');
    if (b && !b.disabled) pick(fromIso(b.getAttribute('data-d')));
  });

  elDays.addEventListener('keydown', function (e) {
    var b = e.target.closest('.cal__day');
    if (!b) return;
    var d = fromIso(b.getAttribute('data-d')), step = 0;
    if (e.key === 'ArrowLeft') step = -1;
    else if (e.key === 'ArrowRight') step = 1;
    else if (e.key === 'ArrowUp') step = -7;
    else if (e.key === 'ArrowDown') step = 7;
    else return;
    e.preventDefault();
    var t = addDays(d, step);
    if (t < today || t > lastDay) return;
    st.focus = key(t);
    st.month = new Date(t.getFullYear(), t.getMonth(), 1);
    renderCal();
    var f = elDays.querySelector('[data-d="' + iso(t) + '"]');
    if (f) f.focus();
  });

  btnPrev.addEventListener('click', function () { st.focus = null; st.month = new Date(st.month.getFullYear(), st.month.getMonth() - 1, 1); renderCal(); });
  btnNext.addEventListener('click', function () { st.focus = null; st.month = new Date(st.month.getFullYear(), st.month.getMonth() + 1, 1); renderCal(); });

  /* Camera e ospiti ------------------------------------------------------ */
  var radios = [].slice.call(root.querySelectorAll('input[name="room"]'));
  var outGuests = $('[data-guests-out]');

  function roomChanged() {
    var r = radios.filter(function (x) { return x.checked; })[0];
    st.room = r ? r.value : 'alba';
    if (st.guests > ROOMS[st.room].max) st.guests = ROOMS[st.room].max;
    outGuests.textContent = st.guests;
    renderSummary();
  }
  radios.forEach(function (r) { r.addEventListener('change', roomChanged); });
  var qs = new URLSearchParams(location.search).get('room');
  if (qs && ROOMS[qs]) radios.forEach(function (r) { r.checked = r.value === qs; });

  root.addEventListener('click', function (e) {
    var g = e.target.closest('[data-guests]');
    if (!g) return;
    var n = st.guests + (+g.getAttribute('data-guests'));
    var max = ROOMS[st.room].max;
    st.guests = Math.min(max, Math.max(1, n));
    outGuests.textContent = st.guests;
    renderSummary();
    if (n > max) { elFormErr.textContent = O.d.maxGuests(max); } else { elFormErr.textContent = ''; }
  });

  /* Riepilogo ----------------------------------------------------------- */
  var elSum = $('[data-summary]');
  var elFormErr = $('[data-form-err]');

  function total() {
    var sum = 0;
    for (var x = st.start; x < st.end; x = addDays(x, 1)) sum += nightPrice(st.room, x);
    return sum;
  }

  function renderSummary() {
    var dd = O.d;
    if (!st.start || !st.end) {
      elSum.className = 'summary summary--empty rv in';
      elSum.innerHTML = '<p id="sum-h">' + O.t('Scegli le date: qui compare il riepilogo.') + '</p>';
      return;
    }
    elSum.className = 'summary rv in';
    elSum.innerHTML = '<h2 id="sum-h">' + dd.sumTitle + '</h2><dl>' +
      '<div><dt>' + dd.room + '</dt><dd>' + ROOMS[st.room].name + '</dd></div>' +
      '<div><dt>' + dd.dates + '</dt><dd>' + fmt(st.start, { day: 'numeric', month: 'short' }) + ' → ' + fmt(st.end, { day: 'numeric', month: 'short', year: 'numeric' }) + '</dd></div>' +
      '<div><dt>' + dd.nights + '</dt><dd>' + nights() + '</dd></div>' +
      '<div><dt>' + dd.guests + '</dt><dd>' + st.guests + '</dd></div></dl>' +
      '<p class="total"><span>' + dd.total + '</span><span>' + total() + ' €</span></p>';
  }

  /* Invio: prepara il messaggio e apre WhatsApp -------------------------- */
  var nameInput = $('#name'), nameBox = $('[data-f="name"]'), nameErr = $('#name-err');
  var status = $('[data-status]'), prev = $('[data-preview]'), msgBox = $('#msg');
  var sendBtn = $('[data-send]');

  function fail(msg, target) {
    elFormErr.textContent = msg;
    if (target) target.focus();
  }

  nameInput.addEventListener('input', function () {
    if (nameInput.value.trim().length > 1) { nameBox.classList.remove('field--err'); nameErr.textContent = ''; nameInput.removeAttribute('aria-invalid'); }
  });

  function buildMessage() {
    return O.d.msg({
      room: ROOMS[st.room].name, a: long(st.start), b: long(st.end), n: nights(), g: st.guests,
      total: total(), name: nameInput.value.trim(), note: ($('#note').value || '').trim()
    });
  }

  sendBtn.addEventListener('click', function () {
    var dd = O.d;
    elFormErr.textContent = '';
    nameBox.classList.remove('field--err'); nameErr.textContent = '';
    if (!st.start || !st.end) {
      fail(dd.errDates, elDays.querySelector('[tabindex="0"]'));
      return;
    }
    if (nameInput.value.trim().length < 2) {
      nameBox.classList.add('field--err');
      nameInput.setAttribute('aria-invalid', 'true');
      nameErr.textContent = dd.errName;
      nameInput.focus();
      return;
    }
    var text = buildMessage();
    msgBox.value = text;
    prev.hidden = false;
    st.sent = true;
    status.className = 'status is-busy';
    status.textContent = dd.busy;
    sendBtn.disabled = true;
    var url = WA + '?text=' + encodeURIComponent(text);
    var w = window.open(url, '_blank', 'noopener');
    if (!w) location.href = url;   // se il telefono blocca la nuova scheda
    setTimeout(function () {
      sendBtn.disabled = false;
      status.className = 'status';
      status.textContent = O.d.ready;
    }, 1200);
  });

  $('[data-copy]').addEventListener('click', function () {
    var done = function () { status.className = 'status'; status.textContent = O.d.copied; };
    var oops = function () { msgBox.focus(); msgBox.select(); status.className = 'status'; status.textContent = O.d.copyFail; };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(msgBox.value).then(done, oops);
    else { msgBox.focus(); msgBox.select(); try { document.execCommand('copy') ? done() : oops(); } catch (e) { oops(); } }
  });

  /* Cambio lingua: ridisegna tutto quello che il codice compone da solo */
  document.addEventListener('langchange', function () {
    renderDow(); renderCal(); renderSummary();
    if (st.sent && st.start && st.end && nameInput.value.trim().length > 1) msgBox.value = buildMessage();
    if (nameBox.classList.contains('field--err')) nameErr.textContent = O.d.errName;
  });

  renderDow();
  renderCal();
  roomChanged();
})();
