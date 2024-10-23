import React from "react";
import { CanvasProvider } from "../context/canvasContext";
import CanvasContainer from "./canvasContainer";

const Canvas = () => {
  return (
    <CanvasProvider>
      <CanvasContainer />
    </CanvasProvider>
  );
};

export default Canvas;
