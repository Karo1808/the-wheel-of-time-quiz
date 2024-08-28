import Input from "../Input";
import styles from "../../styles/adminAddQuizForm.module.css";
import SearchAndAddItem from "../SearchAndAddItem";
import useTagsQuery from "../../hooks/queries/useTagsQuery";
import { booksList } from "../../config";
import TextArea from "../TextArea";
import { useShallow } from "zustand/react/shallow";
import useCreateQuizStore from "../../hooks/useCreateQuizStore";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { CreateQuizSchema, createQuizSchema } from "../../schemas";
import AdminAddQuizQuestions from "./AdminAddQuizQuestions";

const AdminAddQuizForm = () => {
  const { tags } = useTagsQuery();
  const { setQuizName, setQuizDescription, setMaximumTime, setTags, setBooks } =
    useCreateQuizStore(useShallow((state) => state));
  const { tags: storeTags, books } = useCreateQuizStore(
    useShallow((state) => state)
  );

  const methods = useForm<CreateQuizSchema>({
    resolver: zodResolver(createQuizSchema),
  });
  const { register, handleSubmit, watch, formState, control } = methods;

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
    console.log("idk");
    const formData = {
      quizName: data.quizName,
      quizDescription: data.quizDescription,
      maximumTime: data.maximumTime,
      tags: data.tags,
      books: data.books,
      questions: data.questions,
    };
    console.log(formData, formState);
  };

  return (
    <FormProvider {...methods}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
              <SearchAndAddItem
                items={tags}
                keyProp={"tagName"}
                label="Tags"
                onChange={onChange}
              />
            )}
          />
          <Controller
            name="books"
            control={control}
            defaultValue={["All"]}
            render={({ field: { onChange } }) => (
              <SearchAndAddItem
                items={booksList}
                keyProp={"title"}
                label="Books"
                onChange={onChange}
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
              <AdminAddQuizQuestions onChange={onChange} questions={[]} />
            )}
          ></Controller>
        </section>
        {/* <button type="submit">Submit</button> */}
      </form>
    </FormProvider>
  );
};

export default AdminAddQuizForm;
