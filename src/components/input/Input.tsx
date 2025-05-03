import styles from "./Input.module.css";
import { IInput } from "../../types";

export const Input = ({ title, placehoder, type, max, min, value, onChange }: IInput) => {
  return (
    <label className={styles.input}>
      <span>{title}</span>
      {type === "text" ? (
        <input
          type={type}
          maxLength={max}
          minLength={min}
          title={title}
          placeholder={placehoder}
          value={value}
          onChange={(e)=> {
            if (onChange) onChange(e);
          }}
        />
      ) : (
        <input
          type={type}
          max={max}
          min={min}
          title={title}
          placeholder={placehoder}
          value={value}
          onChange={(e)=> {
            if (onChange) onChange(e);
          }}
        />
      )}
    </label>
  );
};
