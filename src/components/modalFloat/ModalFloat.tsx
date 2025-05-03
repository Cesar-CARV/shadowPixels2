import { useState } from "react";
import { Button } from "../buttons/Button";
import { IconMinus } from "../../icons/IconMinus";
import { IModalFloat } from "../../types";
import { IconPlus } from "../../icons/IconPlus";
import styles from "./ModalFloat.module.css";

export const ModalFloat = ({
  top,
  left,
  right,
  bottom,
  title,
  extraButton,
  children,
}: IModalFloat) => {
  const [open, setOpen] = useState(true);

  const handleButtonClick = () => {
    setOpen(!open);
  };

  return (
    <div className={styles.container} style={{ top, left, right, bottom }}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles["modal-header"]}>
          {title}
          <div>
            {extraButton}
            <Button
              color={open ? "red" : "blue"}
              shape="circle"
              onClick={handleButtonClick}
            >
              {open ? <IconMinus /> : <IconPlus />}
            </Button>
          </div>
        </div>
        <div className={!open ? styles.hide : ""}>{children}</div>
      </div>
    </div>
  );
};
