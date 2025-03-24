import React, { useState, useEffect } from "react";
import "./cursor.css";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener("mousemove", moveCursor);
    return () => document.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    
      <div className="custom-cursor" style={{ left: `${position.x}px`, top: `${position.y}px` }}></div>
      
   
  );
}
