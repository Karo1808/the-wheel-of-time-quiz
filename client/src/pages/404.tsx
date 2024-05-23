import { useNavigate } from "react-router";
import Button from "../components/Button";
import styles from "../styles/404.module.css";

const Page404 = () => {
  const navigate = useNavigate();
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <h3 className={styles.subtitle}>
        The page you are looking for does not exist
      </h3>
      <Button
        onClick={() => navigate("/")}
        className={styles.button}
        state="not_found"
      >
        Back to Homepage
      </Button>
    </main>
  );
};

export default Page404;
