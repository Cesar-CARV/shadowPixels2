import { useContext, useEffect, useRef, useState } from "react";
import { Input } from "../input/Input";
import { ModalFloat } from "../modalFloat/ModalFloat";
import { CanvasContext } from "../../context/CanvasContext";
import { ICanvasContextType, IToolContextType } from "../../types";
import { ToolContext } from "../../context/ToolContext";
import styles from "./SettingsModal.module.css";

export const SettingsModal = () => {
  const { bufferCtx, width, setWidth, height, setHeight, maxSize } = useContext(
    CanvasContext
  ) as ICanvasContextType;
  const {} = useContext(ToolContext) as IToolContextType;

  const canvas = useRef<HTMLCanvasElement | null>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  const [newWidth, setNewWidth] = useState(width);
  const [newHeight, setNewHeight] = useState(height);

  useEffect(() => {
    if (!canvas.current) return;
    canvas.current.width = 250;
    canvas.current.height = 140;
    setCtx(canvas.current.getContext("2d"));
  }, []);

  // Render preview
  useEffect(() => {
    if (!canvas.current || !bufferCtx) return;

    const loopID = setInterval(() => {
      if (!canvas.current || !bufferCtx) return;
      if (ctx) ctx.imageSmoothingEnabled = false;

      ctx?.clearRect(0, 0, canvas.current.width, canvas.current.height);
      const backup = new Image();
      backup.src = bufferCtx.canvas.toDataURL();
      ctx?.resetTransform();

      let scale =
        width >= height
          ? canvas.current.height / width
          : canvas.current.height / height;
      scale = scale ? scale : 1;
      ctx?.scale(scale, scale);
      ctx?.drawImage(backup, 0, 0, width, height, 0, 0, width, height);
    }, 1000 / 2);

    return () => clearInterval(loopID);
  }, [bufferCtx, width, height]);

  const handleWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = parseInt(e.target.value);
    newValue = newValue > maxSize ? maxSize : newValue;
    setNewWidth(newValue);

    if (!isNaN(newValue)) {
      setWidth(newValue);
    }
  };

  const handleHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = parseInt(e.target.value);
    newValue = newValue > maxSize ? maxSize : newValue;
    setNewHeight(newValue);

    if (!isNaN(newValue)) {
      setHeight(newValue);
    }
  };
  
  return (
    <ModalFloat title="Settings" top={16} right={16}>
      <div className={styles.content}>
        <div className={styles.canvas}>
          <div className={styles["canvas-background"]}></div>
          <canvas ref={canvas} className={styles.canvas}></canvas>
        </div>
        {/* INPUTS */}
        <Input
          type="number"
          title="Width"
          placehoder="8"
          min={1}
          max={maxSize}
          value={newWidth || ""}
          onChange={handleWidth}
        ></Input>
        <Input
          type="number"
          title="Height"
          placehoder="8"
          min={1}
          max={maxSize}
          value={newHeight || ""}
          onChange={handleHeight}
        ></Input>
      </div>
    </ModalFloat>
  );
};
