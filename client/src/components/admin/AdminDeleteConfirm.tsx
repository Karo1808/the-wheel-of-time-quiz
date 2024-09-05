import styles from "../../styles/adminDeleteConfirm.module.css";
import Button from "../Button";

interface Props {
  onCancel: () => void;
  onDelete: () => void;
  title: string;
  Icon: React.ReactNode;
  description: string;
  action: string;
}

const AdminDeleteConfirm = ({
  onCancel,
  onDelete,
  Icon,
  title,
  description,
  action,
}: Props) => {
  return (
    <div className={styles.container}>
      {Icon}
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>
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
          {action}
        </Button>
      </div>
    </div>
  );
};

export default AdminDeleteConfirm;
