// Conversion de température : Celsius en Fahrenheit
export const ctoF = (c) => (c * 9) / 5 + 32;

// Conversion de vitesse : mètres par seconde en milles par heure
export const mpsToMph = (mps) => (mps * 2.236936).toFixed(2);

// Conversion de distance : kilomètres en miles
export const kmToMiles = (km) => (km / 1.609).toFixed(1);

// Formatage de l'heure : convertit l'heure de 24 heures au format 12 heures
export const timeTo12HourFormat = (time) => {
  const [hours, minutes] = time.split(":").map(Number);
  if (isNaN(hours) || isNaN(minutes)) {
    return "Invalid time";
  }

  const period = hours >= 12 ? "PM" : "AM";
  const adjustedHours = hours % 12 || 12; // Ajuster les heures pour le format 12 heures

  return `${adjustedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
};

// Conversion de la direction du vent : degrés en direction de la boussole
export const degToCompass = (num) => {
  const val = Math.round(num / 22.5);
  const arr = [
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

// Conversion de l'heure Unix : convertit l'heure Unix en heure locale
export const unixToLocalTime = (unixSeconds, timezoneOffset) => {
  if (typeof unixSeconds !== "number" || typeof timezoneOffset !== "number") {
    return "Invalid time"; // Return error message if values are incorrect
  }

  // Créer un nouvel objet date avec l'heure Unix ajustée par décalage horaire
  const date = new Date((unixSeconds + timezoneOffset) * 1000);

  // Renvoie l'heure locale au format "HH:MM"
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};
