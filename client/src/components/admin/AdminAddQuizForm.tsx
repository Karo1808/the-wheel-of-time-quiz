import React, { FormEventHandler, useMemo, useCallback } from "react";
import Input from "../Input";
import styles from "../../styles/adminAddQuizForm.module.css";
import SearchAndAddItem from "../SearchAndAddItem";
import useTagsQuery from "../../hooks/queries/useTagsQuery";
import { booksList } from "../../config";
import TextArea from "../TextArea";
import { useShallow } from "zustand/react/shallow";
import useCreateQuizStore from "../../hooks/useCreateQuizStore";
import { Controller, useFormContext } from "react-hook-form";
import { CreateQuizSchema } from "../../schemas";
import AdminAddQuizQuestions from "./AdminAddQuizQuestions";
import useQuizQuery from "../../hooks/queries/useQuizQuery";
import { createQuizState } from "../../types";

interface AdminAddQuizFormProps extends React.ComponentPropsWithoutRef<"form"> {
  onSubmit: FormEventHandler<HTMLFormElement>;
  variant: "edit" | "add";
}

const AdminQuizForm = ({
  onSubmit,
  variant,
  ...props
}: AdminAddQuizFormProps) => {
  const { tags } = useTagsQuery();
  const {
    setQuizName,
    setQuizDescription,
    setMaximumTime,
    setTags,
    setBook,
    setQuestions,
  } = useCreateQuizStore(useShallow((state) => state));

  const { formState, control } = useFormContext<CreateQuizSchema>();
  const defaultTags = useCreateQuizStore(useShallow((state) => state.tags));
  const defaultBook = useCreateQuizStore(useShallow((state) => state.book));
  const defaultQuestions = useCreateQuizStore(
    useShallow((state) => state.questions)
  );

  const { quiz: defaultValues } = useQuizQuery();

  const defaultQueryTags = useMemo(
    () => defaultValues?.tags?.map((tag) => tag.tagName),
    [defaultValues?.tags]
  );

  const defaultQueryBook = useMemo(
    () => defaultValues.book,
    [defaultValues?.book]
  );

  const defaultQueryQuestions = useMemo(
    () =>
      defaultValues?.questions?.map((question) => ({
        questionLabel: question.questionLabel,
        answers: question.answers.map((answer) => answer.answerLabel),
        questionAnswer: question.questionAnswer,
      })),
    [defaultValues?.questions]
  );

  const handleInputQuizName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuizName(e.target.value);
    },
    [setQuizName]
  );

  const handleInputQuizDescription = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setQuizDescription(e.target.value);
    },
    [setQuizDescription]
  );

  const handleInputMaximumTime = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setMaximumTime(Number(e.target.value));
    },
    [setMaximumTime]
  );

  const handleSelectTags = useCallback(
    (tags: (string | number)[]) => {
      setTags(tags as string[]);
    },
    [setTags]
  );

  const handleSelectBooks = useCallback(
    (book: string) => {
      setBook(book);
    },
    [setBook]
  );

  const handleSelectQuestions = useCallback(
    (questions: createQuizState["questions"]) => {
      setQuestions(questions);
    },
    [setQuestions]
  );

  return (
    <form className={styles.form} onSubmit={onSubmit} {...props}>
      <section className={styles.left}>
        <Controller
          name="quizName"
          control={control}
          defaultValue={defaultValues?.quizName}
          rules={{ required: true }}
          render={({ field: { onChange } }) => (
            <Input<CreateQuizSchema>
              label="Quiz Name"
              name="quizName"
              onChange={(quizName) => {
                variant === "add" ? handleInputQuizName(quizName) : undefined;
                onChange(quizName);
              }}
              width="100%"
              type="text"
              errors={formState.errors.quizName}
              required
              defaultValue={defaultValues?.quizName}
            />
          )}
        />
        <Controller
          name="quizDescription"
          control={control}
          defaultValue={defaultValues?.quizDescription}
          rules={{ required: false }}
          render={({ field: { onChange } }) => (
            <TextArea<CreateQuizSchema>
              rows={6}
              label="Description"
              width="100%"
              onChange={(quizDescription) => {
                variant === "add"
                  ? handleInputQuizDescription(quizDescription)
                  : undefined;
                onChange(quizDescription);
              }}
              name="quizDescription"
              defaultValue={defaultValues?.quizDescription}
            />
          )}
        />
        <Controller
          name="maximumTime"
          control={control}
          defaultValue={defaultValues?.maximumTime}
          rules={{ required: true }}
          render={({ field: { onChange } }) => (
            <Input<CreateQuizSchema>
              type="number"
              label="Maximum Time (seconds)"
              name="maximumTime"
              width="100%"
              onChange={(maximumTime) => {
                variant === "add"
                  ? handleInputMaximumTime(maximumTime)
                  : undefined;
                onChange(maximumTime);
              }}
              errors={formState.errors.maximumTime}
              required
              defaultValue={defaultValues?.maximumTime}
            />
          )}
        />
        <Controller
          name="tags"
          control={control}
          defaultValue={[]}
          render={({ field: { onChange } }) => (
            <SearchAndAddItem<string>
              variant="many"
              defaultValue={
                variant === "add" ? defaultTags || [] : defaultQueryTags || []
              }
              items={tags.map((tag) => tag.tagName)}
              label="Tags"
              onChange={(tags) => {
                variant === "add" ? handleSelectTags(tags) : undefined;
                onChange(tags as string[]);
              }}
            />
          )}
        />
        <Controller
          name="book"
          control={control}
          defaultValue={["All"]}
          render={({ field: { onChange } }) => (
            <SearchAndAddItem<string>
              defaultValue={
                variant === "add" ? defaultBook : defaultQueryBook || ""
              }
              variant="single"
              items={booksList.map((book) => book.title)}
              label="Book"
              onChange={(book) => {
                variant === "add" ? handleSelectBooks(book[0]) : undefined;
                onChange(book);
              }}
            />
          )}
        ></Controller>
      </section>
      <section>
        <Controller
          name="questions"
          control={control}
          defaultValue={[]}
          render={({ field: { onChange } }) => (
            <AdminAddQuizQuestions
              onChange={(questions) => {
                variant === "add"
                  ? handleSelectQuestions(
                      questions as createQuizState["questions"]
                    )
                  : undefined;
                onChange(questions);
              }}
              questions={
                variant === "add" ? defaultQuestions : defaultQueryQuestions
              }
            />
          )}
        ></Controller>
      </section>
    </form>
  );
};

export default AdminQuizForm;
