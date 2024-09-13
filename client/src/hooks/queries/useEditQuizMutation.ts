import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateQuiz } from "../../api/updateQuiz";
import toast from "react-hot-toast";
import { useParams } from "react-router";

const useEditQuizMutation = () => {
  const { quizId } = useParams<{ quizId?: string }>();

  const client = useQueryClient();
  const { mutate: editQuiz } = useMutation({
    mutationFn: (editedQuiz) =>
      updateQuiz({ quizId: quizId!, body: editedQuiz }),
    onMutate: () => {
      toast.loading("Updating quiz...");
    },
    onError: (error) => {
      toast.dismiss();
      const statusCode = error.message.match(/\d+/g);
      const statusCodeNumber = statusCode ? Number(statusCode[0]) : null;
      switch (statusCodeNumber) {
        case 400:
          toast.error("Failed to update quiz, please try again.");
          break;
        case 404:
          toast.error("Quiz not found");
          break;
        default:
          toast.error("Failed to create quiz, please try again.");
          break;
      }
      console.error(error);
    },
    onSuccess: () => {
      toast.dismiss();
      toast.success("Quiz updated successfully");
      client.invalidateQueries({
        queryKey: ["quizzes"],
      });
      client.invalidateQueries({
        queryKey: ["quiz", quizId],
      });
    },
  });

  return { editQuiz };
};

export default useEditQuizMutation;
