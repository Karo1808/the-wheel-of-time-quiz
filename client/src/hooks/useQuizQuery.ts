import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getQuiz } from "../api/getQuiz";
import useQuizStore from "./useQuizStore";
import { useShallow } from "zustand/react/shallow";

const useQuizQuery = () => {
  const { quizId } = useParams<{ quizId?: string }>();
  const currentQuizId = useQuizStore(
    useShallow((state) => state.currentQuizId)
  );
  const currentQuiz = useQuizStore(
    useShallow((state) => state.quizzes[currentQuizId])
  );
  const randomSeed = useQuizStore(useShallow(() => currentQuiz.randomSeed));

  const {
    data: quiz,
    refetch,
    error,
  } = useSuspenseQuery({
    queryKey: ["quiz", quizId, randomSeed],
    queryFn: () => getQuiz({ quizId: quizId!, seed: randomSeed?.toString() }),
  });

  return { quiz, error, refetch };
};

export default useQuizQuery;
