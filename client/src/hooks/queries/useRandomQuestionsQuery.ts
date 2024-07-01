import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getRandomQuestions } from "../../api/getRandomQuestions";
import useQuizStore from ".././useQuizStore";
import { useShallow } from "zustand/react/shallow";

const useRandomQuestionsQuery = () => {
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
    queryFn: () =>
      getRandomQuestions({ quizId: quizId!, seed: randomSeed?.toString() }),
  });

  return { quiz, error, refetch };
};

export default useRandomQuestionsQuery;
