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
import { FormEventHandler } from "react";
import { createQuizState } from "../../types";

interface AdminAddQuizFormProps extends React.ComponentPropsWithoutRef<"form"> {
  onSubmit: FormEventHandler<HTMLFormElement>;
}

const AdminAddQuizForm = ({ onSubmit, ...props }: AdminAddQuizFormProps) => {
  const { tags } = useTagsQuery();
  const {
    setQuizName,
    setQuizDescription,
    setMaximumTime,
    setTags,
    setBook,
    setQuestions,
  } = useCreateQuizStore(useShallow((state) => state));

  const { formState, control, register } = useFormContext<CreateQuizSchema>();
  const defaultTags = useCreateQuizStore(useShallow((state) => state.tags));
  const defaultBook = useCreateQuizStore(useShallow((state) => state.book));
  const defaultQuestions = useCreateQuizStore(
    useShallow((state) => state.questions)
  );

  const handleInputQuizName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuizName(e.target.value);
  };

  const handleInputQuizDescription = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setQuizDescription(e.target.value);
  };

  const handleInputMaximumTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaximumTime(Number(e.target.value));
  };

  const handleSelectTags = (tags: (string | number)[]) => {
    setTags(tags as string[]);
  };

  const handleSelectBooks = (book: string) => {
    setBook(book);
  };

  const handleSelectQuestions = (questions: createQuizState["questions"]) => {
    console.log(questions);
    setQuestions(questions);
  };

  return (
    <form className={styles.form} onSubmit={onSubmit} {...props}>
      <section className={styles.left}>
        <Input<CreateQuizSchema>
          label="Quiz Name"
          name="quizName"
          width="100%"
          register={register}
          onChange={handleInputQuizName}
          type="text"
          errors={formState.errors.quizName}
          required
        />
        <TextArea<CreateQuizSchema>
          rows={6}
          label="Description"
          width="100%"
          onChange={handleInputQuizDescription}
          name="quizDescription"
          register={register}
        />
        <Input<CreateQuizSchema>
          type="number"
          label="Maximum Time (seconds)"
          name="maximumTime"
          width="100%"
          onChange={handleInputMaximumTime}
          register={register}
          errors={formState.errors.maximumTime}
          required
        />
        <Controller
          name="tags"
          control={control}
          defaultValue={[]}
          render={({ field: { onChange } }) => (
            <SearchAndAddItem<string>
              variant="many"
              defaultValue={defaultTags}
              items={tags.map((tag) => tag.tagName)}
              label="Tags"
              onChange={(tags) => {
                handleSelectTags(tags);
                onChange(tags);
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
              defaultValue={defaultBook}
              variant="single"
              items={booksList.map((book) => book.title)}
              label="Book"
              onChange={(book) => {
                handleSelectBooks(book[0]);
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
                handleSelectQuestions(
                  questions as createQuizState["questions"]
                );
                onChange(questions);
              }}
              questions={defaultQuestions}
            />
          )}
        ></Controller>
      </section>
    </form>
  );
};

export default AdminAddQuizForm;
