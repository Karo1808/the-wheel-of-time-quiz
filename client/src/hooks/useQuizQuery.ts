import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getQuiz } from "../api/getQuiz";
import { shuffleArray } from "../utils/randomize";
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
    queryFn: () => getQuiz({ quizId: quizId! }),
    enabled: !!quizId,
    staleTime: Infinity,
    select: (data) => {
      const { newArray: randomQuestions, seed } = shuffleArray(
        data.questions,
        randomSeed
      );
      data.questions = randomQuestions;
      data.questions.forEach((question) => {
        const { newArray: randomAnswers } = shuffleArray(
          question.answers,
          seed
        );
        question.answers = randomAnswers;
      });
      return { quizData: data, seed };
    },
  });

  console.log("Called quizquery");
  return { quiz, isLoading, error };
};

export default useQuizQuery;
