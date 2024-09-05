import Button from "../Button";
import styles from "../../styles/adminCardCta.module.css";
import Dialog from "../Dialog";
import useDialogControls from "../../hooks/useDialogControls";
import { useRef } from "react";
import AdminDeleteConfirm from "./AdminDeleteConfirm";
import useDeleteQuizQuery from "../../hooks/queries/useDeleteQuizQuery";
import { FaTrashCan } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router";

const GRAY_COLOR = "#867d77";

const AdminCardCta = () => {
  const ref = useRef<HTMLDialogElement>(null);
  const { isOverlayOpen, toggleDialog } = useDialogControls({ ref });
  const { mutate, status } = useDeleteQuizQuery();
  const navigate = useNavigate();
  const { quizId } = useParams<{ quizId: string }>();

  const handleDeleteButtonClick = () => {
    toggleDialog();
  };

  const handleDeleteQuiz = () => {
    mutate();
    status === "success" || (status === "error" && toggleDialog());
  };

  const handleEditButtonClick = () => {
    navigate(`/admin/edit-quiz/${quizId}`);
  };

  return (
    <>
      <Button
        className={styles.cta_button}
        state="none"
        onClick={handleEditButtonClick}
      >
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
          Icon={<FaTrashCan size={50} color={GRAY_COLOR} />}
          title="Are you sure you want to delete this quiz?"
          description="This action cannot be undone"
          action="Delete"
        />
      </Dialog>
    </>
  );
};

export default AdminCardCta;
