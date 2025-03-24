import { MdOutlineRocketLaunch } from "react-icons/md";
import { BiExport } from "react-icons/bi";
import React, { useRef,useEffect, useState } from "react";
import { FaEraser, FaRegSquare,FaFileImport } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { FiCircle, FiTriangle } from "react-icons/fi";
import { RiRectangleLine } from "react-icons/ri";
import { LuShapes } from "react-icons/lu";
import "./navbar.css";
import { changeTool,changeToolSize } from "../globalTool";
import { IoMdResize } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
//import { SaveFile,DeleteFile } from "../blackboard_backend/crud_file";
import { MdOutlineSaveAlt } from "react-icons/md";
import { crudFunctions } from "../blackboard_backend/crud_file";
import { canvasInfo } from "../globalTool";
import { MdPublishedWithChanges } from "react-icons/md";
import { useSaveFile } from "../customHooks/savefile_context";
import { useAuthFile } from "../customHooks/authhook";
import { user_Op } from "../../file.js/updatefile";
import { useAppService } from "../customHooks/appHook";
import { LuKeySquare } from "react-icons/lu";
export default function Navbar({setservice}) {//props for changin the content of the canvas


  const drawMenuRef = useRef(null);
  const fileRef=useRef(null);
  


  function handleDisplay(refvalue) {
    if (refvalue.current) {
      refvalue.current.classList.toggle("show");
    }
  }
  

  

  return (
    <nav className="boardnavigation">
    <ul className="nav-links">
      <li>
        <div className="draw_dropdown">
          <FileDropdown fileRef={fileRef} handleDisplay={handleDisplay} setservice={setservice}/> 
        </div>
      </li>
      <li><a href="#">Insert</a></li>
      <li>
        <div className="draw_dropdown">
          <DrawDropdown drawMenuRef={drawMenuRef} handleDisplay={handleDisplay} />
        </div>
      </li>
      <li>
        <a href="#">
          Export
          <span className="icon" style={{ fontSize: "1.2em" }}>
            <BiExport />
          </span>
        </a>
      </li>
    </ul>
  
    {/* Access Button is now before the Launch Button */}
  
   
    <div className="remove-btn">

      <button>
        Launch
        <span className="icon">
          <MdOutlineRocketLaunch />
        </span>
      </button>

      <button onClick={()=>{setservice('accessFile')}}>
        Access
        <span className="icon">
        <LuKeySquare />
        </span>
      </button>

    </div>
    
  </nav>
  
  
  );
}

function DrawDropdown({ drawMenuRef, handleDisplay }) {
  return (
    <div className="custom-dropdown">
      <button className="custom-dropdown-toggle" onClick={()=>{handleDisplay(drawMenuRef)}}>
        Draw
      </button>

      <div className="custom-dropdown-menu" ref={drawMenuRef}>
        <button className="dropdown-item" onClick={() => changeTool("pen")}>
          <span className="dropdown-text">Pen</span>
          <span className="dropdown-icon"><FaPencil /></span>
        </button>

        <button className="dropdown-item" onClick={() => changeTool("eraser")}>
          <span className="dropdown-text">Eraser</span>
          <span className="dropdown-icon"><FaEraser /></span>
        </button>

        <div className="container">
          <select className="select" onChange={(e) => changeToolSize(e.target.value)}>
            <option value="">Resize</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            
          </select>
          <span className="shape-icon"><IoMdResize style={{fontSize:"0.8em"}}></IoMdResize></span>
        </div>

        {/* Shapes Menu */}
        <div className="container">
          <select className="select" onChange={(e) => changeTool("shape", e.target.value)}>
            <option value="shapes">Shapes</option>
            <option value="square">⬜ Square</option>
            <option value="circle">⚫ Circle</option>
            <option value="rectangle">▭ Rectangle</option>
            <option value="triangle">🔺 Triangle</option>
          </select>
          <span className="shape-icon"><LuShapes /></span>
        </div>
      </div>
    </div>
  );
}


function FileDropdown({ fileRef, handleDisplay ,setservice}) {//File Drop Down Menu
  
  const{setAuthorize,setVerification}=useAuthFile();
  const {set_saveStatus}=useSaveFile();
  const {appService,setAppService}=useAppService();
  useEffect(()=>{console.log('file deleted now')},[canvasInfo.title]);
  return (
    <div className="custom-dropdown">
      <button className="custom-dropdown-toggle" onClick={()=>{handleDisplay(fileRef)}}>
        File
      </button>

      <div className="custom-dropdown-menu" ref={fileRef}>
      {canvasInfo.title===""?<button className="dropdown-item" onClick={() => {setservice("savefile");set_saveStatus(true)}}>
        
        <span className="dropdown-text">Save</span>
        <span className="dropdown-icon"><MdOutlineSaveAlt></MdOutlineSaveAlt></span>
      </button>
      ://Based on status of file changed or not
        <button className="dropdown-item" onClick={() => {setservice("Rename_file");set_saveStatus(true);}}>
          
        <span className="dropdown-text">Rename</span>
        <span className="dropdown-icon"><MdOutlineSaveAlt></MdOutlineSaveAlt></span>
      </button>
      
      }
        {canvasInfo.title!==''?        <button className="dropdown-item"  onClick={async ()=>
            {await set_saveStatus(true);await crudFunctions.saveChanges({setAuthorize,setVerification});}
          }>
          <span className="dropdown-text">Save Changes</span>
          <span className="dropdown-icon"><MdPublishedWithChanges></MdPublishedWithChanges></span>
        </button>:<></>}
        <button className="dropdown-item"  onClick={async ()=>{
          setservice("deleteFile");
        }}>
          <span className="dropdown-text">Terminate</span>
          <span className="dropdown-icon"><RiDeleteBin6Line></RiDeleteBin6Line></span>
        </button>

        <button className="dropdown-item" onClick={()=>{
          crudFunctions.importFiles({setAppService,setAuthorize,setVerification});
        }}>
          <span className="dropdown-text">Import</span>
          <span className="dropdown-icon"><FaFileImport></FaFileImport></span>
        </button>
      </div>
    </div>
  );
}
