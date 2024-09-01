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
    apparent_temperature,
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
    this.apparentTemperature = apparent_temperature;
  }

  getVisibility() {
    return this.hourly.visibility[0];
  }
}
