import { useContext } from "react";
import { CanvasContext } from "../context/CanvasContext";
import { ICanvasContextType, IToolContextType } from "../types";
import { ToolContext } from "../context/ToolContext";

export const UseZoomTool = () => {
  const {
    ctx,
    mousePosition,
    scale,
    maxScale,
    setScale,
    viewportPosition,
    setViewportPosition,
    width,
    height,
  } = useContext(CanvasContext) as ICanvasContextType;
  const { tool } = useContext(ToolContext) as IToolContextType;

  const onMouseDown = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (tool !== "ZOOM") return;
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

    if (!e.shiftKey) {
      let newScale = scale === 1 ? scale + 9 : scale + 10;
      if (newScale > maxScale) return;
      setScale(newScale);
      setViewportPosition({
        x: Math.floor(viewportPosition.x * scale / newScale),
        y: Math.floor(viewportPosition.y * scale / newScale),
      });
    } else {
      let newScale = scale === 10 ? scale - 9 : scale - 10;
      if (newScale < 1) return;
      setScale(newScale);
      setViewportPosition({
        x: Math.floor(viewportPosition.x * scale / newScale),
        y: Math.floor(viewportPosition.y * scale / newScale),
      });
    }
  };

  return { zoomDown: onMouseDown };
};
