import React from "react";

export interface ICanvasContextType {
  maxScale: number;
  maxSize: number;
  frames: string[];
  currentFrame: number;
  fps: number;
  scale: number;
  width: number;
  height: number;
  ctx: CanvasRenderingContext2D | null;
  mousePosition: { x: number; y: number };
  viewportPosition: { x: number; y: number };
  bufferCanvas: HTMLCanvasElement | null;
  bufferCtx: CanvasRenderingContext2D | null;
  setBufferCanvas: React.Dispatch<React.SetStateAction<HTMLCanvasElement | null>>;
  setBufferCtx: React.Dispatch<
    React.SetStateAction<CanvasRenderingContext2D | null>
  >;
  setFrames: React.Dispatch<React.SetStateAction<string[]>>;
  setCurrentFrame: React.Dispatch<React.SetStateAction<number>>;
  setFps: React.Dispatch<React.SetStateAction<number>>;
  setScale: React.Dispatch<React.SetStateAction<number>>;
  setWidth: React.Dispatch<React.SetStateAction<number>>;
  setHeight: React.Dispatch<React.SetStateAction<number>>;
  setCtx: React.Dispatch<React.SetStateAction<CanvasRenderingContext2D | null>>;
  setMousePosition: React.Dispatch<
    React.SetStateAction<{
      x: number;
      y: number;
    }>
  >;
  setViewportPosition: React.Dispatch<
    React.SetStateAction<{
      x: number;
      y: number;
    }>
  >;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

export interface IToolContextType {
  tool:
    | "PEN"
    | "PICKER"
    | "ERASER"
    | "SQUEARE"
    | "CIRCLE"
    | "LINE"
    | "HAND"
    | "ZOOM";
  color: `#${string}`;
  colorHistory: string[];
  setTool: React.Dispatch<
    React.SetStateAction<
      | "PEN"
      | "PICKER"
      | "ERASER"
      | "SQUEARE"
      | "CIRCLE"
      | "LINE"
      | "HAND"
      | "ZOOM"
    >
  >;
  setColor: React.Dispatch<React.SetStateAction<`#${string}`>>;
  setColorHistory: React.Dispatch<React.SetStateAction<string[]>>;
}

export interface IButton {
  children: React.ReactNode;
  title?: string;
  color: "grey" | "blue" | "red" | "yellow" | "green";
  type?: "button" | "submit" | "reset";
  shape?: "circle" | "square";
  shortcut?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface IButtonLink {
  children: React.ReactNode;
  href: string;
  title?: string;
  color: "grey" | "blue" | "red" | "yellow" | "green";
  target: "_blank" | "_self";
  shape?: "circle" | "square";
}

export interface ISqueareColor {
  type: "dynamic" | "static";
  defaultColor: `#${string}`;
}

export interface IInput {
  title: string;
  placehoder?: string;
  type: "text" | "number";
  max?: number;
  min?: number;
  value: string | number | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface IModal {
  open: boolean;
  close: () => void;
  title: string;
  extraButton?: React.ReactNode;
  children: React.ReactNode;
}

export interface IModalFloat {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  title: string;
  extraButton?: React.ReactNode;
  children: React.ReactNode;
}

export interface IIconBase {
  children?: React.ReactNode;
  size?: number;
  color?: `#${string}`;
}

export type IIcon = Omit<IIconBase, "children">;

export interface IToolProps {
  ctx: CanvasRenderingContext2D;
  mousePosition: { x: number; y: number };
  color: `#${string}`;
  scale: number;
}
