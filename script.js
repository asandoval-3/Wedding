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
      photoAlt: 'Alejandro and Jacqueline in a garden',
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
      eventTitle: "Alejandro & Jacqueline's Wedding",
      eventDetails: 'Save the date! Formal invitation to follow. ' + SITE_URL,
      travelTitle: 'Traveling in?',
      laborDay: "It's Labor Day weekend.",
      travelText: 'Flights and hotels fill up fast, so book early.',
      addressTitle: 'Where should we mail it?',
      addressIntro: 'Share your mailing address so your invitation finds you.',
      addressOpen: 'Share my address',
      fName: 'Name(s) for the envelope',
      fNameHint: 'e.g. Maria & Jose Garcia, or The Garcia Family',
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
      photoAlt: 'Alejandro y Jacqueline en un jardín',
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
      eventTitle: 'Boda de Alejandro & Jacqueline',
      eventDetails: '¡Reserva la fecha! La invitación formal llegará pronto. ' + SITE_URL,
      travelTitle: '¿Vienes de fuera?',
      laborDay: 'Es el fin de semana del Día del Trabajo.',
      travelText: 'Los vuelos y hoteles se llenan rápido, así que reserva con tiempo.',
      addressTitle: '¿A dónde te la enviamos?',
      addressIntro: 'Compártenos tu dirección postal para que tu invitación te llegue.',
      addressOpen: 'Compartir mi dirección',
      fName: 'Nombre(s) para el sobre',
      fNameHint: 'p. ej. María y José García, o Familia García',
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
    document.getElementById('cd-days').textContent = Math.floor(s / 86400);
    document.getElementById('cd-hours').textContent = pad(Math.floor(s % 86400 / 3600));
    document.getElementById('cd-mins').textContent = pad(Math.floor(s % 3600 / 60));
    document.getElementById('cd-secs').textContent = pad(s % 60);
  }

  // ---------- Envelope ----------
  var scene = document.getElementById('scene');
  var card = document.getElementById('card');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function openEnvelope() {
    if (scene.classList.contains('opening')) return;
    scene.classList.add('opening');
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

  // Link straight to the card with ...#card (handy for testing)
  if (location.hash === '#card') {
    scene.hidden = true;
    card.hidden = false;
  }

  applyLang();
  tick();
  setInterval(tick, 1000);
})();
