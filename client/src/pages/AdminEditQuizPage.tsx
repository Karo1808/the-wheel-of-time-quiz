import styles from "../styles/adminAddQuizPage.module.css";

import AdminAddQuizHeader from "../components/admin/AdminAddQuizHeader";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { createQuizSchema, CreateQuizSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import useQuizQuery from "../hooks/queries/useQuizQuery";
import AdminQuizForm from "../components/admin/AdminAddQuizForm";
import { dirtyValues } from "../utils/form";
import useEditQuizMutation from "../hooks/queries/useEditQuizMutation";

const AdminAddQuizPage = () => {
  const { quiz: defaultValues } = useQuizQuery();

  const methods = useForm<CreateQuizSchema>({
    resolver: zodResolver(createQuizSchema),
    defaultValues: {
      quizName: defaultValues?.quizName || "",
      quizDescription: defaultValues?.quizDescription || "",
      maximumTime: defaultValues?.maximumTime || 0,
      tags: defaultValues?.tags?.map((tag) => tag.tagName) || [],
      book: defaultValues?.book || "",
    },
  });

  const { handleSubmit } = methods;

  const { editQuiz } = useEditQuizMutation();

  const onSubmit: SubmitHandler<CreateQuizSchema> = (data) => {
    const changedValues = dirtyValues(methods.formState.dirtyFields, data);
    console.log("Changed values:", changedValues);
    editQuiz(changedValues);
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
