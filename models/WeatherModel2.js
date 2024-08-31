export class WeatherObject {
  constructor({
    latitude,
    longitude,
    generationtime_ms,
    utc_offset_seconds,
    timezone,
    timezone_abbreviation,
    elevation,
    current_units,
    current,
    daily,
    daily_units,
    hourly,
    hourly_units,
  }) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.generationTimeMs = generationtime_ms;
    this.utcOffsetSeconds = utc_offset_seconds;
    this.timezone = timezone;
    this.timezoneAbbreviation = timezone_abbreviation;
    this.elevation = elevation;
    this.currentUnits = current_units;
    this.current = current;
    this.daily = daily;
    this.dailyUnits = daily_units;
    this.hourly = hourly;
    this.hourlyUnits = hourly_units;
  }

  getFormattedTemperature() {
    return `${this.current.temperature_2m} ${this.currentUnits.temperature_2m}`;
  }

  getFormattedApparentTemperature() {
    return `${this.current.apparent_temperature} ${this.currentUnits.apparent_temperature}`;
  }

  getFormattedHumidity() {
    return `${this.current.relative_humidity_2m} ${this.currentUnits.relative_humidity_2m}`;
  }

  getFormattedWindSpeed() {
    return `${this.current.wind_speed_10m} ${this.currentUnits.wind_speed_10m}`;
  }

  getFormattedWindDirection() {
    return `${this.current.wind_direction_10m} ${this.currentUnits.wind_direction_10m}`;
  }

  getFormattedVisibility() {
    // Normalize times to the same format (e.g., ISO 8601 string)
    const currentTime = new Date(this.current.time).toISOString();
    console.log("Normalized Current time:", currentTime);

    // Find the closest time in hourly data
    let closestIndex = -1;
    let closestDiff = Infinity;

    this.hourly.time.forEach((hourlyTime, index) => {
      const hourlyDate = new Date(hourlyTime).toISOString();
      const diff = Math.abs(new Date(currentTime) - new Date(hourlyDate));
      if (diff < closestDiff) {
        closestDiff = diff;
        closestIndex = index;
      }
    });

    console.log("Closest time index:", closestIndex);

    const visibility =
      closestIndex !== -1 ? this.hourly.visibility[closestIndex] : null;
    return visibility ? `${visibility} ${this.hourlyUnits.visibility}` : "N/A";
  }

  getVisibility() {
    return this.hourly.visibility[0];
  }

  getFormattedTime() {
    return new Date(this.current.time).toLocaleString();
  }

  getFormattedSunrise() {
    return new Date(this.daily.sunrise[0]).toLocaleTimeString();
  }

  getFormattedSunset() {
    return new Date(this.daily.sunset[0]).toLocaleTimeString();
  }

  // Additional methods as needed
}
