import { tailspin } from "ldrs";
import styles from "../../styles/loading.module.css";

tailspin.register();

const Loading = () => {
  return (
    <main className={styles.container}>
      <l-tailspin size={100} color="#593b28" />
    </main>
  );
};

export default Loading;
