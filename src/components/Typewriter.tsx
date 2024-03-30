import { useEffect, useState } from "react";

const Typewriter = ({
  text,
  delay,
  isOpaque,
}: {
  text: string;
  delay: number;
  isOpaque?: boolean;
}) => {
  const [currentText, setCurrentText] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    if (isOpaque) return;
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, delay, isOpaque]);

  return <span style={{ opacity: isOpaque ? 0 : 1 }}>{currentText}</span>;
};

export default Typewriter;
