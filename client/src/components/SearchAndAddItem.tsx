import { useState } from "react";
import styles from "../styles/searchAndAddItem.module.css";
import Search from "./Search";
import { IoMdClose } from "react-icons/io";
import Fuse from "fuse.js";
import Button from "./Button";

interface Props<T> {
  label?: string;
  items: T[];
  keyProp: keyof T;
}

const SearchAndAddItem = <T,>({ items, keyProp, label }: Props<T>) => {
  const [activeItems, setActiveItems] = useState<T[]>([]);
  const [results, setResults] = useState<T[]>(items);

  const fuse = new Fuse(items, {
    keys: [keyProp as string],
    threshold: 0.3,
  });

  const handleItemClick = (item: T) => {
    if (activeItems.includes(item)) {
      setActiveItems(activeItems.filter((i) => i !== item));
    } else {
      setActiveItems([...activeItems, item]);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (results.length > 0) {
      setActiveItems([...activeItems, results[0]]);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.trim() !== "") {
      const result = fuse.search(value);
      setResults(result.map((r) => r.item));
    } else {
      setResults(items);
    }
  };

  const handleClearAll = () => {
    setActiveItems([]);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.wrapper}>
      <span className={styles.label}>{label}</span>
      <Search
        name="addTags"
        width="30%"
        placeholder="Search tags"
        onChange={handleSearch}
      />
      <div className={styles.list}>
        {activeItems.map((item) => (
          <li
            key={item[keyProp] as string}
            onClick={() => handleItemClick(item)}
            className={`${styles.item} ${
              activeItems.includes(item) ? styles.active : ""
            }`}
          >
            <span>{item[keyProp] as React.ReactNode}</span>
            <button
              className={styles.remove_item}
              type="button"
              onClick={() => handleItemClick(item)}
            >
              <IoMdClose />
            </button>
          </li>
        ))}
        {activeItems.length > 0 && (
          <Button
            onClick={handleClearAll}
            type="button"
            className={styles.clear}
            state="none"
          >
            Clear All
          </Button>
        )}
      </div>
      <div className={styles.list}>
        {results
          .filter((item) => !activeItems.includes(item))
          .map((item) => (
            <button
              onClick={() => handleItemClick(item)}
              key={item[keyProp] as string}
              className={`${styles.item} ${
                activeItems.includes(item) ? styles.inactive : ""
              }`}
              type="button"
            >
              {item[keyProp] as React.ReactNode}
            </button>
          ))}
      </div>
    </form>
  );
};

export default SearchAndAddItem;
