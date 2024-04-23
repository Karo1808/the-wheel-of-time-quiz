import { State } from "../types";

export const initialState: State = {
  currentQuestionNumber: 1,
  currentScore: 0,
  numberOfQuestions: 3,
  numberOfQuestionsAnswered: 0,
  maximumTime: 1 * 60,
  currentTime: 0,
  questions: [
    {
      questionNumber: 1,
      questionLabel: "Who is the Dragon Reborn?",
      questionAnsweredIndex: null,
      questionCorrectIndex: 2,
      questionTimer: null,
      answers: [
        {
          answerNumber: 1,
          answerLabel: "Matrim Cauthon",
        },
        {
          answerNumber: 2,
          answerLabel: "Rand al'Thor",
        },
        {
          answerNumber: 3,
          answerLabel: "Egwene al'Vere",
        },
        {
          answerNumber: 4,
          answerLabel: "Perrin Ayabara",
        },
      ],
    },
    {
      questionNumber: 2,
      questionLabel: "Who is the Amyrlin Seat at the beginning of the series?",
      questionAnsweredIndex: null,
      questionCorrectIndex: 2,
      questionTimer: null,
      answers: [
        {
          answerNumber: 1,
          answerLabel: "Moiraine Damodred",
        },
        {
          answerNumber: 2,
          answerLabel: "Siuan Sanche",
        },
        {
          answerNumber: 3,
          answerLabel: "Cadsuane Melaidhrin",
        },
        {
          answerNumber: 4,
          answerLabel: "Egwene al'Vere",
        },
      ],
    },
    {
      questionNumber: 3,
      questionLabel:
        "Which organization is responsible for hunting down male channelers?",
      questionAnsweredIndex: null,
      questionCorrectIndex: 4,
      questionTimer: null,
      answers: [
        {
          answerNumber: 1,
          answerLabel: "Whitecloaks",
        },
        {
          answerNumber: 2,
          answerLabel: "Aes Sedai",
        },
        {
          answerNumber: 3,
          answerLabel: "Warders",
        },
        {
          answerNumber: 4,
          answerLabel: "Red Ajah",
        },
      ],
    },
  ],
};
