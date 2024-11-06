import React, { useContext, useState } from "react";
import EditableCanvas from "./EditableCanvas";
import PropertiesBox from "./PropertiesBox";
import { CanvasContext } from "../context/canvas.context";
import { jsPDF } from "jspdf";

const CanvasContainer = () => {
  const {
    addElement,
    setHeight,
    setWidth,
    canvasWidth,
    canvasHeight,
    addTitle,
    addTheme,
    addDescription,
    saveCanvasToFile,
  } = useContext(CanvasContext);

  const [usertext, setUserText] = useState("New Text");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [theme, setTheme] = useState("");
  const [imageDataURL, setImageDataURL] = useState(null);

  const handleExportImage = (dataURL) => {
    setImageDataURL(dataURL);
  };

  // Save the canvas as PDF
  const handleSaveAsPDF = () => {
    if (!imageDataURL) {
      console.error("No image data available to save as PDF");
      return;
    }

    const pdf = new jsPDF({
      orientation: canvasWidth > canvasHeight ? "landscape" : "portrait",
      unit: "px",
      format: [canvasWidth, canvasHeight],
    });

    pdf.addImage(imageDataURL, "PNG", 0, 0, canvasWidth, canvasHeight);
    pdf.save(title);
  };
  const handleTitle = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    addTitle(newTitle);
  };

  const handleDescription = (e) => {
    const newDescription = e.target.value;
    setDescription(newDescription);
    addDescription(newDescription);
  };

  const handleTheme = (e) => {
    const newTheme = e.target.value;
    setTheme(newTheme);
    addTheme(newTheme);
  };

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
    <>
      <div className="canvas-properties-container">
        <div className="canvas" style={{ width: canvasWidth }}>
          <EditableCanvas
            setSelectedIndex={setSelectedIndex}
            onExportImage={handleExportImage}
          />
        </div>
        <div className="properties">
          {selectedIndex !== null && (
            <PropertiesBox selectedIndex={selectedIndex} />
          )}
        </div>
      </div>

      <div className="canvas-text-container">
        <div className="canvas-title-data">
          <h2>Canvas Data:</h2>
          <div>
            <label htmlFor="title">Title: </label>
            <input onChange={handleTitle}></input>
          </div>
          <div>
            <label htmlFor="description">Description: </label>
            <input onChange={handleDescription}></input>
          </div>
          <div>
            <label htmlFor="theme">Theme:</label>
            <input onChange={handleTheme}></input>
          </div>
        </div>

        <div className="canvas-title-data">
          <h2>Canvas Elements:</h2>
          <textarea placeholder="Enter a text" onChange={changeText}></textarea>
          <button onClick={handleAddText}>Add</button>
        </div>

        <div className="canvas-title-data">
          <h2>Canvas Size:</h2>
          <input
            onChange={(e) => setWidth(Number(e.target.value))}
            placeholder="Enter width"
          />
          <input
            onChange={(e) => setHeight(Number(e.target.value))}
            placeholder="Enter height"
          />
        </div>
        <button onClick={saveCanvasToFile}>Save Canvas</button>
        <button onClick={handleSaveAsPDF}>Save as PDF</button>
      </div>
    </>
  );
};

export default CanvasContainer;
