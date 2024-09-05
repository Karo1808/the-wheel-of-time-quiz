import styles from "../styles/adminAddQuizPage.module.css";

import AdminAddQuizHeader from "../components/admin/AdminAddQuizHeader";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { createQuizSchema, CreateQuizSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import useCreateQuizMutation from "../hooks/queries/useCreateQuizMutation";
import useQuizQuery from "../hooks/queries/useQuizQuery";
import AdminQuizForm from "../components/admin/AdminAddQuizForm";

const AdminAddQuizPage = () => {
  // Change to endpoint
  const { quiz: defaultValues } = useQuizQuery();
  const methods = useForm<CreateQuizSchema>({
    resolver: zodResolver(createQuizSchema),
    defaultValues: {
      quizName: defaultValues.quizName,
      quizDescription: defaultValues.quizDescription,
      maximumTime: defaultValues.maximumTime,
      tags: defaultValues.tags?.map((tag) => tag.tagName),
      book: defaultValues.books?.[0],
    },
  });

  //   change mutation
  const { addQuiz } = useCreateQuizMutation();

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<CreateQuizSchema> = (data) => {
    const formData = {
      quizName: data.quizName,
      quizDescription: data.quizDescription,
      maximumTime: data.maximumTime,
      tags: data.tags,
      book: data.book?.[0],
      questions: data.questions,
    };

    addQuiz(formData);
  };

  return (
    <FormProvider {...methods}>
      <div className={styles.page}>
        <AdminAddQuizHeader
          onSubmit={handleSubmit(onSubmit)}
          reset={methods.reset}
        />
        <main className={styles.main}>
          <AdminQuizForm onSubmit={handleSubmit(onSubmit)} variant="edit" />
        </main>
      </div>
    </FormProvider>
  );
};

export default AdminAddQuizPage;
