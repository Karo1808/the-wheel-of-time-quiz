import styles from "../../styles/quizzesBookList.module.css";
import { booksList } from "../../config";
import { useState } from "react";

const QuizzesBookList = () => {
  const [activeBook, setActiveBook] = useState<string>("");

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
            onClick={() => setActiveBook(book.title)}
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
