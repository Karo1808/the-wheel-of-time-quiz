import styles from "../styles/adminAddQuizPage.module.css";

import AdminAddQuizHeader from "../components/admin/AdminAddQuizHeader";
import AdminAddQuizForm from "../components/admin/AdminAddQuizForm";

const AdminAddQuizPage = () => {
  return (
    <div className={styles.page}>
      <AdminAddQuizHeader />
      <AdminAddQuizForm />
    </div>
  );
};

export default AdminAddQuizPage;
