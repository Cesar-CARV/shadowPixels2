import React from "react";
import { createPortal } from "react-dom";
import { Button } from "../buttons/Button";
import { IconMinus } from "../../icons/IconMinus";
import styles from "./Modal.module.css";
import { IModal } from "../../types";

const MODAL_ROOT = document.getElementById("modal-root") as HTMLElement;

export const Modal = ({
  open,
  close,
  title,
  extraButton,
  children,
}: IModal) => {
  
  if (!open) return;

  const handleClick = (e: React.MouseEvent<HTMLDialogElement, MouseEvent>) => {
    e.stopPropagation();
    close();
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    close();
  };

  return createPortal(
    <dialog open className={styles.container} onClick={handleClick}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles["modal-header"]}>
          {title}
          <div>
            {extraButton}
            <Button color="red" shape="circle" onClick={handleButtonClick}>
              <IconMinus></IconMinus>
            </Button>
          </div>
        </div>
        <div className={styles["modal-container"]}>{children}</div>
      </div>
    </dialog>,
    MODAL_ROOT
  );
};
