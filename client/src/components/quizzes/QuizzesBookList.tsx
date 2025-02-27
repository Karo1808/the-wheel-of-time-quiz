import { startTransition, useState } from "react";

import useUpdateSearchParams from "../../hooks/useUpdateSearchParams";

import { booksList, STARTING_PAGE } from "../../config";

import styles from "../../styles/quizzesBookList.module.css";

interface Props {
  setIsBookDrawerOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const QuizzesBookList = ({ setIsBookDrawerOpen }: Props) => {
  const [activeBook, setActiveBook] = useState<string>("");

  const { updateSearchParams } = useUpdateSearchParams();

  const handleBookClick = (bookTitle: string) => {
    startTransition(() => {
      setActiveBook(bookTitle);
      updateSearchParams({ book: bookTitle, page: STARTING_PAGE.toString() });
      setIsBookDrawerOpen?.(false);
    });
  };

  return (
    <ul className={styles.list}>
      {booksList.map((book, index) => (
        <li
          className={`${activeBook === book.title && styles.active} ${
            styles.item
          }`}
          key={book.title}
        >
          <button
            className={`${styles.btn} ${
              index === booksList.length - 1 && styles.last
            }`}
            onClick={() => handleBookClick(book.title)}
          >
            {book.icon}
            <span>{book.title}</span>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default QuizzesBookList;
