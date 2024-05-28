import { useState } from "react";
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
    <div>
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
    </div>
  );
};

export default SummaryDialogContent;
