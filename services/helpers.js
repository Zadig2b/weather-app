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
  const localTime = unixToLocalTime(currentTime, timezone);
  return unitSystem === "imperial" ? timeTo12HourFormat(localTime) : localTime;
};

// Get AM/PM: Extracts AM/PM based on unit system
export const getAMPM = (unitSystem, currentTime, timezone) => {
  if (unitSystem === "imperial") {
    const localTime = unixToLocalTime(currentTime, timezone);
    const hours = parseInt(localTime.split(":")[0], 10);
    return hours >= 12 ? "PM" : "AM";
  }
  return "";
};

// Get Week Day: Returns the day of the week
export const getWeekDay = (weatherData) => {
  if (!weatherData || !weatherData.dt || !weatherData.timezone) {
    return "Invalid data"; // Return error message if data is invalid
  }

  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return weekday[
    new Date((weatherData.dt + weatherData.timezone) * 1000).getUTCDay()
  ];
};
