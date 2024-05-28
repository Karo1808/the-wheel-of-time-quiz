import { forwardRef } from "react";

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
      <dialog ref={ref} onClick={handleDialogOpen}>
        {children}
        <button onClick={toggleDialog}>Close</button>
      </dialog>
    );
  }
);

export default Dialog;
