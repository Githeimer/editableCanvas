import React, { useContext, useState, useRef } from "react";
import { Stage, Layer, Text, Rect } from "react-konva";
import { CanvasContext } from "../context/canvas.context";

const EditableCanvas = ({ setSelectedIndex }) => {
  const { canvasData, updateElement } = useContext(CanvasContext);
  const [canvasWidth, setWidth] = useState(400);
  const [canvasHeight, setHeight] = useState(300);
  const [selectedIndex, setLocalSelectedIndex] = useState(null);
  const textRefs = useRef([]); // Store references to Text elements

  const handleTextClick = (index) => {
    setSelectedIndex(index);
    setLocalSelectedIndex(index);
  };

  const handleStageClick = (e) => {
    if (e.target === e.target.getStage()) {
      setSelectedIndex(null);
      setLocalSelectedIndex(null); // Deselect text
    }
  };

  const constrainPosition = (x, y, textWidth, textHeight) => {
    let newX = x;
    if (newX < 0) newX = 0;
    if (newX + textWidth > canvasWidth) newX = canvasWidth - textWidth;

    let newY = y;
    if (newY < 0) newY = 0;
    if (newY + textHeight > canvasHeight) newY = canvasHeight - textHeight;

    return { x: newX, y: newY };
  };

  return (
    <>
      <Stage
        width={canvasWidth}
        height={canvasHeight}
        onClick={handleStageClick}
      >
        <Layer>
          {canvasData.elements.map((element, index) => (
            <React.Fragment key={index}>
              {selectedIndex === index && textRefs.current[index] && (
                <Rect
                  x={element.x - 5}
                  y={element.y - 5}
                  width={textRefs.current[index].width() + 10} // Use actual width from Text reference
                  height={textRefs.current[index].height() + 10} // Use actual height for multi-line text
                  stroke="#40B8FF"
                  strokeWidth={1}
                />
              )}
              <Text
                ref={(ref) => (textRefs.current[index] = ref)} // Store the reference for width and height calculation
                text={element.text}
                x={element.x}
                y={element.y}
                fontSize={element.fontSize}
                lineHeight={1.2} // Adjust line height for multi-line spacing
                wrap="char" // Enable wrapping by characters
                align="left" // Maintain left alignment
                draggable
                onClick={() => handleTextClick(index)}
                onDragMove={(e) => {
                  const textWidth = textRefs.current[index].width();
                  const textHeight = textRefs.current[index].height(); // Multi-line height

                  const newPos = constrainPosition(
                    e.target.x(),
                    e.target.y(),
                    textWidth,
                    textHeight
                  );

                  e.target.x(newPos.x);
                  e.target.y(newPos.y);
                }}
                onDragEnd={(e) => {
                  const textWidth = textRefs.current[index].width();
                  const textHeight = textRefs.current[index].height();

                  const newPos = constrainPosition(
                    e.target.x(),
                    e.target.y(),
                    textWidth,
                    textHeight
                  );

                  const newElement = {
                    ...element,
                    x: newPos.x,
                    y: newPos.y,
                  };
                  updateElement(index, newElement);
                }}
              />
            </React.Fragment>
          ))}
        </Layer>
      </Stage>

      <input
        onChange={(e) => setWidth(Number(e.target.value))}
        placeholder="Enter width"
      />
      <input
        onChange={(e) => setHeight(Number(e.target.value))}
        placeholder="Enter height"
      />
    </>
  );
};

export default EditableCanvas;
