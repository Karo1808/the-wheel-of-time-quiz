import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createQuiz } from "../../api/createQuiz";
import toast from "react-hot-toast";

const useCreateQuizMutation = () => {
  const client = useQueryClient();
  const { mutate: addQuiz } = useMutation({
    mutationFn: createQuiz,
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
    },
  });

  return { addQuiz };
};

export default useCreateQuizMutation;
