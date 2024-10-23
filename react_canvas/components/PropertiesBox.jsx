import React, { useContext, useState } from "react";
import { CanvasContext } from "../context/canvasContext";

const PropertiesBox = ({ selectedIndex }) => {
  const { canvasData, updateElement } = useContext(CanvasContext);

  if (selectedIndex === null) {
    return <div className="properties-box">No element selected</div>;
  }

  const selectedElement = canvasData.elements[selectedIndex];
  const [textValue, setTextValue] = useState(selectedElement.text);

  const handlePositionChange = (e, axis) => {
    const updatedElement = {
      ...selectedElement,
      [axis]: Number(e.target.value),
    };
    updateElement(selectedIndex, updatedElement);
  };

  const handleTextChange = (e) => {
    const updatedElement = {
      ...selectedElement,
      text: e.target.value,
    };
    setTextValue(e.target.value);
    updateElement(selectedIndex, updatedElement);
  };

  return (
    <div className="properties-box">
      <h3>Properties</h3>
      <div>
        <label>Text (use \n for new lines):</label>
        <textarea
          value={textValue}
          onChange={handleTextChange}
          rows={4} // Allow for multiple lines
          style={{ whiteSpace: "pre-wrap" }} // Preserve white spaces and new lines
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
    </div>
  );
};

export default PropertiesBox;
