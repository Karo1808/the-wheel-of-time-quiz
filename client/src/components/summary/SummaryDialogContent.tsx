import styles from "../../styles/summaryDialogContent.module.css";
import SummaryAccordion from "./SummaryAccordion";
import { useShallow } from "zustand/react/shallow";
import useQuizStore from "../../hooks/useQuizStore";
import useRandomQuestionsQuery from "../../hooks/queries/useRandomQuestionsQuery.ts";
import useAccordionControls from "../../hooks/useAccordionControls";
import { IoMdCheckmarkCircle, IoMdCloseCircle } from "react-icons/io";

interface Props {
  index?: number;
}

const COLOR_CORRECT = "#3f704d";
const COLOR_WRONG = "#9d2933";

const SummaryDialogContent = ({ index }: Props) => {
  const { quiz } = useRandomQuestionsQuery();

  const { openedIndex, setOpenedIndex, accordionRefs } =
    useAccordionControls(index);

  const currentQuizId = useQuizStore(
    useShallow((state) => state.currentQuizId)
  );
  const currentQuiz = useQuizStore(
    useShallow((state) => state.quizzes[currentQuizId])
  );

  return (
    <div className={styles.container}>
      {quiz.quizData.questions.map((question, index) => (
        <SummaryAccordion
          Icon={
            currentQuiz.questions[index].isAnswerCorrect ? (
              <IoMdCheckmarkCircle
                className={styles.icon}
                color={COLOR_CORRECT}
              />
            ) : (
              <IoMdCloseCircle className={styles.icon} color={COLOR_WRONG} />
            )
          }
          question={question.questionLabel}
          questionNumber={index + 1}
          setOpenedIndex={setOpenedIndex}
          openedIndex={openedIndex}
          userAnswer={currentQuiz.questions[index].answer || ""}
          correctAnswer={currentQuiz.questions[index].correctAnswer || ""}
          key={index}
          ref={(element: HTMLDivElement) =>
            (accordionRefs.current[index] = element)
          }
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
