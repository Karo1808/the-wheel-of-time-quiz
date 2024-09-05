import { MdError } from "react-icons/md";
import styles from "../styles/formError.module.css";

interface FormErrorProps {
  errorMessage: React.ReactNode;
  style?: React.CSSProperties;
}

const FormError = ({ errorMessage, style }: FormErrorProps) => {
  return (
    errorMessage && (
      <p style={style} className={styles.error}>
        <MdError />
        {errorMessage}
      </p>
    )
  );
};

export default FormError;
