import { State } from "../types";
import { IoEyeSharp } from "react-icons/io5";
import {
  GiBrightExplosion,
  GiCrossroad,
  GiJewelCrown,
  GiShadowGrasp,
  GiSmallFire,
  GiSpikedDragonHead,
  GiWolfHead,
  GiBowieKnife,
  GiWhiteTower,
  GiLightningStorm,
  GiSwordClash,
} from "react-icons/gi";
import { IoIosSnow } from "react-icons/io";
import { FaLeaf } from "react-icons/fa6";
import { PiBooks } from "react-icons/pi";

export const initialState: State = {
  currentQuizId: "",
  quizzes: {
    "": {
      quizId: "",
      currentQuestionNumber: 1,
      currentScore: 0,
      numberOfQuestionsAnswered: 0,
      currentQuestionId: undefined,
      currentTime: 0,
      randomSeed: undefined,
      questions: [
        {
          answer: undefined,
          isQuestionAnswered: false,
          questionTimer: null,
          isAnswerCorrect: false,
        },
      ],
    },
  },
};

export const booksList = [
  {
    title: "All",
    icon: <PiBooks />,
  },
  {
    title: "The Eye of the World",
    icon: <IoEyeSharp />,
  },
  {
    title: "The Great Hunt",
    icon: <GiWolfHead />,
  },
  {
    title: "The Dragon Reborn",
    icon: <GiSpikedDragonHead />,
  },
  {
    title: "The Shadow Rising",
    icon: <GiShadowGrasp />,
  },
  {
    title: "Fires of Heaven",
    icon: <GiSmallFire />,
  },
  {
    title: "Lord of Chaos",
    icon: <GiBrightExplosion />,
  },
  {
    title: "A Crown of Swords",
    icon: <GiJewelCrown />,
  },
  {
    title: "Path of Daggers",
    icon: <GiJewelCrown />,
  },
  {
    title: "Winter's Heart",
    icon: <IoIosSnow />,
  },
  {
    title: "Crossroads of Twilight",
    icon: <GiCrossroad />,
  },
  {
    title: "Knife of Dreams",
    icon: <GiBowieKnife />,
  },
  {
    title: "The Gathering Storm",
    icon: <GiLightningStorm />,
  },
  {
    title: "Towers of Midnight",
    icon: <GiWhiteTower />,
  },
  {
    title: "Memory of Light",
    icon: <GiSwordClash />,
  },
  {
    title: "New Spring",
    icon: <FaLeaf />,
  },
];
