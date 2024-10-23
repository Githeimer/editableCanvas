import React, { useContext, useState } from "react";
import EditableCanvas from "./EditableCanvas";
import PropertiesBox from "./PropertiesBox";
import { CanvasContext } from "../context/canvasContext";

const CanvasContainer = () => {
  const { addElement } = useContext(CanvasContext);
  const [usertext, setUserText] = useState("New Text");
  const [selectedIndex, setSelectedIndex] = useState(null);

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
      color: "black",
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
      <PropertiesBox selectedIndex={selectedIndex} />
    </div>
  );
};

export default CanvasContainer;
