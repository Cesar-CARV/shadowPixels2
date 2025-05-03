import React, { createContext, useState } from "react";
import { IToolContextType } from "../types";

const ToolContext = createContext<null | IToolContextType>(null);

const ToolContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [tool, setTool] = useState<
    "PEN" | "PICKER" | "ERASER" | "SQUEARE" | "CIRCLE" | "LINE" | "HAND" | "ZOOM"
  >("PEN");
  const [color, setColor] = useState<`#${string}`>("#fff");
  const [colorHistory, setColorHistory] = useState<string[]>([
    "#333c46",
    "#12171d",
    "#0a0d10",
    "#0072f5",
    "#5dd400",
    "#ffc300",
    "#ffc300",
  ]);

  return (
    <ToolContext.Provider
      value={{
        tool,
        setTool,
        color,
        setColor,
        colorHistory,
        setColorHistory,
      }}
    >
      {children}
    </ToolContext.Provider>
  );
};

export { ToolContext, ToolContextProvider };
