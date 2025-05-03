import { useContext } from "react";
import { Button } from "../buttons/Button";
import { ToolContext } from "../../context/ToolContext";
import { ICanvasContextType, IToolContextType } from "../../types";
import { IconPen } from "../../icons/IconPen";
import { IconEraser } from "../../icons/IconEraser";
import { IconHand } from "../../icons/IconHand";
import { IconPicker } from "../../icons/IconPicker";
import { SquareColor } from "../squareColor/SquareColor";
import styles from "./SideMenu.module.css";
import { IconZoom } from "../../icons/IconZoom";
import { CanvasContext } from "../../context/CanvasContext";
import { IconCenter } from "../../icons/IconCenter";

export const SideMenu = () => {
  const { tool, setTool, colorHistory } = useContext(
    ToolContext
  ) as IToolContextType;
  const { setViewportPosition } = useContext(
    CanvasContext
  ) as ICanvasContextType;

  return (
    <div className={styles.sidemenu}>
      {/* TOOLS */}
      <div className={styles.tools}>
        <Button
          color={tool === "PEN" ? "blue" : "grey"}
          shape="square"
          onClick={() => setTool("PEN")}
          shortcut="w"
          title="Pen"
        >
          <IconPen size={16}></IconPen>
        </Button>

        <Button
          color={tool === "ERASER" ? "blue" : "grey"}
          shape="square"
          onClick={() => setTool("ERASER")}
          shortcut="e"
          title="Eraser"
        >
          <IconEraser size={16}></IconEraser>
        </Button>

        <Button
          color={tool === "PICKER" ? "blue" : "grey"}
          shape="square"
          onClick={() => setTool("PICKER")}
          shortcut="a"
          title="Color picker"
        >
          <IconPicker size={16} />
        </Button>

        <Button
          color={tool === "HAND" ? "blue" : "grey"}
          shape="square"
          onClick={() => setTool("HAND")}
          shortcut="s"
          title="Hand"
        >
          <IconHand size={16} />
        </Button>

        <Button
          color={tool === "ZOOM" ? "blue" : "grey"}
          shape="square"
          onClick={() => setTool("ZOOM")}
          shortcut="d"
          title="Zoom in | + shift Zoom out"
        >
          <IconZoom size={16} />
        </Button>

        {/* Restart viewport position button */}
        <Button
          color="grey"
          shape="square"
          onClick={() => setViewportPosition({ x: 0, y: 0 })}
          title="Move to 0,0"
        >
          <IconCenter size={16} />
        </Button>

        {/* LINE */}
        <span className={styles.line}></span>
      </div>

      <div className={styles.colors}>
        {/* DYNAMIC COLOR */}
        <SquareColor type="dynamic" defaultColor="#fff"></SquareColor>

        {/* LINE */}
        <span className={styles.line}></span>

        {/* COLORS */}
        {colorHistory.map((color, i) => (
          <SquareColor
            key={color.replace("#", "") + "_" + i}
            type="static"
            defaultColor={`#${color.replace("#", "")}`}
          />
        ))}
      </div>
    </div>
  );
};
