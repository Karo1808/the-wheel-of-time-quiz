import { forwardRef } from "react";
import styles from "../styles/dialog.module.css";
import { IoIosClose } from "react-icons/io";

interface Props {
  children: React.ReactNode;
  toggleDialog: () => void;
}

const Dialog = forwardRef<HTMLDialogElement, Props>(
  ({ children, toggleDialog }, ref) => {
    const handleDialogOpen = (e: React.MouseEvent) => {
      if (e.currentTarget === e.target) {
        toggleDialog();
      }
    };

    return (
      <dialog ref={ref} onClick={handleDialogOpen} className={styles.dialog}>
        {children}
        <button className={styles.button} onClick={toggleDialog}>
          <IoIosClose className={styles.icon} />
        </button>
      </dialog>
    );
  }
);

export default Dialog;
