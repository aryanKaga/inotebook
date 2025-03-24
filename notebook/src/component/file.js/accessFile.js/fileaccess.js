import React, { useState } from "react";
import { FaGlobe, FaUserLock, FaLock, FaTimes } from "react-icons/fa";
import "./FileAccessOptions.css";
import shiftAccess from "./shiftAccess";

export const FileAccessOptions = ({ setservice }) => {
  const [selected, setSelected] = useState("public");
  const [message, setMessage] = useState(null);

  const handleSetAccess = async () => {
    try {
      const success = await shiftAccess({ selected });
      console.log('success is'+success);
      if (success) {
        setMessage({ type: "success", text: "Access updated successfully!" });
      } else {
        setMessage({ type: "error", text: "Failed to update access!" });
      }
      setTimeout(()=>{
        setservice('canvas')
      },2000);
    } catch (error) {
      setMessage({ type: "error", text: "An error occurred!" });
      console.error(error);
    }
  };

  return (
    <div className="parent-container">
      <div className="file-access-container">
        {/* Close Button */}
        <button className="close-button" onClick={() => setservice("canvas")}>
          <FaTimes />
        </button>

        {/* Public Option */}
        <div
          className={`option ${selected === "public" ? "active" : ""}`}
          onClick={() => setSelected("public")}
        >
          <div className="option-header">
            <FaGlobe className="icon" />
            <span className="option-text">Public</span>
          </div>
          <p className="description">
            Files in the Public category can be read by anyone. Access is granted by keys only.
          </p>
        </div>

        {/* Private Option */}
        <div
          className={`option ${selected === "private" ? "active" : ""}`}
          onClick={() => setSelected("private")}
        >
          <div className="option-header">
            <FaUserLock className="icon" />
            <span className="option-text">Private</span>
          </div>
          <p className="description">
            Private files can be viewed only by your classroom members.
          </p>
        </div>

        {/* Locked Option */}
        <div
          className={`option ${selected === "locked" ? "active" : ""}`}
          onClick={() => setSelected("locked")}
        >
          <div className="option-header">
            <FaLock className="icon" />
            <span className="option-text">Locked</span>
          </div>
          <p className="description">
            Locked files are strictly restricted. Only the owner has access.
          </p>
        </div>

        {/* Set Button */}
        <button className="set-button" onClick={handleSetAccess}>SET</button>

        {/* Display Message */}
        {message && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileAccessOptions;
