import styles from "../../styles/timeline.module.css";
import { IoIosCheckmarkCircle } from "react-icons/io";

const Timeline = () => {
  return (
    <div className={styles.container}>
      <div className={styles.bar}>
        <IoIosCheckmarkCircle size={40} color="green" className={styles.icon} />
        <IoIosCheckmarkCircle size={40} color="green" className={styles.icon} />
        <IoIosCheckmarkCircle size={40} color="green" className={styles.icon} />
        <IoIosCheckmarkCircle size={40} color="green" className={styles.icon} />
        <IoIosCheckmarkCircle size={40} color="green" className={styles.icon} />
        <IoIosCheckmarkCircle size={40} color="green" className={styles.icon} />
        <IoIosCheckmarkCircle size={40} color="green" className={styles.icon} />
        <IoIosCheckmarkCircle size={40} color="green" className={styles.icon} />
        <IoIosCheckmarkCircle size={40} color="green" className={styles.icon} />
      </div>
    </div>
  );
};

export default Timeline;
