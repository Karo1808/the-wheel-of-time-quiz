export const getTimeValue = (time: string | null) => {
  if (!time) return 0;
  const [minutes, seconds] = time.split(":");
  return Number(minutes) * 60 + Number(seconds);
};

export const getScore = (value: number, maxValue: number) => {
  return Math.round((value / maxValue) * 100);
};

export const getTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return formatTime(minutes, seconds);
};

export const formatTime = (minutes: number, seconds: number) => {
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};
