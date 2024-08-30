import { getWeekDay, getTime, getAMPM } from "../services/helpers";
import styles from "./DateAndTime.module.css";

export const DateAndTime = ({ time, timezone, unitSystem }) => {
  // Check if time and timezone are available
  if (!time || !timezone) {
    return <div>Data not available</div>;
  }

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
