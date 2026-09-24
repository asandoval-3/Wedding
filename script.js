(function () {
  // Wedding day: Saturday, September 4, 2027 in Albuquerque (Mountain Daylight Time, UTC-6).
  // No ceremony time yet, so the countdown runs to the start of the day.
  // When you know the time, change "00:00" below (e.g. "16:30").
  var WEDDING = new Date('2027-09-04T00:00:00-06:00');
  var SITE_URL = 'https://asandoval-3.github.io/Wedding/';

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
      eventDetails: 'Save the date! Formal invitation to follow. ' + SITE_URL
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
      eventDetails: '¡Reserva la fecha! La invitación formal llegará pronto. ' + SITE_URL
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

  // Link straight to the card with ...#card (handy for testing)
  if (location.hash === '#card') {
    scene.hidden = true;
    card.hidden = false;
  }

  applyLang();
  tick();
  setInterval(tick, 1000);
})();
