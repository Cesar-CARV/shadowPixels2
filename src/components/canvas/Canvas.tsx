import React, { useContext, useEffect, useState } from "react";
import { CanvasContext } from "../../context/CanvasContext";
import { ToolContext } from "../../context/ToolContext";
import { ICanvasContextType, IToolContextType } from "../../types";
import { useWindowSize } from "../../hooks/UseWindowSize";
import { UsePenTool } from "../../hooks/UsePenTool";
import { UseEraserTool } from "../../hooks/UseEraserTool";
import { UsePickerTool } from "../../hooks/UsePickerTool";
import { UseHandTool } from "../../hooks/UseHandTool";
import { UseZoomTool } from "../../hooks/UseZoomTool";
import styles from "./Canvas.module.css";

export const Canvas = () => {
  // ? CONTEXT
  const {
    currentFrame,
    scale,
    width,
    height,
    canvasRef,
    ctx,
    setCtx,
    viewportPosition,
    setMousePosition,
    mousePosition,
    bufferCtx,
  } = useContext(CanvasContext) as ICanvasContextType;
  const { tool, setTool } = useContext(ToolContext) as IToolContextType;

  // ? TOOLS
  const { penDown, penMove } = UsePenTool();
  const { eraserDown, eraserMove } = UseEraserTool();
  const { pickerDown } = UsePickerTool();
  const { zoomDown } = UseZoomTool();
  const { handDown, handUp, handMove } = UseHandTool();

  // ? STATES
  const [press, setPress] = useState(false);
  const [synchronized, setSynchronized] = useState(true);
  const windowSize = useWindowSize();

  //#region EFFECTS
  // set cursors
  useEffect(() => {
    if (!canvasRef.current) return;

    switch (tool) {
      case "PEN":
        canvasRef.current.style.cursor = "cell";
        break;
      case "ERASER":
        canvasRef.current.style.cursor = "no-drop";
        break;
      case "PICKER":
        canvasRef.current.style.cursor = "crosshair";
        break;
      case "HAND":
        canvasRef.current.style.cursor = "grab";
        break;
      case "SQUEARE":
        break;
      case "CIRCLE":
        break;
      case "LINE":
        break;
      case "ZOOM":
        canvasRef.current.style.cursor = "zoom-in";
        break;
      default:
        canvasRef.current.style.cursor = "cell";
        break;
    }
  }, [tool]);

  // init canvas
  useEffect(() => {
    if (!canvasRef.current) return;

    // reset canvas
    canvasRef.current.width = 0;
    canvasRef.current.height = 0;

    // set new size
    const canvasParent = canvasRef.current.parentElement;
    if (!canvasParent) return;
    canvasRef.current.width = canvasParent?.getBoundingClientRect().width - 5;
    canvasRef.current.height = canvasParent?.getBoundingClientRect().height - 5;

    // Start context
    const newctx = canvasRef.current.getContext("2d");
    newctx?.scale(scale, scale);
    newctx?.translate(viewportPosition.x, viewportPosition.y);
    if (newctx) {
      newctx.imageSmoothingEnabled = false;
    }
    setCtx(newctx);

    if (!bufferCtx) return;
  }, [windowSize.width]);

  // re-render
  useEffect(() => {
    if (!bufferCtx || !canvasRef.current) return;

    const backup = new Image();
    backup.src = bufferCtx.canvas.toDataURL();
    ctx?.resetTransform();
    ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx?.scale(scale, scale);
    ctx?.translate(viewportPosition.x, viewportPosition.y);
    ctx?.drawImage(backup, 0, 0, width, height, 0, 0, width, height);
    setSynchronized(true);
  }, [
    currentFrame,
    synchronized,
    scale,
    viewportPosition,
    windowSize.width,
    width,
    height,
  ]);
  //#endregion

  // render
  const render = () => {
    if (!bufferCtx || !canvasRef.current) return;

    console.log("manual re-render");
    const backup = new Image();
    backup.src = bufferCtx.canvas.toDataURL();
    ctx?.resetTransform();
    ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx?.scale(scale, scale);
    ctx?.translate(viewportPosition.x, viewportPosition.y);
    ctx?.drawImage(backup, 0, 0, width, height, 0, 0, width, height);
    setSynchronized(true);
  };

  //#region HANDLES
  const handleMouseDown = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (e.button === 0) {
      setPress(true);
      penDown();
      eraserDown();
      pickerDown();
      handDown();
      zoomDown(e);
    }
  };

  const handleMouseUp = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (e.button === 0) {
      setPress(false);
      handUp();

      if (tool === "HAND" || tool === "ZOOM") {
        setSynchronized(false);
      }
    }
  };

  const handleMove = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (!canvasRef.current) return;

    const newPosition = {
      x: Math.floor(
        (e.clientX - canvasRef.current.getBoundingClientRect().left) / scale
      ),
      y: Math.floor(
        (e.clientY - canvasRef.current.getBoundingClientRect().top) / scale
      ),
    };

    // draw
    if (press) {
      penMove();
      eraserMove();
      handMove();
    }

    setMousePosition(newPosition);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLCanvasElement>) => {
    // select pen
    if (e.key === "w" || e.key === "W") {
      setTool("PEN");
    }

    // select eraser
    if (e.key === "e" || e.key === "E") {
      setTool("ERASER");
    }

    // select hand
    if (e.key === "s" || e.key === "S") {
      setTool("HAND");
    }

    // select zoom
    if (e.key === "d" || e.key === "D") {
      setTool("ZOOM");
    }

    // select color picker
    if (e.key === "a" || e.key === "A") {
      setTool("PICKER");
    }

    // re-render canvas data
    if (e.key === "r" || e.key === "R") {
      render();
    }
  };
  //#endregion

  return (
    <div className={styles.container}>
      <div
        style={{
          width: scale * (width ? width : 1),
          height: scale * (height ? height : 1),
          top: viewportPosition.y * scale,
          left: viewportPosition.x * scale,
        }}
        className={styles["canvas-background"]}
      ></div>
      <canvas
        ref={canvasRef}
        tabIndex={-1}
        className={styles.canvas}
        onMouseMove={handleMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onContextMenu={(e) => e.preventDefault()}
        onKeyDown={handleKeyDown}
      ></canvas>
      {/* cords tag */}
      <span className={styles["canvas-tag"]}>
        {`X:${mousePosition.x - viewportPosition.x} Y:${
          mousePosition.y - viewportPosition.y
        } | ${tool} | Zoom ${scale}%`}
      </span>
    </div>
  );
};
