import Image from "next/image";
import { ctoF } from "../services/converters";
import styles from "./MainCard.module.css";

export const MainCard = ({
  city,
  country,
  description,
  iconName,
  unitSystem,
  weatherData,
}) => {
  if (!weatherData || !weatherData.current_weather) {
    return <div>Weather data not available</div>;
  }

  const { current_weather } = weatherData;
  const temperature = current_weather.temperature;
  const weatherCode = current_weather.weathercode;

  const iconSrc = `/icons/${iconName || weatherCode}.svg`;

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.location}>
        {city || "Location"}, {country || "Country"}
      </h1>
      <p className={styles.description}>{description || "No description"}</p>
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
