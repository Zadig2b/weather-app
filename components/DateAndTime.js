import { getWeekDay, getTime, getAMPM } from "../services/helpers";
import styles from "./DateAndTime.module.css";

export const DateAndTime = ({ weatherData, unitSystem }) => {
  // Ensure weatherData is a valid WeatherObject instance
  if (
    !weatherData ||
    !weatherData.currentWeather ||
    !weatherData.currentWeather.time
  ) {
    return <div>Data not available</div>;
  }

  // Access the necessary data from the WeatherObject instance
  const time = weatherData.currentWeather.time;
  const timezone = weatherData.timezone;

  const localTime = new Date(time); // Convert the time string to a Date object

  return (
    <div className={styles.wrapper}>
      <h2>
        {`${getWeekDay(localTime)}, ${getTime(
          unitSystem,
          localTime,
          timezone
        )} ${getAMPM(unitSystem, localTime, timezone)}`}
      </h2>
    </div>
  );
};
