import { useNavigate } from "react-router";
import styles from "../styles/welcome.module.css";
import Button from "../components/Button";

const WelcomePage = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Welcome to The Wheel of Time Quiz</h1>
        <img
          src="./wheel.png"
          alt="wheel of time logo"
          className={styles.logo}
        />
      </header>
      <main className={styles.grid}>
        <figure className={styles.feature}>
          <h4 className={styles.subtitle}>test your knowledge</h4>
          <p className={styles.feature_content}>
            Delve into Robert Jordan's epic fantasy and test your knowledge.
          </p>
        </figure>
        <figure className={styles.feature}>
          <h4 className={styles.subtitle}>choose your fate</h4>
          <p className={styles.feature_content}>
            Pick your difficulty level. Tailor your experience from beginner to
            expert.
          </p>
        </figure>
        <figure className={styles.feature}>
          <h4 className={styles.subtitle}>compete and make history</h4>
          <p className={styles.feature_content}>
            Battle for glory through challenges to claim the top spot!
          </p>
        </figure>
        <figure className={styles.feature}>
          <h4 className={styles.subtitle}>start your journey</h4>
          <Button
            className={styles.btn}
            state="next"
            onClick={() => navigate("/quiz")}
          >
            Continue
          </Button>
        </figure>
      </main>
    </div>
  );
};

export default WelcomePage;
