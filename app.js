/*!
 * Kindle Dashboard — vanilla JS + CSS version (ES5, no dependencies)
 */

/* ---------- Data ---------- */

var QUOTES = [
  {
    text: "The best way to predict the future is to create it.",
    author: "Peter Drucker",
  },
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
  { text: "Stay hungry, stay foolish.", author: "Steve Jobs" },
  {
    text: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs",
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
  },
  {
    text: "The only limit to our realization of tomorrow will be our doubts of today.",
    author: "Franklin D. Roosevelt",
  },
  {
    text: "Do what you can, with what you have, where you are.",
    author: "Theodore Roosevelt",
  },
  {
    text: "The journey of a thousand miles begins with a single step.",
    author: "Lao Tzu",
  },
  {
    text: "Whether you think you can, or you think you can't \u2014 you're right.",
    author: "Henry Ford",
  },
  {
    text: "Simplicity is the ultimate sophistication.",
    author: "Leonardo da Vinci",
  },
  {
    text: "The best time to plant a tree was 20 years ago. The second best time is now.",
    author: "Chinese Proverb",
  },
  {
    text: "Your time is limited, so don't waste it living someone else's life.",
    author: "Steve Jobs",
  },
  {
    text: "The mind is everything. What you think you become.",
    author: "Buddha",
  },
  {
    text: "Strive not to be a success, but rather to be of value.",
    author: "Albert Einstein",
  },
  {
    text: "The only impossible journey is the one you never begin.",
    author: "Tony Robbins",
  },
  {
    text: "Act as if what you do makes a difference. It does.",
    author: "William James",
  },
  { text: "Quality is not an act, it is a habit.", author: "Aristotle" },
  {
    text: "The secret of getting ahead is getting started.",
    author: "Mark Twain",
  },
  {
    text: "Don't watch the clock; do what it does. Keep going.",
    author: "Sam Levenson",
  },
];

function getDailyQuote() {
  var now = new Date();
  var dayOfYear = Math.floor(
    (now - new Date(now.getFullYear(), 0, 0)) / 86400000,
  );
  return QUOTES[dayOfYear % QUOTES.length];
}

var FALLBACK_WEATHER = {
  temperature: 27,
  feelsLike: 29,
  condition: "Sunny",
};

var DEFAULT_LOCATION = {
  latitude: 31.2304,
  longitude: 121.4737,
  timezone: "Asia/Shanghai",
};

var WEATHER_REFRESH_MS = 30 * 60 * 1000;

/* ---------- SVG icons (from lucide v0.468.0, ISC license) ---------- */

var SVG_ATTRS =
  'xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"' +
  ' stroke="currentColor" stroke-width="1.75" stroke-linecap="round"' +
  ' stroke-linejoin="round" class="weather-icon"';

var WEATHER_ICONS = {
  Sunny:
    "<svg " +
    SVG_ATTRS +
    ">" +
    '<path d="M12 2v2"/>' +
    '<path d="m4.93 4.93 1.41 1.41"/>' +
    '<path d="M20 12h2"/>' +
    '<path d="m19.07 4.93-1.41 1.41"/>' +
    '<path d="M15.947 12.65a4 4 0 0 0-5.925-4.128"/>' +
    '<path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z"/>' +
    "</svg>",
  Cloudy:
    "<svg " +
    SVG_ATTRS +
    ">" +
    '<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>' +
    "</svg>",
  Rain:
    "<svg " +
    SVG_ATTRS +
    ">" +
    '<path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/>' +
    '<path d="M16 14v6"/>' +
    '<path d="M8 14v6"/>' +
    '<path d="M12 16v6"/>' +
    "</svg>",
  Snow:
    "<svg " +
    SVG_ATTRS +
    ">" +
    '<path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/>' +
    '<path d="M8 15h.01"/>' +
    '<path d="M8 19h.01"/>' +
    '<path d="M12 17h.01"/>' +
    '<path d="M12 21h.01"/>' +
    '<path d="M16 15h.01"/>' +
    '<path d="M16 19h.01"/>' +
    "</svg>",
  Fog:
    "<svg " +
    SVG_ATTRS +
    ">" +
    '<path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/>' +
    '<path d="M16 17H7"/>' +
    '<path d="M17 21H9"/>' +
    "</svg>",
};

