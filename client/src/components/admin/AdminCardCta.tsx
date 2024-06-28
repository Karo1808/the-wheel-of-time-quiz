import Button from "../Button";
import styles from "../../styles/adminCardCta.module.css";

const AdminCardCta = () => {
  return (
    <>
      <Button className={styles.cta_button} state="none">
        Edit
      </Button>
      <Button className={styles.cta_button} state="incorrect" disabled={false}>
        Delete
      </Button>
    </>
  );
};

export default AdminCardCta;
