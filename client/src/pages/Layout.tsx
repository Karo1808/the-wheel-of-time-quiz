import { Outlet } from "react-router";
import styles from "../styles/layout.module.css";
import { motion } from "framer-motion";

interface Props {
  wide?: boolean;
}

const Layout = ({ wide = false }: Props) => {
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
      className={`${styles.page} ${wide && styles.wide}`}
    >
      <Outlet />
    </motion.main>
  );
};

export default Layout;
