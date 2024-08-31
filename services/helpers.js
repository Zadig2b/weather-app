import {
  unixToLocalTime,
  kmToMiles,
  mpsToMph,
  timeTo12HourFormat,
} from "./converters";

// Get Wind Speed: Converts wind speed based on unit system
export const getWindSpeed = (unitSystem, windInMps) =>
  unitSystem === "metric" ? windInMps : mpsToMph(windInMps);

// Get Visibility: Converts visibility based on unit system
export const getVisibility = (unitSystem, visibilityInMeters) =>
  unitSystem === "metric"
    ? (visibilityInMeters / 1000).toFixed(1)
    : kmToMiles(visibilityInMeters / 1000);

// Get Time: Converts time based on unit system
export const getTime = (unitSystem, currentTime, timezone) => {
  const localTime = new Date(currentTime); // Directly parse the ISO 8601 string into a Date object

  const options = {
    hour: "numeric",
    minute: "numeric",
    hour12: unitSystem === "imperial", // Use 12-hour format for imperial system
    timeZone: timezone, // Apply the timezone for accurate local time
  };

  // Format the time
  let formattedTime = localTime.toLocaleTimeString(undefined, options);

  // If in imperial system, remove AM/PM for a pure time value
  if (unitSystem === "imperial") {
    formattedTime = formattedTime.replace(/(AM|PM)/, "").trim();
  }

  return formattedTime; // Return the formatted time without AM/PM if required
};

// Get AM/PM: Extracts AM/PM based on unit system
export const getAMPM = (unitSystem, currentTime, timezone) => {
  if (unitSystem === "imperial") {
    const localTime = new Date(currentTime).toLocaleTimeString(undefined, {
      timeZone: timezone,
      hour: "numeric",
      hour12: true,
    });

    // Extract AM/PM from the formatted time string
    const amPm = localTime.split(" ")[1];
    return amPm;
  }
  return "";
};

// Get Week Day: Returns the day of the week
export const getWeekDay = (localTime, timezone) => {
  return localTime.toLocaleDateString("en-US", {
    weekday: "long",
    timeZone: timezone,
  });
};
