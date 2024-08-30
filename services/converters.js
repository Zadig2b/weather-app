// Temperature Conversion: Celsius to Fahrenheit
export const ctoF = (c) => (c * 9) / 5 + 32;

// Speed Conversion: Meters per second to Miles per hour
export const mpsToMph = (mps) => (mps * 2.236936).toFixed(2);

// Distance Conversion: Kilometers to Miles
export const kmToMiles = (km) => (km / 1.609).toFixed(1);

// Time Formatting: Converts 24-hour time to 12-hour format
export const timeTo12HourFormat = (time) => {
  const [hours, minutes] = time.split(":").map(Number);
  if (isNaN(hours) || isNaN(minutes)) {
    return "Invalid time"; // Return error message if values are incorrect
  }

  const period = hours >= 12 ? "PM" : "AM";
  const adjustedHours = hours % 12 || 12; // Adjust hours for 12-hour format

  return `${adjustedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
};

// Wind Direction Conversion: Degrees to Compass Direction
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

// Unix Time Conversion: Converts Unix time to local time
export const unixToLocalTime = (unixSeconds, timezoneOffset) => {
  if (typeof unixSeconds !== "number" || typeof timezoneOffset !== "number") {
    return "Invalid time"; // Return error message if values are incorrect
  }

  // Create a new date object with Unix time adjusted by timezone offset
  const date = new Date((unixSeconds + timezoneOffset) * 1000);

  // Return the local time in "HH:MM" format
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};
