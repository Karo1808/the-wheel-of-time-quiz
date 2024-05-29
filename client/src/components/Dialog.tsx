// src/components/Dialog.js
import { forwardRef } from "react";
import styles from "../styles/dialog.module.css";
import { IoIosClose } from "react-icons/io";

interface Props {
  children: React.ReactNode;
  toggleDialog: () => void;
  isOverlayOpen: boolean;
}

const Dialog = forwardRef<HTMLDialogElement, Props>(
  ({ children, toggleDialog, isOverlayOpen }, ref) => {
    const handleDialogOpen = (e: React.MouseEvent) => {
      if (e.currentTarget === e.target) {
        toggleDialog();
      }
    };

    return (
      <>
        <div
          className={`${styles.overlay} ${
            isOverlayOpen ? styles.overlayOpen : ""
          }`}
        />
        <dialog
          ref={ref}
          onClick={handleDialogOpen}
          className={`${styles.dialog} ${
            isOverlayOpen ? styles.dialogOpen : ""
          }`}
        >
          <button className={styles.button} onClick={toggleDialog}>
            <IoIosClose className={styles.icon} />
          </button>
          {children}
        </dialog>
      </>
    );
  }
);

export default Dialog;
