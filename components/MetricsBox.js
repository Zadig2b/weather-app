import { degToCompass, ctoF } from "../services/converters";
import {
  getTime,
  getAMPM,
  getVisibility,
  getWindSpeed,
} from "../services/helpers";
import { MetricsCard } from "./MetricsCard";
import styles from "./MetricsBox.module.css";

export const MetricsBox = ({
  temperature,
  apparentTemperature,
  humidity,
  windSpeed,
  windDirection,
  sunrise,
  sunset,
  unitSystem,
  units,
  latitude,
  longitude,
  elevation,
}) => {
  // Render a fallback if required data is missing
  if (
    temperature === undefined ||
    apparentTemperature === undefined ||
    humidity === undefined ||
    windSpeed === undefined ||
    windDirection === undefined ||
    sunrise === undefined ||
    sunset === undefined
  ) {
    return <div>Weather data not available</div>;
  }

  return (
    <div className={styles.wrapper}>
      {/* <MetricsCard
        title="Temperature"
        iconSrc="/icons/temperature.png"
        metric={
          unitSystem === "metric"
            ? Math.round(temperature)
            : Math.round(ctoF(temperature))
        }
        unit={unitSystem === "metric" ? units.temperature_2m : "°F"}
      />
      <MetricsCard
        title="Apparent Temperature"
        iconSrc="/icons/temperature.png"
        metric={
          unitSystem === "metric"
            ? Math.round(apparentTemperature)
            : Math.round(ctoF(apparentTemperature))
        }
        unit={unitSystem === "metric" ? units.apparent_temperature : "°F"}
      /> */}
      <MetricsCard
        title="Humidity"
        iconSrc="/icons/humidity.png"
        metric={humidity || "N/A"}
        unit="%"
      />
      <MetricsCard
        title="Wind Speed"
        iconSrc="/icons/wind.png"
        metric={getWindSpeed(unitSystem, windSpeed)}
        unit={unitSystem === "metric" ? units.wind_speed_10m : "m/h"}
      />
      <MetricsCard
        title="Wind Direction"
        iconSrc="/icons/compass.png"
        metric={degToCompass(windDirection)}
      />
      <MetricsCard
        title="Sunrise"
        iconSrc="/icons/sunrise.png"
        metric={getTime(unitSystem, sunrise)}
        unit={getAMPM(unitSystem, sunrise)}
      />
      <MetricsCard
        title="Sunset"
        iconSrc="/icons/sunset.png"
        metric={getTime(unitSystem, sunset)}
        unit={getAMPM(unitSystem, sunset)}
      />
    </div>
  );
};
