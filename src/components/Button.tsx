import styles from "../../styles/button.module.css";

interface Props {
  text: string;
  state: "correct" | "incorrect" | "none" | "disabled" | "next" | "disabled";
  className?: string;
  onClick?: () => void;
}

const Button = ({ text, state, className, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`${styles[state]} ${styles.button} ${className}`}
      disabled={
        state === "disabled" || state === "correct" || state === "incorrect"
      }
    >
      {text}
    </button>
  );
};

export default Button;
