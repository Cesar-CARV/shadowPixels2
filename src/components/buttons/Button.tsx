import React from "react";
import styles from "./Button.module.css";
import { IButton } from "../../types";

const SHAPECLASS = {
  circle: styles["button-circle"],
  square: styles["button-square"],
};

export const Button = ({
  children,
  title,
  color,
  type,
  shape,
  onClick,
  shortcut,
}: IButton) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(e);
  };
  return (
    <>
      <button
        type={type}
        className={`${styles.button} ${
          !shape ? styles["button-normal"] : SHAPECLASS[shape]
        }  ${styles["button-" + color]}`}
        role="button"
        title={title}
        onClick={handleClick}
      >
        {children}
        {shortcut ? <span className={styles.shortcut}>{shortcut}</span> : null}
      </button>
    </>
  );
};
