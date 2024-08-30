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
  // Ensure weatherData is valid
  if (!weatherData || !weatherData.current) {
    return <div>Weather data not available</div>;
  }

  // Access the necessary data from the weatherData object
  const { temperature_2m: temperature, weather_code: weatherCode } =
    weatherData.current;

  const iconSrc = `/icons/${iconName}.svg`;

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.location}>
        {city || "Location"}, {country || "Country"}
      </h1>
      <Image width={300} height={300} src={iconSrc} alt="weather icon" />
      <h1 className={styles.temperature}>
        {unitSystem === "metric"
          ? Math.round(temperature)
          : Math.round(ctoF(temperature))}
        °{unitSystem === "metric" ? "C" : "F"}
      </h1>
    </div>
  );
};
