import { useRef } from "react";
import Dialog from "../components/Dialog";
import SummaryDialogContent from "../components/SummaryDialogContent";

const DialogTest = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const toggleDialog = () => {
    if (!dialogRef.current) return;
    dialogRef.current.hasAttribute("open")
      ? dialogRef.current.close()
      : dialogRef.current.showModal();
  };
  return (
    <div>
      <button
        onClick={() => {
          toggleDialog();
        }}
      >
        Open
      </button>
      <Dialog toggleDialog={toggleDialog} ref={dialogRef}>
        {<SummaryDialogContent />}
      </Dialog>
    </div>
  );
};

export default DialogTest;
