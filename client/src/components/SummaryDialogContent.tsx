import { useState } from "react";
import styles from "../styles/summaryDialogContent.module.css";
import SummaryAccordion from "./SummaryAccordion";

const SummaryDialogContent = () => {
  const [openedIndex, setOpenedIndex] = useState<number | undefined>();
  const answers = [
    "Rand Al'Thor",
    "Matrim Cauthon",
    "Egwene al'Vere",
    "Perrin Ayabara",
  ];
  return (
    <div className={styles.container}>
      <SummaryAccordion
        isCorrect={false}
        questionNumber={1}
        question="Who is the Dragon Reborn"
        correctAnswer="Rand Al'Thor"
        index={0}
        openedIndex={openedIndex}
        setOpenedIndex={setOpenedIndex}
        answers={answers}
        userAnswer="Egwene al'Vere"
      />
      <SummaryAccordion
        isCorrect={true}
        questionNumber={1}
        question="Who is the Dragon Reborn"
        correctAnswer="Rand Al'Thor"
        index={1}
        openedIndex={openedIndex}
        setOpenedIndex={setOpenedIndex}
        answers={answers}
        userAnswer="Rand Al'Thor"
      />
    </div>
  );
};

export default SummaryDialogContent;
