// models/WeatherModel.js
export class WeatherObject {
  constructor({
    latitude,
    longitude,
    generationtime_ms,
    utc_offset_seconds,
    timezone,
    timezone_abbreviation,
    elevation,
    current_weather_units,
    current_weather,
  }) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.generationTimeMs = generationtime_ms;
    this.utcOffsetSeconds = utc_offset_seconds;
    this.timezone = timezone;
    this.timezoneAbbreviation = timezone_abbreviation;
    this.elevation = elevation;
    this.currentWeatherUnits = current_weather_units;
    this.currentWeather = current_weather;
  }

  // Example methods to access formatted data
  getFormattedTemperature() {
    return `${this.currentWeather.temperature} ${this.currentWeatherUnits.temperature}`;
  }

  getFormattedWindSpeed() {
    return `${this.currentWeather.windspeed} ${this.currentWeatherUnits.windspeed}`;
  }

  getFormattedTime() {
    return this.currentWeather.time;
  }

  // Add more methods as needed for other properties
}
