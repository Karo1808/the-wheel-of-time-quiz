import { useEffect, useRef, useState } from "react";
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
  const endRef = useRef<HTMLDivElement>(null);

  const fuse = new Fuse(items, {
    keys: [keyProp as string],
    threshold: 0.1,
  });

  const handleItemClick = (item: T) => {
    if (activeItems.includes(item)) {
      setActiveItems(activeItems.filter((i) => i !== item));
    } else {
      setActiveItems([...activeItems, item]);
    }
  };

  const handleEnter = () => {
    if (results.length === 0) return;

    const isDuplicate =
      activeItems.filter((item) => item[keyProp] === results[0][keyProp])
        .length > 0;
    if (isDuplicate) return;

    setActiveItems([...activeItems, results[0]]);
    setResults(items);
  };

  useEffect(() => {
    if (results.length > 0) {
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [results, activeItems]);

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
    <div className={styles.wrapper}>
      <span className={styles.label}>{label}</span>
      <Search
        name="addTags"
        placeholder="Search tags"
        onEnter={handleEnter}
        onChange={handleSearch}
        autoComplete="off"
      />
      {activeItems.length > 0 && (
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
      )}
      <div className={styles.list} ref={endRef}>
        {results.length > 0 ? (
          results
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
            ))
        ) : (
          <p className={styles.no_results}>No results found</p>
        )}
      </div>
    </div>
  );
};

export default SearchAndAddItem;
