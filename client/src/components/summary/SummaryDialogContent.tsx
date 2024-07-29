import styles from "../../styles/summaryDialogContent.module.css";
import accordionStyles from "../../styles/accordion.module.css";
import { useShallow } from "zustand/react/shallow";
import useQuizStore from "../../hooks/useQuizStore";
import useRandomQuestionsQuery from "../../hooks/queries/useRandomQuestionsQuery.ts";
import useAccordionControls from "../../hooks/useAccordionControls";
import { IoMdCheckmarkCircle, IoMdCloseCircle } from "react-icons/io";
import Accordion from "../Accordion.tsx";
import SummaryAccordionContent from "./SummaryAccordionContent.tsx";

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
        <Accordion
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
          index={index}
          openedIndex={openedIndex}
          key={index}
          setOpenedIndex={setOpenedIndex}
          ref={(element: HTMLDivElement) =>
            (accordionRefs.current[index] = element)
          }
          topContent={
            <>
              <p className={accordionStyles.question_number}>
                Question {index + 1}
              </p>
              <p className={accordionStyles.question}>
                {question.questionLabel}
              </p>
            </>
          }
        >
          <SummaryAccordionContent
            index={index}
            openedIndex={openedIndex}
            userAnswer={currentQuiz.questions[index].answer || ""}
            correctAnswer={currentQuiz.questions[index].correctAnswer || ""}
            answers={question.answers
              .filter((answer) => answer.answerLabel)
              .map((answer) => answer.answerLabel)}
          />
        </Accordion>
      ))}
    </div>
  );
};

export default SummaryDialogContent;
