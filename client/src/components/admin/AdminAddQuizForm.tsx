import Input from "../Input";
import styles from "../../styles/adminAddQuizForm.module.css";
import SearchAndAddItem from "../SearchAndAddItem";
import useTagsQuery from "../../hooks/queries/useTagsQuery";
import { booksList } from "../../config";
import TextArea from "../TextArea";
import { useShallow } from "zustand/react/shallow";
import useCreateQuizStore from "../../hooks/useCreateQuizStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { CreateQuizSchema, createQuizSchema } from "../../schemas";

const AdminAddQuizForm = () => {
  const { tags } = useTagsQuery();
  const { setQuizName, setQuizDescription, setMaximumTime, setTags, setBooks } =
    useCreateQuizStore(useShallow((state) => state));
  const { tags: storeTags, books } = useCreateQuizStore(
    useShallow((state) => state)
  );
  const { register, handleSubmit, watch, formState } =
    useForm<CreateQuizSchema>({
      resolver: zodResolver(createQuizSchema),
    });

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

  const handleSelectBooks = (books: (string | JSX.Element)[]) => {
    setBooks(books as string[]);
  };

  const onSubmit: SubmitHandler<CreateQuizSchema> = (data) => {
    const formData = {
      quizName: data.quizName,
      quizDescription: data.quizDescription,
      maximumTime: data.maximumTime,
      tags: storeTags,
      books: books,
    };
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Input<CreateQuizSchema>
        label="Quiz Name"
        name="quizName"
        width="100%"
        register={register}
        onChange={handleInputQuizName}
        type="text"
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
        min={0}
        onChange={handleInputMaximumTime}
        register={register}
      />
      <SearchAndAddItem
        items={tags}
        keyProp={"tagName"}
        label="Tags"
        onChange={handleSelectTags}
      />
      <SearchAndAddItem
        items={booksList}
        keyProp={"title"}
        label="Books"
        onChange={handleSelectBooks}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default AdminAddQuizForm;
