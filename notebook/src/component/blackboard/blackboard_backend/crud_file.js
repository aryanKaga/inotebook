//import Sevrer from ".../backend/server_details";

import { canvasInfo,userFiles } from "../globalTool";
import { user_Op } from "../../file.js/updatefile";
import { useAppService } from "../customHooks/appHook";
import { useSaveFile } from "../customHooks/savefile_context";

export const crudFunctions={
    SaveFile:async ({setAuthorize,setVerification,set_importUserFiles})=>{
        console.log(canvasInfo.lines);
       
       const val=await  post_canvasInfo({setAuthorize,setVerification,set_importUserFiles});
       return val;
    },
    Rename:async ({fileName,setservice,setAuthorize,setVerification,set_importUserFiles})=>{
      console.log("renaming file");
      await RenameFile({fileName,setservice,setAuthorize,setVerification,set_importUserFiles});
    },
    saveChanges:async ({setAuthorize,setVerification})=>{
      await savechanges({setAuthorize,setVerification});
    },
    deletefiles:async({setAuthorize,setVerification,fileName,set_saveStatus})=>{
        await deleteFiles({setAuthorize,setVerification,fileName});
    },
    importFiles:async ({setAppService,setAuthorize,setVerification})=>{
    
        const files=await user_Op.import_files({setAuthorize,setVerification});
        if(!files){
            return false;
        }
        else{
          setAppService('userFiles');
          console.log('app service changed');
          return true;
        }

    }
    ,setFile:async ({filename,set_saveStatus,setAppService,setAuthorize,setVerification,sharestatus})=>{
        await setFileInfo({filename,set_saveStatus,setAppService,setAuthorize,setVerification,sharestatus});
    }


}

async function post_canvasInfo({ setAuthorize, setVerification, set_importUserFiles }) {
    console.log("🔄 Request for saving file started");

    try {
        console.log("⏳ Sending request to backend...");
        
        const response = await fetch("http://localhost:5000/canvas/saveFile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ 
                name: "My Canvas", 
                lines: canvasInfo.CanvasLines,
                title: canvasInfo.title
            })
        });

        console.log("✅ Fetch request completed");

        if (response.ok) {
            console.log("🟢 File saved successfully, importing files...");
            await user_Op.import_files({ setAuthorize, setVerification });
            set_importUserFiles(true);
            return true;
        } else if (response.status === 403) {
            console.log("🚫 Authentication error");
            setAuthorize(false);
            setVerification(false);
            return false;
        } else {
            console.log("⚠️ Unknown error saving the file");
            return false;
        }
    } catch (err) {
        console.error("❌ Fetch failed:", err);
        return false;
    }
}
async function RenameFile({fileName,setservice,setAuthorize,setVerification,set_importUserFiles}){
  try{
    const response=await fetch('http://localhost:5000/canvas/renameFile',{
    body:JSON.stringify({currFile:canvasInfo.title,newFile:fileName})
    ,method:"POST",
    headers:{
      "Content-type":"application/json"
    },
    credentials:"include"
  })
    //if(!response.ok){console.log("Error renaming file in crud_file.js")}
    console.log('control returns');
    if(response.ok){
       
        await user_Op.import_files({setAuthorize,setVerification});
        set_importUserFiles(true);
        return true;

    }
    if(response.status===403){
      console.log('auth error');
      setAuthorize(false);
      setVerification(false);
      return false;
    }
    
    else{console.log("file renames");canvasInfo.title=fileName;};
    
  }
  catch(error){
    console.log(error);
  }
}
async function savechanges({setAuthorize,setVerification}){


  try{
    const response=await fetch('http://localhost:5000/canvas/saveChanges',{ //fetching request to save the file
      method:"POST",
      credentials:"include",
      body: JSON.stringify({ 
        name: "My Canvas", 
        lines: canvasInfo.CanvasLines,
        filename: canvasInfo.title
      }),
      headers:{
        "Content-Type":"application/json"
      }
    });
    if(response.ok){
      
    }
    else if(response.status===403){
      setAuthorize(false);
      setVerification(false);
      

      return false;
    }
  }
  catch(err){
    console.log(
      err
    )
  }
}

async function deleteFiles({setAuthorize,setVerification,fileName,set_saveStatus}){
  console.log('deleting file ',fileName);
  try{
      const response=await fetch('http://localhost:5000/canvas/deleteFile',{
        method:"POST",
        credentials:"include",
        body:JSON.stringify({
          filename:fileName
        }),
        headers:{
          "Content-Type":"application/json"
        }
      })
      if(response.ok){
        canvasInfo.title='';
        await user_Op.import_files({setAuthorize,setVerification});
        set_saveStatus(false);
      }
      else if(response.status===403){
        setAuthorize(false);
        setVerification(false);
        return false;
      }
      else{
        
      }
      console.log(response);
  }
  catch(err){
    console.log(err)
  }
}

async function getFileInfo({filename,set_saveStatus,setAppService,setAuthorize,setVerification}){
    const fileID=userFiles.fileId(filename);
    if(!fileID){
      console.log('File Not Found');
    }
    else{
      const response=await fetch('http://localhost:5000/Files/getFileData',{
        method:"POST",
        credentials:"include",
        body:JSON.stringify({
          fileId:fileID
        }),
        headers:{
          "Content-Type":"application/json"
        }
      });
      if(response.ok){
          return response;
      }
      else if(response.status===403){
        setAuthorize(false);
        setVerification(false);
        return false;
      }
      else{
        return false;
      }
    }
}
async function setFileInfo({filename,set_saveStatus,setAppService,setAuthorize,setVerification,sharestatus}){
  console.log('file imported');
  const response=await getFileInfo({filename,set_saveStatus,setAppService,setAuthorize,setVerification});
        if(!response){
          return response;
        }
        const val=await response.json();
        canvasInfo.save(val.CanvasLines);//saving canvas Lines
        canvasInfo.title=filename;
        canvasInfo.shareStatus=sharestatus
        console.log('fileName changed to',canvasInfo.title);
        set_saveStatus(true);
        setAppService('blackboard');
        return true;
}