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
import FormError from "../FormError";
import { createQuizQuestion } from "../../types";

interface AdminAddQuizQuestionsProps {
  questions: QuestionsSchema["questions"];
  onChange?: (questions: QuestionsSchema["questions"]) => void;
}

const GRAY_COLOR = "#867d77";

const AdminAddQuizQuestions = ({
  questions,
  onChange,
}: AdminAddQuizQuestionsProps) => {
  const { trigger, control, watch, formState, setError, setValue } =
    useFormContext<CreateQuizSchema>(); // Access form context
  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions", // Field name in the form state
  });

  const watchQuestions = watch("questions");

  const ref = useRef<HTMLDialogElement>(null);
  const questionRefs = useRef<HTMLDivElement[] | null[]>([]);

  const { isOverlayOpen, toggleDialog } = useDialogControls({ ref });
  const { openedIndex, setOpenedIndex, accordionRefs } =
    useAccordionControls(0);

  useEffect(() => {
    setValue("questions", questions);
  }, [questions, setValue]);

  const handleAddQuestion = async () => {
    const index = fields.length - 1;

    if (index !== -1) {
      await trigger("questions");

      const questionAnswer = watchQuestions[index].questionAnswer;

      if (!questionAnswer) {
        setError("questions", { type: "nonexisting" }, { shouldFocus: true });
      }

      const errors = formState?.errors?.questions;
      const errorIndex = errors?.findIndex?.((error) => error);
      setOpenedIndex(errorIndex);
      const errorRef = questionRefs.current[errorIndex || 0];

      if (errorRef) {
        errorRef.scrollIntoView({ behavior: "smooth" });
      }

      const errorsExcludingMissingQuestions =
        formState?.errors?.questions?.filter?.(
          (error) => error?.message !== "At least three questions are required"
        );

      if (errorsExcludingMissingQuestions) {
        onChange?.(watchQuestions);
        return;
      }
    }

    const newQuestion: createQuizQuestion = {
      questionLabel: "",
      answers: ["", "", "", ""],
      questionAnswer: "Answer",
    };

    append(newQuestion);

    const newWatchQuestions = [...watchQuestions, newQuestion];
    // setValue("questions", newWatchQuestions);
    onChange?.(newWatchQuestions);
    setOpenedIndex(newWatchQuestions.length - 1);
  };

  const handleDeleteQuestion = (index: number) => {
    remove(index);
    toggleDialog();
    const newWatchQuestions = watchQuestions.filter((_, i) => i !== index);
    setValue("questions", newWatchQuestions);
    onChange?.(newWatchQuestions);
  };

  const handleSelectAnswer = ({
    questionIndex,
    answerIndex,
  }: {
    questionIndex: number;
    answerIndex: number;
  }) => {
    const currentQuestion = watchQuestions[questionIndex];

    // Update only the specific field
    setValue(
      `questions.${questionIndex}.questionAnswer`,
      currentQuestion.answers[answerIndex]
    );

    // Optionally, trigger validation or re-render
    trigger(`questions.${questionIndex}.questionAnswer`);
  };

  useEffect(() => {
    if (fields.length === 0) return;
    setTimeout(() => {
      const errors = formState?.errors?.questions;
      const endRef = questionRefs.current[fields.length - 1];
      if (endRef && !errors) {
        endRef.scrollIntoView({ behavior: "smooth" });
      }
    }, 400);
  }, [fields, questionRefs, formState]);

  return (
    <div className={styles.wrapper}>
      {fields.map((field, i) => (
        <div key={field.id} ref={(el) => (questionRefs.current[i] = el)}>
          <Dialog
            toggleDialog={toggleDialog}
            ref={ref}
            isOverlayOpen={isOverlayOpen}
          >
            <AdminDeleteConfirm
              onCancel={toggleDialog}
              onDelete={() => handleDeleteQuestion(i)}
              Icon={<FaTrashCan size={50} color={GRAY_COLOR} />}
              title="Are you sure you want to delete this question?"
              description="This action cannot be undone"
              action="Delete"
            />
          </Dialog>
          <Accordion
            Icon={
              <button
                className={styles.cta_button}
                onClick={toggleDialog}
                type="button"
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
            <Controller
              name={`questions.${i}.questionLabel`}
              control={control}
              render={({ field }) => (
                <TextArea
                  label="Title"
                  {...field}
                  name={`questions.${i}.questionLabel`}
                  width="100%"
                  rows={3}
                  errors={formState.errors.questions?.[i]?.questionLabel}
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
                      cta={
                        <button
                          onClick={() =>
                            handleSelectAnswer({
                              questionIndex: i,
                              answerIndex: j,
                            })
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
                      }
                    />
                  </div>
                )}
              />
            ))}
            {formState.errors.questions &&
              formState.errors.questions.type === "nonexisting" && (
                <FormError errorMessage="Question answer is required" />
              )}

            {formState.errors.questions &&
              formState.errors.questions[0]?.answers && (
                <FormError errorMessage="No duplicate answers allowed" />
              )}
          </Accordion>
        </div>
      ))}
      <div className={styles.add_question}>
        <button
          onClick={handleAddQuestion}
          className={styles.add_button}
          type="button"
        >
          <p>Add Question</p>
          <AiOutlinePlus className={styles.plus_icon} />
        </button>
      </div>
      {formState?.errors?.questions?.message ===
        "At least three questions are required" && (
        <FormError
          errorMessage="At least three questions are required"
          style={{ margin: "0 auto" }}
        />
      )}
    </div>
  );
};

export default AdminAddQuizQuestions;
