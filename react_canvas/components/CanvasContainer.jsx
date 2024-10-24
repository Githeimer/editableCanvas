import React, { useContext, useState } from "react";
import EditableCanvas from "./EditableCanvas";
import PropertiesBox from "./PropertiesBox";
import { CanvasContext } from "../context/canvas.context";

const CanvasContainer = () => {
  const { addElement } = useContext(CanvasContext);
  const [usertext, setUserText] = useState("New Text");
  const [selectedIndex, setSelectedIndex] = useState(null); // For element selection

  const changeText = (e) => {
    setUserText(e.target.value);
  };

  const handleAddText = () => {
    const newElement = {
      text: usertext,
      x: 0,
      y: 100,
      fontSize: 20,
      isBold: false,
      isItalic: false,
      color: "#000000",
    };
    addElement(newElement);
  };

  return (
    <div className="container">
      <div className="canvas-container">
        <EditableCanvas setSelectedIndex={setSelectedIndex} />
        <div className="canvas-text-container">
          <textarea placeholder="Enter a text" onChange={changeText}></textarea>
          <button onClick={handleAddText}>Add</button>
        </div>
      </div>
      {/* Render PropertiesBox conditionally based on selection */}
      {selectedIndex !== null && (
        <PropertiesBox selectedIndex={selectedIndex} />
      )}
    </div>
  );
};

export default CanvasContainer;
