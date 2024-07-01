import { IoIosSearch } from "react-icons/io";
import styles from "../styles/search.module.css";
import { InputHTMLAttributes, useState } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  width?: string;
}

const Search = ({ name, ...props }: Props) => {
  const [value, setValue] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className={styles.wrapper} style={{ width: props?.width }}>
      <button type="submit" className={styles.button}>
        <IoIosSearch size={20} />
      </button>
      <input
        id={name}
        type={props?.type || "text"}
        placeholder={props?.placeholder || "placeholder"}
        className={styles.input}
        onChange={(e) => {
          handleChange(e);
          props?.onChange?.(e);
        }}
        value={value}
        {...props}
      />
    </div>
  );
};

export default Search;
