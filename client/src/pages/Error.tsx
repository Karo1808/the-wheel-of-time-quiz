import Button from "../components/Button";
import styles from "../styles/Error.module.css";
import { useNavigate } from "react-router-dom";

interface Props {
  error: Error;
  resetErrorBoundary: () => void;
}

const Error = ({ error, resetErrorBoundary }: Props) => {
  const navigate = useNavigate();

  const handleHomepage = () => {
    navigate("/");
    resetErrorBoundary();
  };
  return (
    <div className={styles.container}>
      <p className={styles.title}>Something went wrong</p>
      <p className={styles.message}>{error.message}</p>
      <div className={styles.buttons}>
        <Button
          state="error"
          onClick={resetErrorBoundary}
          className={styles.button}
        >
          Try Again
        </Button>
        <Button
          onClick={handleHomepage}
          state="not_found"
          className={styles.button}
        >
          Go to Homepage
        </Button>
      </div>
    </div>
  );
};

export default Error;
