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
  visibility,
  latitude,
  longitude,
  elevation,
}) => {
  if (
    temperature === undefined ||
    apparentTemperature === undefined ||
    humidity === undefined ||
    windSpeed === undefined ||
    windDirection === undefined ||
    sunrise === undefined ||
    sunset === undefined
  ) {
    return <div>Données météo non disponibles</div>;
  }

  return (
    <div className={styles.wrapper}>
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
        unit={unitSystem === "metric" ? units.wind_speed_10m : "mph"}
      />
      <MetricsCard
        title="Wind Direction"
        iconSrc="/icons/compass.png"
        metric={degToCompass(windDirection)}
      />
      <MetricsCard
        title="Visibility"
        iconSrc="/icons/binocular.png"
        metric={getVisibility(unitSystem, visibility)}
        unit={unitSystem === "metric" ? "km" : "miles"}
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
