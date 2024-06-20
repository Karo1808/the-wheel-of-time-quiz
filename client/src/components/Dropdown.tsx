import styles from "../styles/dropdown.module.css";
import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  className?: string;
  open: () => void;
  close: () => void;
}

const Dropdown = ({ children, className, open, close }: Props) => {
  return (
    <div
      className={`${styles.wrapper} ${className}`}
      onMouseEnter={open}
      onMouseLeave={close}
    >
      <motion.div
        className={styles.dropdown}
        initial={{
          y: 10,
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          y: 0,
        }}
        transition={{ ease: "linear", duration: 0.2 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Dropdown;