/* ---------- Weather helpers ---------- */

function mapWeatherCode(code) {
  if (code === 0 || code === 1) return "Sunny";
  if (code === 2 || code === 3) return "Cloudy";
  if (code === 45 || code === 48) return "Fog";
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) return "Snow";
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82) || code >= 95)
    return "Rain";
  return "Cloudy";
}

function buildOpenMeteoUrl(loc) {
  var tz = loc.timezone || "auto";
  return (
    "https://api.open-meteo.com/v1/forecast" +
    "?latitude=" +
    loc.latitude +
    "&longitude=" +
    loc.longitude +
    "&current=temperature_2m,apparent_temperature,weather_code" +
    "&timezone=" +
    encodeURIComponent(tz)
  );
}

function isOpenMeteoResponse(data) {
  if (typeof data !== "object" || data === null || !data.current) return false;
  var c = data.current;
  return (
    typeof c.temperature_2m === "number" &&
    typeof c.apparent_temperature === "number" &&
    typeof c.weather_code === "number"
  );
}

/* ---------- Weather fetch (XMLHttpRequest, callback) ---------- */

function fetchWeather(callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", buildOpenMeteoUrl(DEFAULT_LOCATION));

  xhr.onload = function () {
    if (xhr.status !== 200) {
      return;
    }
    try {
      var data = JSON.parse(xhr.responseText);
      if (!isOpenMeteoResponse(data)) return;
      callback({
        temperature: Math.round(data.current.temperature_2m),
        feelsLike: Math.round(data.current.apparent_temperature),
        condition: mapWeatherCode(data.current.weather_code),
      });
    } catch (e) {
      /* ignore parse errors, keep fallback */
    }
  };

  xhr.onerror = function () {
    /* network error, keep fallback */
  };

  xhr.send();
}

/* ---------- Rendering ---------- */

function renderWeather(w) {
  var iconEl = document.getElementById("weather-icon");
  var tempEl = document.getElementById("weather-temp");
  var condEl = document.getElementById("weather-condition");
  var feelsEl = document.getElementById("weather-feels");

  if (iconEl)
    iconEl.innerHTML = WEATHER_ICONS[w.condition] || WEATHER_ICONS.Cloudy;
  if (tempEl) tempEl.textContent = w.temperature;
  if (condEl) condEl.textContent = w.condition;
  if (feelsEl) feelsEl.textContent = "Feels like " + w.feelsLike + "\u00b0";
}

/* ---------- Clock ---------- */

var WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

var MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function pad2(n) {
  return (n < 10 ? "0" : "") + n;
}

function updateClock() {
  var now = new Date();
  var time = pad2(now.getHours()) + ":" + pad2(now.getMinutes());
  var dateLabel =
    WEEKDAYS[now.getDay()] +
    ", " +
    MONTHS[now.getMonth()] +
    " " +
    now.getDate();

  var timeEl = document.getElementById("clock-time");
  var dateEl = document.getElementById("clock-date");

  if (timeEl) {
    timeEl.textContent = time;
    timeEl.setAttribute("dateTime", time);
  }
  if (dateEl) dateEl.textContent = dateLabel;
}

function startClock() {
  updateClock();

  var now = new Date();
  var delay = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

  setTimeout(function () {
    updateClock();
    setInterval(updateClock, 60000);
  }, delay);
}

/* ---------- Init ---------- */

function init() {
  /* Quote */
  var quote = getDailyQuote();
  var quoteTextEl = document.getElementById("quote-text");
  var quoteAuthorEl = document.getElementById("quote-author");
  if (quoteTextEl) quoteTextEl.textContent = quote.text;
  if (quoteAuthorEl) quoteAuthorEl.textContent = "\u2014 " + quote.author;

  /* Clock */
  startClock();

  /* Weather — render fallback immediately, then fetch */
  renderWeather(FALLBACK_WEATHER);
  fetchWeather(function (weather) {
    renderWeather(weather);
  });
  setInterval(function () {
    fetchWeather(function (weather) {
      renderWeather(weather);
    });
  }, WEATHER_REFRESH_MS);
}

/* Run on DOM ready (script is at end of body, DOM is already parsed) */
init();
