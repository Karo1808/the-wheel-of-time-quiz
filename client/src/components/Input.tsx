import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import styles from "../styles/input.module.css";

interface Props<T extends FieldValues>
  extends React.ComponentPropsWithoutRef<"input"> {
  label: string;
  name: Path<T>;
  width?: string;
  register?: UseFormRegister<T>;
  errors?: FieldErrors[keyof FieldValues];
  required?: boolean;
  cta?: React.ReactNode;
}

const Input = <T extends FieldValues>({
  label,
  name,
  width,
  register,
  errors,
  required,
  cta,
  ...props
}: Props<T>) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange?.(e);
  };

  const errorMessage = errors?.message as React.ReactNode;

  return (
    <div className={styles.wrapper}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <div className={styles.input_wrapper}>
        <input
          className={styles.input}
          {...props}
          style={{ width: width }}
          {...(register &&
            register(name, { required, onChange: handleChange }))}
          onChange={handleChange}
        />
        {cta}
      </div>
      {errors && <p className={styles.error}>{errorMessage}</p>}
    </div>
  );
};

export default Input;
