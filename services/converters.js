export const ctoF = (c) => (c * 9) / 5 + 32;

export const mpsToMph = (mps) => (mps * 2.236936).toFixed(2);

export const kmToMiles = (km) => (km / 1.609).toFixed(1);

export const timeTo12HourFormat = (time) => {
  const [hours, minutes] = time.split(":").map(Number);
  if (isNaN(hours) || isNaN(minutes)) {
    return "Invalid time"; // Retourne un message d'erreur si les valeurs sont incorrectes
  }

  const period = hours >= 12 ? "PM" : "AM";
  const adjustedHours = hours % 12 || 12; // Ajuste les heures pour le format 12 heures

  return `${adjustedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
};

export const degToCompass = (num) => {
  var val = Math.round(num / 22.5);
  var arr = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  return arr[val % 16];
};

export const unixToLocalTime = (unixSeconds, timezoneOffset) => {
  if (typeof unixSeconds !== "number" || typeof timezoneOffset !== "number") {
    return "Invalid time"; // Retourne un message d'erreur si les valeurs sont incorrectes
  }

  // Crée une nouvelle date en utilisant le temps Unix ajusté avec le décalage horaire
  const date = new Date((unixSeconds + timezoneOffset) * 1000);

  // Utilise toLocaleTimeString pour obtenir l'heure locale
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};
