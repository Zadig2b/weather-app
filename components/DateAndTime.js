import { getWeekDay, getTime, getAMPM } from "../services/helpers";
import styles from "./DateAndTime.module.css";

export const DateAndTime = ({ weatherData, unitSystem }) => {
  if (!weatherData || !weatherData.time) {
    return <div>Data not available</div>;
  }

  const { time } = weatherData;
  const localTime = new Date(time); // Convertir le temps en objet Date

  return (
    <div className={styles.wrapper}>
      <h2>
        {`${getWeekDay(localTime)}, ${getTime(
          unitSystem,
          localTime,
          weatherData.timezone
        )} ${getAMPM(unitSystem, localTime, weatherData.timezone)}`}
      </h2>
    </div>
  );
};
