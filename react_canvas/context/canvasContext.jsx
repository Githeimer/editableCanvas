// src/context/CanvasContext.js
import React, { createContext, useState } from "react";

const CanvasContext = createContext();

const CanvasProvider = ({ children }) => {
  const [canvasData, setCanvasData] = useState({
    title: "",
    description: "",
    elements: [],
  });
  const [selectedElement, setSelectedElement] = useState(null); // New state for selected element

  const addElement = (element) => {
    setCanvasData((prev) => ({
      ...prev,
      elements: [...prev.elements, element],
    }));
  };

  const updateElement = (index, updatedElement) => {
    setCanvasData((prev) => {
      const elements = [...prev.elements];
      elements[index] = updatedElement;
      return { ...prev, elements };
    });
  };

  return (
    <CanvasContext.Provider
      value={{
        canvasData,
        addElement,
        updateElement,
        selectedElement,
        setSelectedElement,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export { CanvasProvider, CanvasContext };
