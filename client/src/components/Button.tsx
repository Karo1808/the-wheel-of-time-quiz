import styles from "../styles/button.module.css";

interface Props {
  children: React.ReactNode;
  state:
    | "correct"
    | "incorrect"
    | "none"
    | "disabled"
    | "next"
    | "disabled"
    | "invisible"
    | "not_found"
    | "error";
  className?: string;
  onClick?: () => void;
}

const Button = ({ children, state, className, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`${styles[state]} ${styles.button} ${className}`}
      disabled={
        state === "disabled" || state === "correct" || state === "incorrect"
      }
    >
      {children}
    </button>
  );
};

export default Button;
