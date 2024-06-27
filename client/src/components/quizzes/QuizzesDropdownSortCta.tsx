import { GoChevronDown, GoChevronUp } from "react-icons/go";
import styles from "../../styles/quizzesDropdownSortCta.module.css";
import { startTransition, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

interface Props {
  label: string;
}

const QuizzesDropdownSortCta = ({ label }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentOpenIndex, setCurrentOpenIndex] = useState<number>(0);

  useEffect(() => {
    const urlSortLabels = searchParams.get("sortLabels")?.split("|") || [];
    const ascLabel = `${label}:asc`;
    const descLabel = `${label}:desc`;

    if (urlSortLabels.includes(ascLabel)) {
      setCurrentOpenIndex(1);
    } else if (urlSortLabels.includes(descLabel)) {
      setCurrentOpenIndex(2);
    }
  }, [searchParams, label]);

  const handleClick = ({ index }: { index: number }) => {
    setCurrentOpenIndex(index);

    const urlSortLabels = searchParams.get("sortLabels")?.split("|") || [];
    const ascLabel = `${label}:asc`;
    const descLabel = `${label}:desc`;

    const updatedSortLabels = urlSortLabels.filter(
      (urlLabel) => urlLabel !== ascLabel && urlLabel !== descLabel
    );

    if (currentOpenIndex === index) {
      setCurrentOpenIndex(0);
      setSearchParams({ sortLabels: updatedSortLabels.join("|") });
      return;
    }

    const newLabel = index === 1 ? ascLabel : descLabel;
    updatedSortLabels.push(newLabel);

    const newUrlSortLabels = updatedSortLabels.join("|");

    startTransition(() => {
      setSearchParams({ sortLabels: newUrlSortLabels });
    });
  };

  return (
    <div className={styles.container}>
      <button
        onClick={() => handleClick({ index: 1 })}
        className={`${styles.button} ${
          currentOpenIndex === 1 && styles.active
        }`}
      >
        <GoChevronUp size={20} />
      </button>
      <button
        onClick={() => handleClick({ index: 2 })}
        className={`${styles.button} ${
          currentOpenIndex === 2 && styles.active
        }`}
      >
        <GoChevronDown size={20} />
      </button>
    </div>
  );
};

export default QuizzesDropdownSortCta;
