import { Outlet } from "react-router";
import styles from "../../styles/layout.module.css";

const Layout = () => {
  return (
    <main className={styles.page}>
      <Outlet />
    </main>
  );
};

export default Layout;
