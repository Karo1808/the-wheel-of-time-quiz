import styles from "../styles/adminAddQuizPage.module.css";

import AdminAddQuizHeader from "../components/admin/AdminAddQuizHeader";
import AdminAddQuizForm from "../components/admin/AdminAddQuizForm";

const AdminAddQuizPage = () => {
  return (
    <div className={styles.page}>
      <AdminAddQuizHeader />
      <main className={styles.main}>
        <AdminAddQuizForm />
      </main>
    </div>
  );
};

export default AdminAddQuizPage;
