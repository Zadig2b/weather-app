import { degToCompass, ctoF } from "../services/converters";
import {
  getTime,
  getAMPM,
  getVisibility,
  getWindSpeed,
} from "../services/helpers";
import { MetricsCard } from "./MetricsCard";
import styles from "./MetricsBox.module.css";

export const MetricsBox = ({ weatherData, unitSystem }) => {
  // Ensure weatherData and currentWeather are defined
  if (
    !weatherData ||
    !weatherData.currentWeather ||
    !weatherData.currentWeatherUnits
  ) {
    return <div>Weather data not available</div>;
  }

  const { currentWeather, currentWeatherUnits } = weatherData;
  const { windspeed, winddirection, visibility, humidity } = currentWeather;

  return (
    <div className={styles.wrapper}>
      <MetricsCard
        title={"Humidity"}
        iconSrc={"/icons/humidity.png"}
        metric={humidity || "N/A"} // Adapter si l'humidité est disponible
        unit={"%"}
      />

      <MetricsCard
        title={"Wind speed"}
        iconSrc={"/icons/wind.png"}
        metric={getWindSpeed(unitSystem, windspeed)}
        unit={unitSystem === "metric" ? "m/s" : "m/h"}
      />
      <MetricsCard
        title={"Wind direction"}
        iconSrc={"/icons/compass.png"}
        metric={degToCompass(winddirection)}
      />
      <MetricsCard
        title={"Visibility"}
        iconSrc={"/icons/binocular.png"}
        metric={getVisibility(unitSystem, visibility)}
        unit={unitSystem === "metric" ? "km" : "miles"}
      />
      <MetricsCard
        title={"Sunrise"}
        iconSrc={"/icons/sunrise.png"}
        metric={getTime(
          unitSystem,
          current_weather.sunrise, // Supposer que sunrise est disponible sous current_weather
          timezone
        )}
        unit={getAMPM(unitSystem, current_weather.sunrise, timezone)}
      />
      <MetricsCard
        title={"Sunset"}
        iconSrc={"/icons/sunset.png"}
        metric={getTime(
          unitSystem,
          current_weather.sunset, // Supposer que sunset est disponible sous current_weather
          timezone
        )}
        unit={getAMPM(unitSystem, current_weather.sunset, timezone)}
      />
    </div>
  );
};
