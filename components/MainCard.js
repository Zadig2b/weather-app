import Image from "next/image";
import { ctoF } from "../services/converters";
import styles from "./MainCard.module.css";

export const MainCard = ({
  city,
  country,
  iconName,
  unitSystem,
  weatherData,
  temperature,
  feelsLike,
}) => {
  if (!weatherData || !weatherData.current) {
    return <div>Weather data not available</div>;
  }

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
      <p>
        Température ressentie{" "}
        {unitSystem === "metric"
          ? Math.round(feelsLike)
          : Math.round(ctoF(feelsLike))}
        °{unitSystem === "metric" ? "C" : "F"}
      </p>
    </div>
  );
};
