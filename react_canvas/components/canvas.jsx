import React from "react";
import { CanvasProvider } from "../context/canvas.context";
import CanvasContainer from "./canvasContainer";

const Canvas = () => {
  return (
    <CanvasProvider>
      <CanvasContainer />
    </CanvasProvider>
  );
};

export default Canvas;
