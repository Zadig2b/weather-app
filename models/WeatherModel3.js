export class WeatherObject {
  constructor(data) {
    this.latitude = data.latitude;
    this.longitude = data.longitude;
    this.generationTimeMs = data.generationtime_ms;
    this.utcOffsetSeconds = data.utc_offset_seconds;
    this.timezone = data.timezone;
    this.timezoneAbbreviation = data.timezone_abbreviation;
    this.elevation = data.elevation;

    this.currentUnits = {
      time: data.current_units.time,
      interval: data.current_units.interval,
      temperature2m: data.current_units.temperature_2m,
      relativeHumidity2m: data.current_units.relative_humidity_2m,
      apparentTemperature: data.current_units.apparent_temperature,
      isDay: data.current_units.is_day,
      weatherCode: data.current_units.weather_code,
      windSpeed10m: data.current_units.wind_speed_10m,
      windDirection10m: data.current_units.wind_direction_10m,
    };

    this.current = {
      time: data.current.time,
      interval: data.current.interval,
      temperature2m: data.current.temperature_2m,
      relativeHumidity2m: data.current.relative_humidity_2m,
      apparentTemperature: data.current.apparent_temperature,
      isDay: data.current.is_day,
      weatherCode: data.current.weather_code,
      windSpeed10m: data.current.wind_speed_10m,
      windDirection10m: data.current.wind_direction_10m,
    };

    this.hourlyUnits = {
      time: data.hourly_units.time,
      visibility: data.hourly_units.visibility,
    };

    this.hourly = {
      time: data.hourly.time,
      visibility: data.hourly.visibility,
    };

    this.dailyUnits = {
      time: data.daily_units.time,
      sunrise: data.daily_units.sunrise,
      sunset: data.daily_units.sunset,
    };

    this.daily = {
      time: data.daily.time,
      sunrise: data.daily.sunrise,
      sunset: data.daily.sunset,
    };
  }

  // méthode pour obtenir la visibilité actuelle
  getVisibility() {
    return this.hourly.visibility[0];
  }
}
