import { useState } from "react";
import styles from "../styles/test.module.css";
import Drawer from "../components/Drawer";
import SummaryDialogContent from "../components/summary/SummaryDialogContent";

const Test = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={() => setOpen(true)}>
        {" "}
        Open Drawer{" "}
      </button>
      <Drawer open={open} setOpen={setOpen}>
        {<SummaryDialogContent />}
      </Drawer>
    </div>
  );
};

export default Test;
