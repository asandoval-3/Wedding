(function () {
  // Wedding day: Saturday, September 4, 2027 in Albuquerque (Mountain Daylight Time, UTC-6).
  // No ceremony time yet, so the countdown runs to the start of the day.
  // When you know the time, change "00:00" below (e.g. "16:30").
  var WEDDING = new Date('2027-09-04T00:00:00-06:00');
  var SITE_URL = 'https://asandoval-3.github.io/Wedding/';

  // Mailing-address form -> Google Form.
  // Paste your Google Form's "formResponse" address and each question's entry number here.
  // If `action` is ever emptied, the address section hides itself.
  var ADDRESS_FORM = {
    action: 'https://docs.google.com/forms/d/e/1FAIpQLSfYQpPWRC9BMNUEjPjMOm5BNABCINFlilndiZNV9VRPvHewXA/formResponse',
    fields: {
      name: 'entry.588752495',
      line1: 'entry.508237800',
      city: 'entry.1570830363',
      state: 'entry.1521736930',
      zip: 'entry.1155542427'
    }
  };

  var TEXT = {
    en: {
      envelopeFor: 'A little note from',
      openLabel: 'Open the envelope',
      tap: 'Tap to open',
      saveTheDate: 'Save the Date',
      photoAlt: 'Jacqueline and Alejandro in a garden',
      married: 'are getting married',
      weekday: 'Saturday',
      monthYear: 'Sept 2027',
      place: 'Albuquerque, New Mexico',
      countdownTitle: 'Counting down the days',
      days: 'Days', hours: 'Hours', mins: 'Min', secs: 'Sec',
      today: "Today's the day!",
      calendarTitle: 'Add it to your calendar',
      formal: 'Formal invitation to follow',
      replay: 'Open the envelope again',
      credit: 'Designed with love by Alejandro Sandoval',
      eventTitle: "Jacqueline & Alejandro's Wedding",
      eventDetails: 'Save the date! Formal invitation to follow. ' + SITE_URL,
      travelTitle: 'Traveling in?',
      laborDay: "It's Labor Day weekend.",
      travelText: 'Flights and hotels fill up fast, so book early.',
      addressTitle: 'Where should we mail it?',
      addressIntro: 'Share your mailing address so your invitation finds you.',
      addressOpen: 'Share my address',
      fName: 'Name(s) for the envelope',
      fLine1: 'Street address',
      fLine1Hint: 'Include your apt or unit number, if you have one',
      fCity: 'City', fState: 'State', fZip: 'ZIP',
      fSubmit: 'Send my address',
      fSending: 'Sending…',
      fRequired: 'Please fill this in.',
      fFailed: "That didn't go through. Please check your connection and try again.",
      fThanks: 'Thank you! Your invitation will find its way to you.'
    },
    es: {
      envelopeFor: 'Una notita de',
      openLabel: 'Abrir el sobre',
      tap: 'Toca para abrir',
      saveTheDate: 'Reserva la Fecha',
      photoAlt: 'Jacqueline y Alejandro en un jardín',
      married: '¡nos casamos!',
      weekday: 'Sábado',
      monthYear: 'Sept 2027',
      place: 'Albuquerque, Nuevo México',
      countdownTitle: 'Contando los días',
      days: 'Días', hours: 'Horas', mins: 'Min', secs: 'Seg',
      today: '¡Hoy es el gran día!',
      calendarTitle: 'Agrégalo a tu calendario',
      formal: 'La invitación formal llegará pronto',
      replay: 'Abrir el sobre otra vez',
      credit: 'Diseñado con amor por Alejandro Sandoval',
      eventTitle: 'Boda de Jacqueline & Alejandro',
      eventDetails: '¡Reserva la fecha! La invitación formal llegará pronto. ' + SITE_URL,
      travelTitle: '¿Vienes de fuera?',
      laborDay: 'Es el fin de semana del Día del Trabajo.',
      travelText: 'Los vuelos y hoteles se llenan rápido, así que reserva con tiempo.',
      addressTitle: '¿A dónde te la enviamos?',
      addressIntro: 'Compártenos tu dirección postal para que tu invitación te llegue.',
      addressOpen: 'Compartir mi dirección',
      fName: 'Nombre(s) para el sobre',
      fLine1: 'Calle y número',
      fLine1Hint: 'Incluye tu número de departamento o interior, si tienes',
      fCity: 'Ciudad', fState: 'Estado', fZip: 'Código postal',
      fSubmit: 'Enviar mi dirección',
      fSending: 'Enviando…',
      fRequired: 'Por favor llena este campo.',
      fFailed: 'No se pudo enviar. Revisa tu conexión e intenta de nuevo.',
      fThanks: '¡Gracias! Tu invitación llegará a tus manos.'
    }
  };

  var LOCATION = 'Albuquerque, New Mexico';

  // ---------- Language ----------
  function savedLang() {
    try { return localStorage.getItem('lang'); } catch (e) { return null; }
  }
  function saveLang(l) {
    try { localStorage.setItem('lang', l); } catch (e) { /* private mode: ignore */ }
  }

  var lang = savedLang() ||
    ((navigator.language || '').toLowerCase().indexOf('es') === 0 ? 'es' : 'en');

  function applyLang() {
    var t = TEXT[lang];
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      el.textContent = t[el.getAttribute('data-i18n')];
    });
    document.querySelectorAll('[data-i18n-label]').forEach(function (el) {
      el.setAttribute('aria-label', t[el.getAttribute('data-i18n-label')]);
    });
    document.querySelectorAll('[data-i18n-alt]').forEach(function (el) {
      el.setAttribute('alt', t[el.getAttribute('data-i18n-alt')]);
    });
    document.querySelectorAll('.lang [data-lang]').forEach(function (el) {
      el.classList.toggle('active', el.getAttribute('data-lang') === lang);
    });
    updateCalendarLinks(t);
  }

  document.getElementById('lang').addEventListener('click', function () {
    lang = lang === 'en' ? 'es' : 'en';
    saveLang(lang);
    applyLang();
  });

  // ---------- Add to calendar (all-day event) ----------
  function updateCalendarLinks(t) {
    var enc = encodeURIComponent;
    document.getElementById('cal-google').href =
      'https://calendar.google.com/calendar/render?action=TEMPLATE' +
      '&text=' + enc(t.eventTitle) +
      '&dates=20270904/20270905' +
      '&location=' + enc(LOCATION) +
      '&details=' + enc(t.eventDetails);

    document.getElementById('cal-outlook').href =
      'https://outlook.live.com/calendar/0/deeplink/compose?path=%2Fcalendar%2Faction%2Fcompose&rru=addevent' +
      '&subject=' + enc(t.eventTitle) +
      '&startdt=2027-09-04&enddt=2027-09-05&allday=true' +
      '&location=' + enc(LOCATION) +
      '&body=' + enc(t.eventDetails);
    // Apple uses the save-the-date.ics file linked in the HTML.
  }

  // ---------- Countdown ----------
  function pad(n) { return n < 10 ? '0' + n : String(n); }

  function tick() {
    var ms = WEDDING - new Date();
    if (ms <= 0) {
      document.getElementById('countdown').hidden = true;
      document.getElementById('countdown-done').hidden = false;
      return;
    }
    var s = Math.floor(ms / 1000);
    setTile('cd-days', String(Math.floor(s / 86400)));
    setTile('cd-hours', pad(Math.floor(s % 86400 / 3600)));
    setTile('cd-mins', pad(Math.floor(s % 3600 / 60)));
    setTile('cd-secs', pad(s % 60));
  }

  // Update one flip-clock tile, flipping it only when its number changes.
  function setTile(id, value) {
    var el = document.getElementById(id);
    if (el.textContent === value) return;
    var first = el.textContent === '–';
    el.textContent = value;
    if (first) return;
    el.classList.remove('flip');
    void el.offsetWidth; // restart the animation
    el.classList.add('flip');
  }

  // ---------- Envelope ----------
  var scene = document.getElementById('scene');
  var card = document.getElementById('card');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function openEnvelope() {
    if (scene.classList.contains('opening')) return;
    scene.classList.add('opening');
    if (!reduceMotion) setTimeout(burstPetals, 650);
    var wait = reduceMotion ? 0 : 1900;
    setTimeout(function () {
      scene.classList.add('leaving');
      setTimeout(function () {
        scene.hidden = true;
        card.hidden = false;
        card.classList.add('show');
        window.scrollTo(0, 0);
      }, reduceMotion ? 0 : 600);
    }, wait);
  }

  // Petals burst out of the envelope, then drift down and fade.
  var PETAL_COLORS = ['#D4A09A', '#AD5433', '#EAD9B8', '#FBF7EF', '#C58C85'];
  function burstPetals() {
    var layer = document.getElementById('petals');
    var env = document.getElementById('env').getBoundingClientRect();
    if (!layer || !layer.animate) return;
    var cx = env.left + env.width / 2, cy = env.top + env.height * 0.35;
    var reach = Math.max(140, Math.min(window.innerWidth, 900) * 0.45);
    for (var i = 0; i < 40; i++) {
      (function () {
        var p = document.createElement('i');
        var angle = Math.random() * Math.PI * 2;
        var dist = reach * (0.35 + Math.random() * 0.65);
        var dx = Math.cos(angle) * dist, dy = Math.sin(angle) * dist * 0.7 - 40;
        var spin = Math.random() * 540 - 270, size = 0.7 + Math.random() * 0.7;
        p.style.left = (cx - 5) + 'px';
        p.style.top = (cy - 8) + 'px';
        p.style.background = PETAL_COLORS[i % PETAL_COLORS.length];
        layer.appendChild(p);
        p.animate([
          { transform: 'translate(0,0) rotate(0deg) scale(.3)', opacity: 0 },
          { transform: 'translate(' + dx * 0.8 + 'px,' + dy * 0.8 + 'px) rotate(' + spin * 0.6 + 'deg) scale(' + size + ')', opacity: 1, offset: 0.3 },
          { transform: 'translate(' + dx * 1.15 + 'px,' + (dy + 220 + Math.random() * 160) + 'px) rotate(' + spin + 'deg) scale(' + size + ')', opacity: 0 }
        ], { duration: 2600 + Math.random() * 1200, delay: Math.random() * 250, easing: 'cubic-bezier(.2,.6,.4,1)', fill: 'both' })
          .onfinish = function () { p.remove(); };
      })();
    }
  }

  function closeEnvelope() {
    card.hidden = true;
    card.classList.remove('show');
    scene.classList.remove('opening', 'leaving');
    scene.hidden = false;
    window.scrollTo(0, 0);
  }

  document.getElementById('env').addEventListener('click', openEnvelope);
  document.getElementById('replay').addEventListener('click', closeEnvelope);

  // ---------- Mailing-address form ----------
  var addressSection = document.getElementById('address');
  var form = document.getElementById('address-form');
  var openBtn = document.getElementById('address-open');
  var statusEl = document.getElementById('address-status');
  var thanks = document.getElementById('address-thanks');

  function alreadySent() {
    try { return localStorage.getItem('addressSent') === '1'; } catch (e) { return false; }
  }

  function showThanks() {
    form.hidden = true;
    openBtn.hidden = true;
    thanks.hidden = false;
  }

  if (ADDRESS_FORM.action) {
    addressSection.hidden = false;
    if (alreadySent()) showThanks();
  }

  openBtn.addEventListener('click', function () {
    var open = form.hidden;
    form.hidden = !open;
    openBtn.setAttribute('aria-expanded', String(open));
    if (open) document.getElementById('f-name').focus();
  });

  function setError(input, msg) {
    var err = document.getElementById(input.id + '-err');
    input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    if (err) { err.textContent = msg || ''; err.hidden = !msg; }
  }

  function validate() {
    var t = TEXT[lang], firstBad = null;
    form.querySelectorAll('input').forEach(function (input) {
      var v = input.value.trim(), msg = '';
      if (input.required && !v) msg = t.fRequired;
      setError(input, msg);
      if (msg && !firstBad) firstBad = input;
    });
    if (firstBad) firstBad.focus();
    return !firstBad;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validate()) return;
    var t = TEXT[lang];
    var submit = document.getElementById('address-submit');
    var body = new URLSearchParams();
    Object.keys(ADDRESS_FORM.fields).forEach(function (key) {
      var entry = ADDRESS_FORM.fields[key];
      if (!entry) return;
      var value = form.elements[key] ? form.elements[key].value.trim() : '';
      body.append(entry, value);
    });
    submit.disabled = true;
    submit.textContent = t.fSending;
    statusEl.textContent = '';
    // Google Forms doesn't allow reading the reply from another site, so "no-cors" is used
    // and a completed request counts as sent.
    fetch(ADDRESS_FORM.action, { method: 'POST', mode: 'no-cors', body: body })
      .then(function () {
        try { localStorage.setItem('addressSent', '1'); } catch (err) { /* ignore */ }
        showThanks();
        thanks.focus();
      })
      .catch(function () {
        statusEl.textContent = t.fFailed;
      })
      .then(function () {
        submit.disabled = false;
        submit.textContent = TEXT[lang].fSubmit;
      });
  });

  form.querySelectorAll('input').forEach(function (input) {
    input.addEventListener('input', function () {
      if (input.getAttribute('aria-invalid') === 'true') setError(input, '');
    });
  });

  // ---------- Night sky ----------
  // A small fixed-seed random generator, so the stars sit in the same places on every visit.
  function seeded(seed) {
    return function () {
      seed = (seed + 0x6D2B79F5) | 0;
      var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  (function paintSky() {
    var rand = seeded(7), wide = window.innerWidth >= 900;
    var stars = document.getElementById('stars'), html = '';
    for (var i = 0; i < (wide ? 110 : 60); i++) {
      html += '<i style="left:' + (1 + rand() * 98).toFixed(1) + '%;top:' + (1 + rand() * 57).toFixed(1) +
        '%;--s:' + [1.5, 2, 2, 2.5, 3][Math.floor(rand() * 5)] + 'px;opacity:' + (0.45 + rand() * 0.55).toFixed(2) +
        ';animation-delay:-' + (rand() * 4).toFixed(1) + 's"></i>';
    }
    stars.innerHTML = html;

    var lum = document.getElementById('luminarias'), count = Math.max(12, Math.min(40, Math.round(window.innerWidth / 34)));
    html = '';
    for (var j = 0; j < count; j++) {
      html += '<b style="left:' + (2 + (j + 0.5) * 96 / count + (rand() - 0.5) * 1.6).toFixed(1) + '%;bottom:' +
        Math.round(6 + rand() * 8) + 'px;animation-delay:-' + (rand() * 2.8).toFixed(1) + 's"></b>';
    }
    lum.innerHTML = html;
  })();

  // Link straight to the card with ...#card (handy for testing)
  if (location.hash === '#card') {
    scene.hidden = true;
    card.hidden = false;
  }

  applyLang();
  tick();
  setInterval(tick, 1000);
})();
