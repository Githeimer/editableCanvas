import React, { useContext, useState, useEffect } from "react";
import { CanvasContext } from "../context/canvas.context.jsx";

const PropertiesBox = ({ selectedIndex }) => {
  const { canvasData, updateElement, deleteElement } =
    useContext(CanvasContext);

  // Default empty element to prevent early return issues
  const selectedElement =
    selectedIndex !== null &&
    selectedIndex >= 0 &&
    selectedIndex < canvasData.elements.length
      ? canvasData.elements[selectedIndex]
      : null;

  const [textBold, setTextBold] = useState(false);
  const [textItalic, setTextItalic] = useState(false);
  const [textValue, setTextValue] = useState("");
  const [colorValue, setColorValue] = useState(
    selectedElement?.color || "#000000"
  );
  useEffect(() => {
    if (selectedElement) {
      setTextValue(selectedElement.text || "");
      setTextBold(selectedElement.isBold || false);
      setTextItalic(selectedElement.isItalic || false);
    }
  }, [selectedElement]);

  const handleBoldChange = (e) => {
    setTextBold(e.target.checked);
    if (selectedElement) {
      const updatedElement = {
        ...selectedElement,
        isBold: e.target.checked,
      };
      updateElement(selectedIndex, updatedElement);
    }
  };

  const handleItalicChange = (e) => {
    setTextItalic(e.target.checked);
    if (selectedElement) {
      const updatedElement = {
        ...selectedElement,
        isItalic: e.target.checked,
      };
      updateElement(selectedIndex, updatedElement);
    }
  };

  const handleColorChange = (e) => {
    setColorValue(e.target.value);
    if (selectedElement) {
      const updatedElement = {
        ...selectedElement,
        color: `${e.target.value}`,
      };
      updateElement(selectedIndex, updatedElement);
    }
  };

  const handlePositionChange = (e, axis) => {
    if (selectedElement) {
      const updatedElement = {
        ...selectedElement,
        [axis]: Number(e.target.value),
      };
      updateElement(selectedIndex, updatedElement);
    }
  };

  const handleTextChange = (e) => {
    if (selectedElement) {
      const updatedElement = {
        ...selectedElement,
        text: e.target.value,
      };
      setTextValue(e.target.value);
      updateElement(selectedIndex, updatedElement);
    }
  };

  if (!selectedElement) {
    return (
      <div className="properties-box">No element selected or invalid index</div>
    );
  }

  return (
    <div className="properties-box">
      <h3>Properties</h3>
      <div>
        <label>Edit Text: </label>
        <textarea
          value={textValue}
          onChange={handleTextChange}
          rows={4}
          style={{ whiteSpace: "pre-wrap" }}
        />
      </div>
      <div>
        <label>X Position:</label>
        <input
          type="number"
          value={selectedElement.x}
          onChange={(e) => handlePositionChange(e, "x")}
        />
      </div>
      <div>
        <label>Y Position:</label>
        <input
          type="number"
          value={selectedElement.y}
          onChange={(e) => handlePositionChange(e, "y")}
        />
      </div>
      <div>
        <label>Font Size:</label>
        <input
          type="number"
          value={selectedElement.fontSize}
          onChange={(e) =>
            updateElement(selectedIndex, {
              ...selectedElement,
              fontSize: Number(e.target.value),
            })
          }
        />
      </div>
      <div>
        <label htmlFor="bold">Bold</label>
        <input
          type="checkbox"
          id="bold"
          checked={textBold}
          onChange={handleBoldChange}
        />
      </div>
      <div>
        <label htmlFor="italic">Italic</label>
        <input
          type="checkbox"
          id="italic"
          checked={textItalic}
          onChange={handleItalicChange}
        />
      </div>
      <div>
        <input type="color" onChange={handleColorChange} value={colorValue} />
      </div>
      <div>
        <button onClick={() => deleteElement(selectedIndex)}>
          Delete Element
        </button>
      </div>
    </div>
  );
};

export default PropertiesBox;
