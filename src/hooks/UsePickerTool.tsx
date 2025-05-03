import { useContext} from "react";
import { CanvasContext } from "../context/CanvasContext";
import { ICanvasContextType, IToolContextType } from "../types";
import { ToolContext } from "../context/ToolContext";

export const UsePickerTool = () => {
  const { ctx, scale, mousePosition, viewportPosition, width, height } =
    useContext(CanvasContext) as ICanvasContextType;
  const { tool, setTool, setColor } = useContext(
    ToolContext
  ) as IToolContextType;


  const onMouseDown = () => {
    if (tool !== "PICKER") return;
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

    const data = ctx.getImageData(mousePosition.x * scale, mousePosition.y * scale, 1, 1).data;

    const r = data[0].toString(16).padStart(2, "0");
    const g = data[1].toString(16).padStart(2, "0");
    const b = data[2].toString(16).padStart(2, "0");

    setColor(`#${r + g + b}`);
    setTool("PEN");
  };

  return { pickerDown: onMouseDown };
};
