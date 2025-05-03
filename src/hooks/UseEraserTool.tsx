import { useContext } from "react";
import { CanvasContext } from "../context/CanvasContext";
import { ICanvasContextType, IToolContextType } from "../types";
import { ToolContext } from "../context/ToolContext";

export const UseEraserTool = () => {
  const { ctx, mousePosition, viewportPosition, bufferCtx } = useContext(
    CanvasContext
  ) as ICanvasContextType;
  const { tool } = useContext(ToolContext) as IToolContextType;

  const onMouseDown = () => {
    if (tool !== "ERASER") return;
    if (!ctx) return;
    ctx.clearRect(
      mousePosition.x - viewportPosition.x,
      mousePosition.y - viewportPosition.y,
      1,
      1
    );

    // buffer ctx
    if (!bufferCtx) return;
    bufferCtx.clearRect(
      mousePosition.x - viewportPosition.x,
      mousePosition.y - viewportPosition.y,
      1,
      1
    );
  };

  const onMouseMove = () => {
    if (tool !== "ERASER") return;
    if (!ctx) return;
    ctx.clearRect(
      mousePosition.x - viewportPosition.x,
      mousePosition.y - viewportPosition.y,
      1,
      1
    );

    // buffer ctx
    if (!bufferCtx) return;
    bufferCtx.clearRect(
      mousePosition.x - viewportPosition.x,
      mousePosition.y - viewportPosition.y,
      1,
      1
    );
  };

  return { eraserDown: onMouseDown, eraserMove: onMouseMove };
};
