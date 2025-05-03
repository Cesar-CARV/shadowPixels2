import { useContext } from "react";
import { CanvasContext } from "../context/CanvasContext";
import { ICanvasContextType, IToolContextType } from "../types";
import { ToolContext } from "../context/ToolContext";

export const UsePenTool = () => {
  const { ctx, width, height, mousePosition, viewportPosition, bufferCtx } =
    useContext(CanvasContext) as ICanvasContextType;
  const { tool, color } = useContext(ToolContext) as IToolContextType;

  const onMouseDown = () => {
    if (tool !== "PEN") return;
    if (!ctx) return;
    if (
      !(
        mousePosition.x >= 0 + viewportPosition.x &&
        mousePosition.x < width + viewportPosition.x &&
        mousePosition.y >= 0 + viewportPosition.y &&
        mousePosition.y < height + viewportPosition.y
      )
    )
      return;

    // canvas
    ctx.fillStyle = color;
    ctx.fillRect(
      mousePosition.x - viewportPosition.x,
      mousePosition.y - viewportPosition.y,
      1,
      1
    );
    ctx.fillStyle = "#000";

    // buffer ctx
    if (!bufferCtx) return;
    bufferCtx.fillStyle = color;
    bufferCtx.fillRect(
      mousePosition.x - viewportPosition.x,
      mousePosition.y - viewportPosition.y,
      1,
      1
    );
    bufferCtx.fillStyle = "#000";
  };

  const onMouseMove = () => {
    if (tool !== "PEN") return;
    if (!ctx) return;
    if (
      !(
        mousePosition.x >= 0 + viewportPosition.x &&
        mousePosition.x < width + viewportPosition.x &&
        mousePosition.y >= 0 + viewportPosition.y &&
        mousePosition.y < height + viewportPosition.y
      )
    )
      return;

    // canvas
    ctx.fillStyle = color;
    ctx.fillRect(
      mousePosition.x - viewportPosition.x,
      mousePosition.y - viewportPosition.y,
      1,
      1
    );
    ctx.fillStyle = "#000";

    // buffer ctx
    if (!bufferCtx) return;
    bufferCtx.fillStyle = color;
    bufferCtx.fillRect(
      mousePosition.x - viewportPosition.x,
      mousePosition.y - viewportPosition.y,
      1,
      1
    );
    bufferCtx.fillStyle = "#000";
  };

  return { penDown: onMouseDown, penMove: onMouseMove };
};
