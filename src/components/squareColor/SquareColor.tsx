import { useContext, useEffect } from "react";
import { ISqueareColor, IToolContextType } from "../../types";
import { ToolContext } from "../../context/ToolContext";
import { normalizeColor } from "../../helper/normalizeColor";
import styles from "./SqueareColor.module.css";

export const SquareColor = ({ type, defaultColor }: ISqueareColor) => {
  const { setTool, setColor, color, colorHistory, setColorHistory } =
    useContext(ToolContext) as IToolContextType;

  useEffect(() => {
    if (colorHistory.includes(color)) return;

    const timer = setTimeout(() => {
      const newHistory = [color, ...colorHistory];
      newHistory.pop();

      setColorHistory(newHistory);
    }, 500);

    return () => clearTimeout(timer);
  }, [color]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = `#${e.target.value.replace("#", "")}`;
    setColor(`#${newColor.replace("#", "")}`);
  };

  const handleClick = () => {
    setColor(`#${defaultColor.replace("#", "")}`);
    setTool("PEN");
  };

  if (type === "dynamic")
    return (
      <label className={styles.button} style={{ backgroundColor: color }}>
        <input
          type="color"
          value={normalizeColor(color)}
          onChange={handleChange}
        ></input>
      </label>
    );

  return (
    <button
      title={defaultColor}
      style={{ backgroundColor: defaultColor }}
      onClick={handleClick}
      className={styles.button}
    ></button>
  );
};
