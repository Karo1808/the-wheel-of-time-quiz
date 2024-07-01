import Button from "../Button";
import styles from "../../styles/adminCardCta.module.css";
import Dialog from "../Dialog";
import useDialogControls from "../../hooks/useDialogControls";
import { useRef } from "react";
import AdminDeleteConfirm from "./AdminDeleteConfirm";
import useDeleteQuizQuery from "../../hooks/queries/useDeleteQuizQuery";

const AdminCardCta = () => {
  const ref = useRef<HTMLDialogElement>(null);
  const { isOverlayOpen, toggleDialog } = useDialogControls({ ref });
  const { mutate, status } = useDeleteQuizQuery();

  const handleDeleteButtonClick = () => {
    toggleDialog();
  };

  const handleDeleteQuiz = () => {
    mutate();
    status === "success" || (status === "error" && toggleDialog());
  };

  return (
    <>
      <Button className={styles.cta_button} state="none">
        Edit
      </Button>
      <Button
        className={styles.cta_button}
        onClick={handleDeleteButtonClick}
        state="incorrect"
        disabled={false}
      >
        Delete
      </Button>
      <Dialog
        toggleDialog={toggleDialog}
        ref={ref}
        isOverlayOpen={isOverlayOpen}
      >
        <AdminDeleteConfirm
          onCancel={toggleDialog}
          onDelete={handleDeleteQuiz}
        />
      </Dialog>
    </>
  );
};

export default AdminCardCta;
