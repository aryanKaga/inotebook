import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Line } from "react-konva";
import tool from "./globalTool"; // Ensure correct import
import CustomCursor from "./cursor/cursor";
import { canvasInfo } from "./globalTool";
import { useSaveFile } from "./customHooks/savefile_context";
import { useService } from "./customHooks/customMove";
export default function FreehandCanvas() {

  
  const { save_status, set_saveStatus } = useSaveFile();
  const [lines, setLines] = useState(canvasInfo.CanvasLines); // Stores drawn lines
  const [canvasSize, setCanvasSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  }); // Handle resizing
  const isDrawing = useRef(false); // Track drawing state
  const [Save, setSave] = useState(false); // Track Save state

  const{setService}=useService();



  // Function to save canvas data
  function saveCanvas() {
    console.log("Canvas Saved");
    canvasInfo.save(lines);
    set_saveStatus(false);
    console.log(canvasInfo.CanvasLines);
  }

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setCanvasSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); // Cleanup listener
  }, []);

  // Trigger save when save_status is true
  useEffect(() => {
    if (save_status) {
      saveCanvas();
    }
    console.log('save status changed');
  }, [save_status]);

  // Trigger save when Save state changes
  useEffect(() => {
    if (Save) {
      saveCanvas();
      setSave(false); // Reset Save state
    }
  }, [Save]);

  // Start Drawing
  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();

    setLines((prevLines) => [
      ...prevLines,
      {
        points: [pos.x, pos.y],
        toolType: tool.toolType,
        color: tool.toolColor,
        size: tool.toolSize // Store size at creation
      }
    ]);
  };

  // Continue Drawing
  const handleMouseMove = (e) => {
    if (!isDrawing.current) return;
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();

    setLines((prevLines) => {
      const newLines = [...prevLines];
      newLines[newLines.length - 1] = {
        ...newLines[newLines.length - 1],
        points: [...newLines[newLines.length - 1].points, point.x, point.y]
      };
      return newLines;
    });
  };

  // Stop Drawing
  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  return (
    <>
      <div id="writing_pad" style={{ width: "100%", height: "100vh" }}>
        <Stage
          width={canvasSize.width}
          height={canvasSize.height}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <Layer>
            {lines.map((line, i) => (
              <Line
                key={i}
                points={line.points}
                stroke={line.toolType === "eraser" ? "black" : line.color}
                strokeWidth={line.toolType === "eraser" ? 5 * line.size : line.size}
                tension={0.5}
                lineCap="round"
                lineJoin="round"
                globalCompositeOperation={line.toolType === "eraser" ? "destination-out" : "source-over"}
              />
            ))}
          </Layer>
        </Stage>
      </div>
      <CustomCursor />
    </>
  );
}
