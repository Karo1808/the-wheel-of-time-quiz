import { useRef, useState, useEffect } from "react";
import styles from "../../styles/adminAddQuizQuestions.module.css";
import { AiOutlinePlus } from "react-icons/ai";
import Accordion from "../Accordion";
import useAccordionControls from "../../hooks/useAccordionControls";
import Input from "../Input";
import TextArea from "../TextArea";
import Dialog from "../Dialog";
import AdminDeleteConfirm from "./AdminDeleteConfirm";
import useDialogControls from "../../hooks/useDialogControls";
import { FaTrashCan } from "react-icons/fa6";

const AdminAddQuizQuestions = () => {
  const [questions, setQuestions] = useState<string[]>([]);
  const ref = useRef<HTMLDialogElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const { isOverlayOpen, toggleDialog } = useDialogControls({ ref });

  const { openedIndex, setOpenedIndex, accordionRefs } =
    useAccordionControls(0);

  const handleAddQuestion = () => {
    setQuestions((prevQuestions) => [...prevQuestions, ""]);
    setOpenedIndex(questions.length);
  };

  useEffect(() => {
    if (questions.length === 0) return;
    setTimeout(() => {
      endRef.current.scrollIntoView({ behavior: "smooth" });
    }, 400);
  }, [questions]);

  const handleDeleteQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
    toggleDialog();
  };

  const handleDeleteButtonClick = () => {
    toggleDialog();
  };

  return (
    <div className={styles.wrapper}>
      {questions.map((_, i) => (
        <div key={i}>
          <Dialog
            toggleDialog={toggleDialog}
            ref={ref}
            isOverlayOpen={isOverlayOpen}
          >
            <AdminDeleteConfirm
              onCancel={toggleDialog}
              onDelete={() => handleDeleteQuestion(i)}
            />
          </Dialog>
          <Accordion
            Icon={
              <button
                className={styles.cta_button}
                onClick={handleDeleteButtonClick}
              >
                <FaTrashCan className={styles.accordion_icon} />
              </button>
            }
            openedIndex={openedIndex}
            setOpenedIndex={setOpenedIndex}
            ref={(element: HTMLDivElement) =>
              (accordionRefs.current[i] = element)
            }
            topContent={
              <p className={styles.accordion_title}>Question {i + 1}</p>
            }
            index={i}
            maxHeight={650}
          >
            <form>
              <TextArea label="Title" name="question" width="100%" rows={3} />
              {Array.from({ length: 4 }, (_, j) => j + 1).map((j) => (
                <Input
                  key={j}
                  label={`Answer ${j}`}
                  name={`answer${j}`}
                  width="100%"
                />
              ))}
            </form>
          </Accordion>
        </div>
      ))}
      <div ref={endRef} className={styles.add_question}>
        <button
          onClick={handleAddQuestion}
          className={styles.add_button}
          type="button"
        >
          <p>Add Question</p>
          <AiOutlinePlus className={styles.plus_icon} />
        </button>
      </div>
    </div>
  );
};

export default AdminAddQuizQuestions;
