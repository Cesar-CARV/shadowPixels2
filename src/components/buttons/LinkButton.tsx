import styles from "./Button.module.css";
import { IButtonLink } from "../../types";

const SHAPECLASS = {
  circle: styles["button-circle"],
  square: styles["button-square"],
};

export const LinkButton = ({
  children,
  href,
  title,
  target,
  color,
  shape,
}: IButtonLink) => {
  return (
    <a
      href={href}
      target={target}
      className={`${styles.button} ${
        !shape ? styles["button-normal"] : SHAPECLASS[shape]
      }  ${styles["button-" + color]}`}
      role="button"
      title={title}
    >
      {children}
    </a>
  );
};
