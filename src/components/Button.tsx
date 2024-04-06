import styles from "../../styles/button.module.css";

interface Props {
  text: string;
  state: "correct" | "incorrect" | "none" | "disabled" | "next";
  className?: string;
  onClick?: () => void;
}

const Button = ({ text, state, className, onClick }: Props) => {
  return (
    <button className={`${styles[state]} ${styles.button} ${className}`}>
      {text}
    </button>
  );
};

export default Button;
