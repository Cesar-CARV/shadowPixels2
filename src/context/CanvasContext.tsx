import React, { createContext, useEffect, useRef, useState } from "react";
import { ICanvasContextType } from "../types";

const CanvasContext = createContext<null | ICanvasContextType>(null);

const CanvasContextProvider = ({ children }: { children: React.ReactNode }) => {
  const maxScale = 100,
    maxSize = 100;
  const [frames, setFrames] = useState<string[]>([]);
  const [currentFrame, setCurrentFrame] = useState<number>(0);
  const [fps, setFps] = useState<number>(12);
  const [scale, setScale] = useState<number>(50); // * MAX 80
  const [width, setWidth] = useState<number>(8); // * MAX 100
  const [height, setHeight] = useState<number>(8); // * MAX 100
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [viewportPosition, setViewportPosition] = useState<{
    x: number;
    y: number;
  }>({
    x: 0,
    y: 0,
  });
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const canvasRef = useRef<null | HTMLCanvasElement>(null);

  const [bufferCanvas, setBufferCanvas] = useState<HTMLCanvasElement | null>(
    null
  );
  const [bufferCtx, setBufferCtx] = useState<CanvasRenderingContext2D | null>(
    null
  );

  // init buffer
  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 100;
    canvas.height = 100;
    canvas.setAttribute("rimage-rendering", "pixelated");
    const context = canvas.getContext("2d");
    if (context) {
      context.imageSmoothingEnabled = false;
    }

    setBufferCanvas(canvas);
    setBufferCtx(context);
  }, []);

  return (
    <CanvasContext.Provider
      value={{
        maxScale,
        maxSize,
        frames,
        setFrames,
        currentFrame,
        setCurrentFrame,
        fps,
        setFps,
        scale,
        setScale,
        width,
        setWidth,
        height,
        setHeight,
        canvasRef,
        ctx,
        setCtx,
        mousePosition,
        setMousePosition,
        viewportPosition,
        setViewportPosition,
        bufferCanvas,
        setBufferCanvas,
        bufferCtx,
        setBufferCtx,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export { CanvasContext, CanvasContextProvider };
