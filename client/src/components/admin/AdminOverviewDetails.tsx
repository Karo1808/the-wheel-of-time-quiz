import useAccordionControls from "../../hooks/useAccordionControls";
import useQuestionsQuery from "../../hooks/queries/useQuestionQuery.ts";
import styles from "../../styles/adminOverviewDetails.module.css";
import SummaryAccordion from "../summary/SummaryAccordion";
import { AiFillQuestionCircle } from "react-icons/ai";

const AdminOverviewDetails = () => {
  const { quiz } = useQuestionsQuery();
  const { openedIndex, setOpenedIndex, accordionRefs } =
    useAccordionControls(0);

  return (
    <div className={styles.container}>
      {quiz.questions.map((question, index) => (
        <SummaryAccordion
          Icon={<AiFillQuestionCircle className={styles.icon} />}
          question={question.questionLabel}
          questionNumber={index + 1}
          setOpenedIndex={setOpenedIndex}
          openedIndex={openedIndex}
          correctAnswer={question.questionAnswer}
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
      ;
    </div>
  );
};

export default AdminOverviewDetails;
