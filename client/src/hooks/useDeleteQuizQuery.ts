import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteQuiz } from "../api/deleteQuiz";
import { useParams } from "react-router";
import toast from "react-hot-toast";

const useDeleteQuizQuery = () => {
  const { quizId } = useParams<{ quizId?: string }>();
  const queryClient = useQueryClient();

  const { mutate, status } = useMutation({
    mutationFn: () => deleteQuiz({ quizId: quizId! }),
    onSuccess: () => {
      toast.dismiss();
      toast.success("Quiz deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["quiz", quizId] });
      queryClient.invalidateQueries({ queryKey: ["quizzes"] });
    },
    onError: () => {
      toast.dismiss();
      toast.error("Something went wrong. Please try again.");
    },
    onMutate: () => {
      toast.loading("Deleting quiz...");
    },
  });

  return { mutate, status };
};

export default useDeleteQuizQuery;
