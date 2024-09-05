import useAccordionControls from "../../hooks/useAccordionControls";
import useQuestionsQuery from "../../hooks/queries/useQuestionQuery.ts";
import styles from "../../styles/adminOverviewDetails.module.css";
import SummaryAccordion from "../summary/SummaryAccordionContent.tsx";
import { AiFillQuestionCircle } from "react-icons/ai";
import Accordion from "../Accordion.tsx";
import accordionStyles from "../../styles/accordion.module.css";

const AdminOverviewDetails = () => {
  const { quiz } = useQuestionsQuery();
  const { openedIndex, setOpenedIndex, accordionRefs } =
    useAccordionControls(0);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {quiz.questions.map((question, index) => (
          <Accordion
            setOpenedIndex={setOpenedIndex}
            Icon={<AiFillQuestionCircle className={styles.icon} />}
            openedIndex={openedIndex}
            key={index}
            ref={(element: HTMLDivElement) =>
              (accordionRefs.current[index] = element)
            }
            index={index}
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
            <SummaryAccordion
              correctAnswer={question.questionAnswer}
              key={index}
              index={index}
              answers={question.answers
                .filter((answer) => answer.answerLabel)
                .map((answer) => answer.answerLabel)}
            />
          </Accordion>
        ))}
        ;
      </div>
    </div>
  );
};

export default AdminOverviewDetails;
