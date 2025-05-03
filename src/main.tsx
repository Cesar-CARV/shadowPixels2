import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { CanvasContextProvider } from "./context/CanvasContext";
import { ToolContextProvider } from "./context/ToolContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CanvasContextProvider>
      <ToolContextProvider>
        <App />
      </ToolContextProvider>
    </CanvasContextProvider>
  </StrictMode>
);
