import { getWeekDay, getTime, getAMPM } from "../services/helpers";
import styles from "./DateAndTime.module.css";

export const DateAndTime = ({ time, timezone, unitSystem }) => {
  // Check if time and timezone are available
  if (!time || !timezone) {
    return <div>Data not available</div>;
  }

  // Convert the time string to a Date object considering the timezone
  const localTime = new Date(time);
  console.log(time); // Original ISO string
  console.log(localTime); // Date object based on the ISO string
  console.log(timezone); // Timezone information

  return (
    <div className={styles.wrapper}>
      <h2>
        {`${getWeekDay(localTime, timezone)}, ${getTime(
          unitSystem,
          localTime,
          timezone
        )} ${getAMPM(unitSystem, localTime, timezone)}`}
      </h2>
    </div>
  );
};
