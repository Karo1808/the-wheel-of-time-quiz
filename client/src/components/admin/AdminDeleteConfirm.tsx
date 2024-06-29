import styles from "../../styles/adminDeleteConfirm.module.css";
import { FaTrashCan } from "react-icons/fa6";
import Button from "../Button";

const GRAY_COLOR = "#867d77";

interface Props {
  onCancel: () => void;
  onDelete: () => void;
}

const AdminDeleteConfirm = ({ onCancel, onDelete }: Props) => {
  return (
    <div className={styles.container}>
      <FaTrashCan size={50} color={GRAY_COLOR} />
      <h1 className={styles.title}>
        Are you sure you want to delete this quiz?
      </h1>
      <p className={styles.description}>This action cannot be undone</p>
      <div className={styles.cta}>
        <Button className={styles.cta_button} state="none" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          className={styles.cta_button}
          state="incorrect"
          disabled={false}
          onClick={onDelete}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default AdminDeleteConfirm;
