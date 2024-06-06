import styles from "../../styles/quizzesBookList.module.css";
import { booksList } from "../../config";
import { useState } from "react";

const QuizzesBookList = () => {
  const [activeBook, setActiveBook] = useState<string>("");

  return (
    <ul className={styles.list}>
      {booksList.map((book) => (
        <li className={styles.item} key={book.title}>
          <button
            onClick={() => setActiveBook(book.title)}
            className={`${activeBook === book.title && styles.active}`}
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
