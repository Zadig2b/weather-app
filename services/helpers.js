import {
  unixToLocalTime,
  kmToMiles,
  mpsToMph,
  timeTo12HourFormat,
} from "./converters";

// Obtenir la vitesse du vent : convertit la vitesse du vent en fonction du système d'unités
export const getWindSpeed = (unitSystem, windInKmh) =>
  unitSystem === "metric" ? windInKmh : kmToMiles(windInKmh);

// Obtenir la visibilité : convertit la visibilité en fonction du système d'unités
export const getVisibility = (unitSystem, visibilityInMeters) =>
  unitSystem === "metric"
    ? (visibilityInMeters / 1000).toFixed(1)
    : kmToMiles(visibilityInMeters / 1000);

// Obtenir l'heure : convertit l'heure en fonction du système d'unités
export const getTime = (unitSystem, currentTime, timezone) => {
  const localTime = new Date(currentTime); // Analyser directement la chaîne ISO 8601 dans un objet Date

  const options = {
    hour: "numeric",
    minute: "numeric",
    hour12: unitSystem === "imperial", // Utiliser le format 12 heures pour le système impérial
    timeZone: timezone, // Appliquer le fuseau horaire pour une heure locale précise
  };

  // Formater l'heure
  let formattedTime = localTime.toLocaleTimeString(undefined, options);

  // Si on est dans le système impérial, supprime AM/PM.
  if (unitSystem === "imperial") {
    formattedTime = formattedTime.replace(/(AM|PM)/, "").trim();
  }

  return formattedTime; // Renvoie l'heure formatée sans AM/PM
};

// Obtenir AM/PM : extrait AM/PM en fonction du système d'unités
export const getAMPM = (unitSystem, currentTime, timezone) => {
  if (unitSystem === "imperial") {
    const localTime = new Date(currentTime).toLocaleTimeString(undefined, {
      timeZone: timezone,
      hour: "numeric",
      hour12: true,
    });

    // Extraire AM/PM de la chaîne d'heure formatée
    const amPm = localTime.split(" ")[1];
    return amPm;
  }
  return "";
};

// Obtenir le jour de la semaine
export const getWeekDay = (localTime, timezone) => {
  return localTime.toLocaleDateString("fr-Fr", {
    weekday: "long",
    timeZone: timezone,
  });
};
