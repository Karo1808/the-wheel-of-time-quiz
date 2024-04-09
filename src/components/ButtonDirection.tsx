import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import styles from "../../styles/buttonDirection.module.css";

interface Props {
  direction: "left" | "right";
  onClick?: () => void;
}

const ButtonDirection = ({ direction, onClick }: Props) => {
  return (
    <button className={`${styles.button} ${styles[direction]}`}>
      {direction === "left" ? <FaChevronLeft /> : <FaChevronRight />}
    </button>
  );
};

export default ButtonDirection;
