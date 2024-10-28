import React, { useContext, useState, useRef } from "react";
import { Stage, Layer, Text, Rect } from "react-konva";
import { CanvasContext } from "../context/canvas.context";

const EditableCanvas = ({ setSelectedIndex }) => {
  const { canvasData, updateElement, canvasHeight, canvasWidth } =
    useContext(CanvasContext);

  const [selectedIndex, setLocalSelectedIndex] = useState(null);
  const textRefs = useRef([]);

  const handleTextClick = (index) => {
    setSelectedIndex(index);
    setLocalSelectedIndex(index);
  };

  const handleStageClick = (e) => {
    if (e.target === e.target.getStage()) {
      setSelectedIndex(null);
      setLocalSelectedIndex(null);
    }
  };

  const constrainPosition = (x, y, textWidth, textHeight) => {
    let newX = Math.max(0, Math.min(x, canvasWidth - textWidth));
    let newY = Math.max(0, Math.min(y, canvasHeight - textHeight));

    return { x: Math.floor(newX), y: Math.floor(newY) };
  };

  return (
    <Stage width={canvasWidth} height={canvasHeight} onClick={handleStageClick}>
      <Layer className="stage">
        {canvasData.elements.map((element, index) => (
          <React.Fragment key={index}>
            {selectedIndex === index && textRefs.current[index] && (
              <Rect
                x={element.x - 5}
                y={element.y - 5}
                width={textRefs.current[index].width() + 10}
                height={textRefs.current[index].height() + 10}
                stroke="#40B8FF"
                strokeWidth={1}
              />
            )}
            <Text
              ref={(ref) => (textRefs.current[index] = ref)}
              text={element.text}
              x={element.x}
              y={element.y}
              fontSize={element.fontSize}
              lineHeight={1.2}
              wrap="char"
              align="left"
              draggable
              fontStyle={`${element.isBold ? "bold" : ""} ${
                element.isItalic ? "italic" : ""
              }`}
              fill={element.color}
              onClick={() => handleTextClick(index)}
              onDragMove={(e) => {
                const textWidth = textRefs.current[index].width();
                const textHeight = textRefs.current[index].height();

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
  );
};

export default EditableCanvas;
