import { useContext, useEffect, useState } from "react";
import { CanvasContext } from "../context/CanvasContext";
import { ICanvasContextType, IToolContextType } from "../types";
import { ToolContext } from "../context/ToolContext";

// ! ARREGLAR ERRORES

export const UseHandTool = () => {
  const {
    ctx,
    canvasRef,
    mousePosition,
    width,
    height,
    viewportPosition,
    scale,
    setViewportPosition,
  } = useContext(CanvasContext) as ICanvasContextType;
  const { tool } = useContext(ToolContext) as IToolContextType;

  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [initPosition, setInitPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [data, setData] = useState<ImageData | null>(null);

  useEffect(() => {
    if (!data || !ctx) return;

    ctx?.resetTransform();
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx?.scale(scale, scale);
    ctx?.translate(viewportPosition.x, viewportPosition.y);

    ctx?.putImageData(
      data,
      viewportPosition.x * scale,
      viewportPosition.y * scale
    );
  }, [viewportPosition]);

  const onMouseDown = () => {
    if (tool !== "HAND") return;
    if (!ctx) return;

    setData(
      ctx.getImageData(
        viewportPosition.x * scale,
        viewportPosition.y * scale,
        width * scale,
        height * scale
      )
    );
    setDragStart(mousePosition);
    setInitPosition(viewportPosition);

    if (!canvasRef.current) return;
    canvasRef.current.style.cursor = "grabbing";
  };

  const onMouseUp = () => {
    if (tool !== "HAND") return;
    setData(null);

    if (!canvasRef.current) return;
    canvasRef.current.style.cursor = "grab";
  };

  const onMouseMove = () => {
    if (tool !== "HAND") return;
    if (!ctx || !data) return;

    const newPosition = {
      x: mousePosition.x + initPosition.x - dragStart.x,
      y: mousePosition.y + initPosition.y - dragStart.y,
    };

    // check if new position is diferent to viewportPosition
    if (
      viewportPosition.x !== newPosition.x ||
      viewportPosition.y !== newPosition.y
    ) {
      setViewportPosition(newPosition);
    }
  };

  return { handDown: onMouseDown, handUp: onMouseUp, handMove: onMouseMove };
};
