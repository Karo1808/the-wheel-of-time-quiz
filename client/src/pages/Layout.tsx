import { Outlet } from "react-router";
import styles from "../styles/layout.module.css";
import { motion } from "framer-motion";

const Layout = () => {
  return (
    <motion.main
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 0.5,
      }}
      className={styles.page}
    >
      <Outlet />
    </motion.main>
  );
};

export default Layout;
