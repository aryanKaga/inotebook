import Navbar from "./navigation/Navbar";
import FreehandCanvas from "./conva";
import "./blackboard_style.css";
import FileSaver from "./savefile/savefile";
import File_Rename from "./savefile/Rename_file";
import File_delete from "./savefile/deletefile";
import { useService } from "./customHooks/customMove";
import { useState, useEffect } from "react";
import { SaveFileContextProvider } from "./customHooks/savefile_context"; // Correct import
import FileAccessOptions from "../file.js/accessFile.js/fileaccess"; 

export default function Blackboard() {
    const { service, setservice } = useService();
    
    // Store the current component
    const [Comp, setComp] = useState(() => FreehandCanvas);
    
    // Change component based on service
    useEffect(() => {
        if (service === "canvas") {
            setComp(() => FreehandCanvas);
        } else if (service === "savefile") {
            console.log("Incoming request");
            setComp(() => FileSaver);
        } else if (service === "Rename_file") {
            console.log("file being renamed");
            setComp(() => File_Rename);
        } else if (service === "deleteFile") {
            setComp(() => File_delete);
        } else if (service === "accessFile") {
            setComp(() => (props) => <FileAccessOptions {...props} setservice={setservice} />); // ✅ FIXED
        }
        console.log(service);
    }, [service]); // Depend on service

    return (
        <SaveFileContextProvider>
            <Navbar setservice={setservice} />
            <div className="service">
                <Comp setservice={setservice} /> {/* ✅ Ensures correct rendering */}
            </div>
        </SaveFileContextProvider>
    );
}
