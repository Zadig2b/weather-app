import Image from "next/image";
import { ctoF } from "../services/converters";
import styles from "./MainCard.module.css";

export const MainCard = ({
  city,
  country,
  iconName,
  unitSystem,
  weatherData,
}) => {
  // Ensure weatherData is a valid WeatherObject instance
  if (!weatherData || !weatherData.currentWeather) {
    return <div>Weather data not available</div>;
  }

  // Accédez aux données nécessaires depuis l'instance WeatherObject
  const temperature = weatherData.currentWeather.temperature;
  const weatherCode = weatherData.currentWeather.weathercode;
  const iconSrc = `/icons/${iconName}.svg`;

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.location}>
        {city || "Location"}, {country || "Country"}
      </h1>
      <Image width={300} height={300} src={iconSrc} alt="weatherIcon" />
      <h1 className={styles.temperature}>
        {unitSystem === "metric"
          ? Math.round(temperature)
          : Math.round(ctoF(temperature))}
        °{unitSystem === "metric" ? "C" : "F"}
      </h1>
    </div>
  );
};
