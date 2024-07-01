import styles from "../styles/adminAddQuizPage.module.css";

import AdminAddQuizHeader from "../components/admin/AdminAddQuizHeader";
import AdminAddQuizForm from "../components/admin/AdminAddQuizForm";
import AdminAddQuizQuestions from "../components/admin/AdminAddQuizQuestions";

const AdminAddQuizPage = () => {
  return (
    <div className={styles.page}>
      <AdminAddQuizHeader />
      <main className={styles.main}>
        <section>
          <AdminAddQuizForm />
        </section>
        <section>
          <AdminAddQuizQuestions />
        </section>
      </main>
    </div>
  );
};

export default AdminAddQuizPage;
