import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import styles from "../styles/input.module.css";

interface Props<T extends FieldValues>
  extends React.ComponentPropsWithoutRef<"input"> {
  label: string;
  name: Path<T>;
  width?: string;
  register: UseFormRegister<T>;
}

const Input = <T extends FieldValues>({
  label,
  name,
  width,
  register,
  ...props
}: Props<T>) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange?.(e);
  };

  return (
    <div className={styles.wrapper}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <input
        className={styles.input}
        {...props}
        style={{ width: width }}
        {...register(name, { required: true, onChange: handleChange })}
      />
    </div>
  );
};

export default Input;
