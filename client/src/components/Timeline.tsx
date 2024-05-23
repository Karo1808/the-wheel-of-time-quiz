import { IoIosCheckmarkCircle } from "react-icons/io";
import styles from "../styles/timeline.module.css";

const COLOR_CORRECT = "#3f704d";
const COLOR_WRONG = "#9d2933";

const Timeline = () => {
  return (
    <div className={styles.timeline}>
      <div className={styles.icon_container}>
        <IoIosCheckmarkCircle
          className={styles.icon}
          size={35}
          color={COLOR_CORRECT}
        />
        <IoIosCheckmarkCircle
          className={styles.icon}
          size={35}
          color={COLOR_CORRECT}
        />
        <IoIosCheckmarkCircle
          className={styles.icon}
          size={35}
          color={COLOR_CORRECT}
        />
        <IoIosCheckmarkCircle
          className={styles.icon}
          size={35}
          color={COLOR_CORRECT}
        />
        <IoIosCheckmarkCircle
          className={styles.icon}
          size={35}
          color={COLOR_CORRECT}
        />
        <IoIosCheckmarkCircle
          className={styles.icon}
          size={35}
          color={COLOR_CORRECT}
        />
        <IoIosCheckmarkCircle
          className={styles.icon}
          size={35}
          color={COLOR_CORRECT}
        />
        <IoIosCheckmarkCircle
          className={styles.icon}
          size={35}
          color={COLOR_CORRECT}
        />
      </div>
      <div className={styles.bar} />
    </div>
  );
};

export default Timeline;
