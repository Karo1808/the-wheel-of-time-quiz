import { useEffect, useState } from "react";
import styles from "../styles/summaryDialogContent.module.css";
import SummaryAccordion from "./SummaryAccordion";
import useQuizQuery from "../hooks/useQuizQuery";
import { useShallow } from "zustand/react/shallow";
import useQuizStore from "../hooks/useQuizStore";

interface Props {
  index?: number;
}

const SummaryDialogContent = ({ index }: Props) => {
  const [openedIndex, setOpenedIndex] = useState<number | undefined>();
  const { quiz } = useQuizQuery();

  const currentQuizId = useQuizStore(
    useShallow((state) => state.currentQuizId)
  );
  const currentQuiz = useQuizStore(
    useShallow((state) => state.quizzes[currentQuizId])
  );

  useEffect(() => {
    setOpenedIndex(index);
  }, [index]);

  return (
    <div className={styles.container}>
      {quiz.quizData.questions.map((question, index) => (
        <SummaryAccordion
          isCorrect={currentQuiz.questions[index].isAnswerCorrect}
          question={question.questionLabel}
          questionNumber={index + 1}
          setOpenedIndex={setOpenedIndex}
          openedIndex={openedIndex}
          userAnswer={currentQuiz.questions[index].answer || ""}
          correctAnswer={currentQuiz.questions[index].correctAnswer || ""}
          key={index}
          index={index}
          answers={question.answers
            .filter((answer) => answer.answerLabel)
            .map((answer) => answer.answerLabel)}
        />
      ))}
    </div>
  );
};

export default SummaryDialogContent;
