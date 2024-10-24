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

  const deleteElement = (index) => {
    console.log("Deleting element at index:", index);
    setCanvasData((prev) => {
      const updatedElements = prev.elements.filter((_, i) => i !== index);
      return { ...prev, elements: updatedElements };
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
        deleteElement,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export { CanvasProvider, CanvasContext };
