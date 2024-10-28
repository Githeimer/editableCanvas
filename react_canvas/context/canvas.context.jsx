// src/context/CanvasContext.js
import React, { createContext, useState } from "react";

const CanvasContext = createContext();

const CanvasProvider = ({ children }) => {
  const [canvasWidth, setWidth] = useState(900);
  const [canvasHeight, setHeight] = useState(400);
  const [selectedElement, setSelectedElement] = useState(null); // New state for selected element

  const [canvasData, setCanvasData] = useState({
    id: "",
    title: "",
    description: "",
    theme: "",
    height: 400,
    width: 900,
    elements: [],
  });

  const addTitle = (title_text) => {
    setCanvasData((prev) => ({
      ...prev,
      title: title_text,
    }));
  };

  const addDescription = (description_text) => {
    setCanvasData((prev) => ({
      ...prev,
      description: description_text,
    }));
  };

  const addTheme = (theme_text) => {
    setCanvasData((prev) => ({
      ...prev,
      theme: theme_text,
    }));
  };

  const addElement = (element) => {
    setCanvasData((prev) => ({
      ...prev,
      elements: [...prev.elements, element],
    }));
  };

  const updateSize = (height, width) => {
    setCanvasData((prev) => ({
      ...prev,
      height,
      width,
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

  const saveCanvasToFile = () => {
    const canvasDataToSave = {
      ...canvasData,
      width: canvasWidth,
      height: canvasHeight,
    };

    const dataStr = JSON.stringify(canvasDataToSave, null, 2);

    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "canvas_data.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
        canvasHeight,
        canvasWidth,
        setHeight,
        setWidth,
        saveCanvasToFile,
        addTitle,
        addTheme,
        addDescription,
        updateSize,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export { CanvasProvider, CanvasContext };
