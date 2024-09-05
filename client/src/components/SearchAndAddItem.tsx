import { useEffect, useRef, useState } from "react";
import styles from "../styles/searchAndAddItem.module.css";
import Search from "./Search";
import { IoMdClose } from "react-icons/io";
import Fuse from "fuse.js";
import Button from "./Button";

interface PropsBase<T> {
  label?: string;
  items: T[];
  onChange?: (items: T[]) => void;
  variant: "single" | "many";
}

type Props<T> = PropsBase<T> &
  (
    | { variant: "single"; defaultValue: T } // If variant is "single", defaultValue is a single item
    | { variant: "many"; defaultValue: T[] }
  ); // If variant is "many", defaultValue is an array of items

// Component definition
const SearchAndAddItem = <T,>({
  label,
  items,
  onChange,
  variant,
  defaultValue,
}: Props<T>) => {
  const [activeItems, setActiveItems] = useState<T[]>(
    variant === "single" ? [defaultValue as T] : (defaultValue as T[])
  );
  const [results, setResults] = useState<T[]>([]);

  const endRef = useRef<HTMLDivElement>(null);

  // Initialize results to exclude defaultValue from items on first render
  useEffect(() => {
    if (variant === "single") {
      setResults(items.filter((item) => item !== defaultValue));
      return;
    }
    setResults(items.filter((item) => !defaultValue.includes(item)));
  }, [items, defaultValue, variant]);

  // Fuse.js instance for search functionality
  const fuse = new Fuse(items, {
    threshold: 0.1,
  });

  // Handle item click to add/remove items
  const handleItemClick = (item: T) => {
    if (activeItems.includes(item)) {
      // Remove item from active items
      const newActiveItems = activeItems.filter((i) => i !== item);
      setActiveItems(newActiveItems);
      onChange?.(newActiveItems);
      setResults([...results, item]); // Add back to results
    } else {
      if (variant === "single") {
        setActiveItems([item]);
        onChange?.([item]);
        setResults(items.filter((i) => i !== item)); // Update results
        return;
      }
      // Add item to active items
      const newActiveItems = [...activeItems, item];
      setActiveItems(newActiveItems);
      onChange?.(newActiveItems);
      setResults(results.filter((i) => i !== item)); // Remove from results
    }
  };

  // Handle when Enter is pressed
  const handleEnter = () => {
    if (results.length === 0) return;

    const isDuplicate = activeItems.includes(results[0]);
    if (isDuplicate) return;

    if (variant === "single") {
      setActiveItems([results[0]]);
      onChange?.([results[0]]);
      setResults(items.filter((i) => i !== results[0])); // Reset results
      return;
    }

    const newActiveItems = [...activeItems, results[0]];
    setActiveItems(newActiveItems);
    onChange?.(newActiveItems);
    setResults(results.filter((i) => i !== results[0])); // Remove from results
  };

  // Scroll to the end of the list when results or active items change
  useEffect(() => {
    if (results.length > 0) {
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [results, activeItems]);

  // Handle search input changes
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.trim() !== "") {
      const result = fuse.search(value);
      setResults(
        result.map((r) => r.item).filter((item) => !activeItems.includes(item))
      );
    } else {
      setResults(items.filter((item) => !activeItems.includes(item))); // Filter out active items
    }
  };

  // Clear all active items
  const handleClearAll = () => {
    setActiveItems([]);
    onChange?.([]);
    setResults(items); // Reset results when clearing all
  };

  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>{label}</span>
      <Search
        name="addTags"
        placeholder={`Search ${label}${variant === "many" ? "" : "s"}`}
        onEnter={handleEnter}
        onChange={handleSearch}
        autoComplete="off"
      />
      {items.length > 0 && (
        <div className={styles.list}>
          {activeItems.map((item) => (
            <li
              key={JSON.stringify(item)}
              onClick={() => handleItemClick(item)}
              className={`${styles.item} ${
                activeItems.includes(item) ? styles.active : ""
              }`}
            >
              <span>{item as React.ReactNode}</span>
              <button
                className={styles.remove_item}
                type="button"
                onClick={() => handleItemClick(item)}
              >
                <IoMdClose />
              </button>
            </li>
          ))}
          {activeItems.length > 0 && variant === "many" && (
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
                key={JSON.stringify(item)}
                className={`${styles.item} ${
                  activeItems.includes(item) ? styles.inactive : ""
                }`}
                type="button"
              >
                {item as React.ReactNode}
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
