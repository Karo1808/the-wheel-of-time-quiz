import {
  FieldErrors,
  FieldValues,
  Path,
  useFormContext,
  UseFormRegister,
} from "react-hook-form";
import styles from "../styles/input.module.css";
import FormError from "./FormError";

interface Props<T extends FieldValues>
  extends React.ComponentPropsWithoutRef<"input"> {
  label: string;
  name: Path<T>;
  width?: string;
  errors?: FieldErrors[keyof FieldValues];
  cta?: React.ReactNode;
}

const Input = <T extends FieldValues>({
  label,
  name,
  width,
  errors,
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
          style={{ width: width }}
          defaultValue={props.defaultValue?.toString()}
          onChange={handleChange}
          {...props}
        />
        {cta}
      </div>
      <FormError errorMessage={errorMessage} />
    </div>
  );
};

export default Input;
