import { UseFormReset } from "react-hook-form";
import styles from "../../styles/adminAddQuizHeader.module.css";
import Button from "../Button";
import { MouseEventHandler, useRef } from "react";
import { CreateQuizSchema } from "../../schemas";
import AdminDeleteConfirm from "./AdminDeleteConfirm";
import Dialog from "../Dialog";
import useDialogControls from "../../hooks/useDialogControls";
import { VscDebugRestart } from "react-icons/vsc";
import { useShallow } from "zustand/react/shallow";
import useCreateQuizStore from "../../hooks/useCreateQuizStore";

interface AdminAddQuizHeaderProps
  extends React.ComponentPropsWithoutRef<"header"> {
  onSubmit: MouseEventHandler<HTMLButtonElement>;
  reset: UseFormReset<CreateQuizSchema>;
}

const GRAY_COLOR = "#867d77";

const AdminAddQuizHeader = ({ onSubmit, reset }: AdminAddQuizHeaderProps) => {
  const ref = useRef<HTMLDialogElement>(null);
  const { isOverlayOpen, toggleDialog } = useDialogControls({ ref });
  const { resetStore } = useCreateQuizStore(useShallow((state) => state));

  const handleReset = () => {
    resetStore();
    reset();
    toggleDialog();
  };
  return (
    <>
      <Dialog
        toggleDialog={toggleDialog}
        ref={ref}
        isOverlayOpen={isOverlayOpen}
      >
        <AdminDeleteConfirm
          onCancel={toggleDialog}
          onDelete={handleReset}
          title="Are you sure you want to reset the form?"
          Icon={<VscDebugRestart color={GRAY_COLOR} size={50} />}
          description="This action cannot be undone"
          action="Reset"
        />
      </Dialog>
      <header className={styles.header}>
        <div className={styles.left}>
          <img
            className={styles.logo}
            src="/wheel.png"
            alt="wheel of time logo"
          />
          <span className={styles.logo_text}>The Wheel of Time Quiz</span>
        </div>
        <div className={styles.right}>
          <Button
            id="hook-form"
            state="next"
            className={`${styles.cta_button} ${styles.reset_button}`}
            type="submit"
            onClick={toggleDialog}
          >
            Reset Form
          </Button>
          <Button
            id="hook-form"
            state="next"
            className={`${styles.submit_button} ${styles.cta_button}`}
            type="submit"
            onClick={onSubmit}
          >
            Create Quiz
          </Button>
        </div>
      </header>
    </>
  );
};

export default AdminAddQuizHeader;
