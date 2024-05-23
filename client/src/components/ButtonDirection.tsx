import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import styles from "../styles/buttonDirection.module.css";

interface Props {
  direction: "left" | "right";
  onClick?: () => void;
  disabled?: boolean;
}

const ButtonDirection = ({ direction, onClick, disabled }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.button} ${styles[direction]} ${
        disabled && styles.disabled
      }`}
      disabled={disabled}
    >
      {direction === "left" ? <FaChevronLeft /> : <FaChevronRight />}
    </button>
  );
};

export default ButtonDirection;
