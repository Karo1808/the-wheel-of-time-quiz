import { useRef, useState } from "react";
import Dialog from "../components/Dialog";

const DialogTest = () => {
  const [dialogContent, setDialogContent] = useState<React.ReactNode>(null);

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
          setDialogContent(<div>test</div>);
          toggleDialog();
        }}
      >
        Open
      </button>
      <Dialog toggleDialog={toggleDialog} ref={dialogRef}>
        {dialogContent}
      </Dialog>
    </div>
  );
};

export default DialogTest;
