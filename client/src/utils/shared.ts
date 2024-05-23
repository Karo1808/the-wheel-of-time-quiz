import { TimeFormat } from "../types";

export const formatTime = (time: TimeFormat) => {
  if (typeof time === "string") {
    const [minutes, seconds] = time.split(":");
    return Number(minutes) * 60 + Number(seconds);
  }
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

export const indexToRowsAndCols = (index: number) => {
  const rows = index === 0 || index === 1 ? 0 : 1;
  const cols = index === 0 || index === 2 ? 0 : 1;
  return { rows, cols };
};
