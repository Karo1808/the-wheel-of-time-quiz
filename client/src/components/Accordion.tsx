import { forwardRef } from "react";
import styles from "../styles/accordion.module.css";
import { IoIosArrowDown } from "react-icons/io";

interface Props {
  children: React.ReactNode;
  index: number;
  openedIndex: number | undefined;
  setOpenedIndex: React.Dispatch<React.SetStateAction<number | undefined>>;
  Icon: React.ReactNode;
  topContent: React.ReactNode;
  maxHeight?: number;
}

const Accordion = forwardRef<HTMLDivElement, Props>(
  (
    {
      children,
      index,
      openedIndex,
      setOpenedIndex,
      Icon,
      topContent,
      maxHeight = 300,
    },
    ref
  ) => {
    const toggleAccordion = (e: React.MouseEvent<HTMLElement>) => {
      const tagName = (e.target as HTMLElement).tagName;
      if (
        tagName !== "TEXTAREA" &&
        tagName !== "INPUT" &&
        tagName !== "path" &&
        tagName !== "LABEL"
      ) {
        setOpenedIndex(openedIndex === index ? undefined : index);
      }
    };

    return (
      <div ref={ref} onClick={toggleAccordion} className={styles.container}>
        <div>{Icon}</div>
        <div className={styles.text}>{topContent}</div>
        <button className={styles.arrow_button}>
          <IoIosArrowDown
            className={`${styles.arrow_icon} ${
              openedIndex === index && styles.open_icon
            }`}
          />
        </button>
        <ol
          className={`${styles.answers}`}
          style={{
            maxHeight: openedIndex === index ? maxHeight : 0,
            transition:
              openedIndex === index
                ? "max-height 600ms ease"
                : "max-height 500ms ease",
          }}
        >
          {children}
        </ol>
      </div>
    );
  }
);

export default Accordion;
