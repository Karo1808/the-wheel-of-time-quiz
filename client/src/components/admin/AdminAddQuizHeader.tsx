import styles from "../../styles/adminAddQuizHeader.module.css";

const AdminAddQuizHeader = () => {
  return (
    <header className={styles.header}>
      <img className={styles.logo} src="/wheel.png" alt="wheel of time logo" />
      <span className={styles.logo_text}>The Wheel of Time Quiz</span>
    </header>
  );
};

export default AdminAddQuizHeader;
