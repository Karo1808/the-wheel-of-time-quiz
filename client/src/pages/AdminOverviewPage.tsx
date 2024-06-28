import AdminCardList from "../components/admin/AdminCardList";
import AdminOverviewHeader from "../components/admin/AdminOverviewHeader";
import styles from "../styles/adminOverviewPage.module.css";
import { Outlet } from "react-router";

const AdminOverviewPage = () => {
  return (
    <div className={styles.page}>
      <AdminOverviewHeader />
      <main className={styles.main}>
        <AdminCardList />
        <Outlet />
      </main>
    </div>
  );
};

export default AdminOverviewPage;
