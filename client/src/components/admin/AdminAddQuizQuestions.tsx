import { useRef, useEffect } from "react";
import styles from "../../styles/adminAddQuizQuestions.module.css";
import { AiOutlinePlus } from "react-icons/ai";
import Accordion from "../Accordion";
import useAccordionControls from "../../hooks/useAccordionControls";
import TextArea from "../TextArea";
import Dialog from "../Dialog";
import AdminDeleteConfirm from "./AdminDeleteConfirm";
import useDialogControls from "../../hooks/useDialogControls";
import { FaTrashCan } from "react-icons/fa6";
import { CreateQuizSchema, QuestionsSchema } from "../../schemas";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import Input from "../Input";
import { IoMdCheckmarkCircle } from "react-icons/io";

interface AdminAddQuizQuestionsProps {
  questions: QuestionsSchema["questions"];
  onChange?: (questions: QuestionsSchema["questions"]) => void;
}

const AdminAddQuizQuestions = ({
  questions,
  onChange,
}: AdminAddQuizQuestionsProps) => {
  const { trigger, control, watch, formState } =
    useFormContext<CreateQuizSchema>(); // Access form context
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "questions", // Field name in the form state
  });

  const watchQuestions = watch("questions");

  const ref = useRef<HTMLDialogElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const { isOverlayOpen, toggleDialog } = useDialogControls({ ref });
  const { openedIndex, setOpenedIndex, accordionRefs } =
    useAccordionControls(0);

  const handleAddQuestion = async () => {
    const index = fields.length - 1;

    if (index !== -1) {
      await trigger("questions");

      if (formState.errors.questions) {
        onChange?.(watchQuestions);
        console.log(formState.errors.questions);
        return;
      }
    }

    append({
      questionLabel: "",
      answers: ["", "", "", ""],
      questionAnswer: "Answer",
    });

    setOpenedIndex(fields.length);
    onChange?.(watchQuestions);
  };

  const handleDeleteQuestion = (index: number) => {
    remove(index);
    toggleDialog();
  };

  const handleSelectAnswer = ({
    questionIndex,
    answerIndex,
  }: {
    questionIndex: number;
    answerIndex: number;
  }) => {
    console.log("clicked");
    update(questionIndex, {
      ...watchQuestions[questionIndex],
      questionAnswer: watchQuestions[questionIndex].answers[answerIndex],
    });
    watchQuestions[questionIndex].questionAnswer =
      watchQuestions[questionIndex].answers[answerIndex];
  };

  useEffect(() => {
    if (fields.length === 0) return;
    setTimeout(() => {
      if (endRef.current) {
        endRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 400);
  }, [fields]);

  return (
    <div className={styles.wrapper}>
      {fields.map((field, i) => (
        <div key={field.id}>
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
              <button className={styles.cta_button} onClick={toggleDialog}>
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
            <Controller
              name={`questions.${i}.questionLabel`}
              control={control}
              render={({ field: { onChange } }) => (
                <TextArea
                  name={`questions.${i}.questionLabel`}
                  label="Title"
                  {...field}
                  width="100%"
                  rows={3}
                  errors={formState.errors.questions?.[i]?.questionLabel}
                  onChange={onChange}
                />
              )}
            />
            {Array.from({ length: 4 }, (_, j) => (
              <Controller
                key={j}
                name={`questions.${i}.answers.${j}`}
                control={control}
                render={({ field }) => (
                  <div className={styles.answer}>
                    <Input
                      label={`Answer ${j + 1}`}
                      {...field}
                      width="100%"
                      errors={formState.errors.questions?.[i]?.answers?.[j]}
                    />
                    <button
                      onClick={() =>
                        handleSelectAnswer({ questionIndex: i, answerIndex: j })
                      }
                      className={`${
                        watchQuestions?.[i]?.answers?.indexOf(
                          watchQuestions[i]?.questionAnswer || ""
                        ) === j
                          ? styles.answer_active
                          : ""
                      }`}
                      type="button"
                    >
                      <IoMdCheckmarkCircle size={20} />
                    </button>
                  </div>
                )}
              />
            ))}
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
