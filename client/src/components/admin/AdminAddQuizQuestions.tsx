import { useState } from "react";
import styles from "../../styles/adminAddQuizQuestions.module.css";
import SummaryAccordion from "../summary/SummaryAccordion";
import { AiFillQuestionCircle } from "react-icons/ai";

const AdminAddQuizQuestions = () => {
  const [numberOfQuestions, setNumberOfQuestions] = useState(0);
  return <div className={styles.wrapper}>
    {
        Array.from({ length: numberOfQuestions }, (_, i) => i + 1).map((i) => (
            <SummaryAccordion Icon={<AiFillQuestionCircle className={styles.accordion_icon} />} />
        )
    }
  </div>;
};

export default AdminAddQuizQuestions;
