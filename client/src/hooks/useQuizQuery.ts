import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getQuiz } from "../api/getQuiz";
import useQuizStore from "./useQuizStore";
import { useShallow } from "zustand/react/shallow";

const useQuizQuery = () => {
  const { quizId } = useParams<{ quizId?: string }>();
  const randomSeed = useQuizStore(useShallow((state) => state.randomSeed));

  const {
    data: quiz,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["quiz", quizId],
    queryFn: () => getQuiz({ quizId: quizId!, seed: randomSeed?.toString() }),
    enabled: !!quizId,
    staleTime: Infinity,
  });

  return { quiz, isLoading, error };
};

export default useQuizQuery;
