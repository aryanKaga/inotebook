import { useState } from "react";
import "./savefile.css"; // Add styles for better UI
import { crudFunctions } from "../blackboard_backend/crud_file";
import { canvasInfo } from "../globalTool";
import { useAuthFile } from "../customHooks/authhook";
import { useSaveFile } from "../customHooks/savefile_context";
import { useAppService } from "../customHooks/appHook";

export default function FileSaver({ setservice }) {
    const [fileName, setFileName] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false); // Prevent multiple clicks

    const { setAuthorize, setVerification } = useAuthFile();
    const { set_saveStatus } = useSaveFile();
    const { set_importUserFiles } = useAppService(); 

    const handleSave = async () => {
        if (!fileName.trim()) {
            setMessage("⚠️ File name cannot be empty!");
            setTimeout(() => setMessage(""), 3000);
            return;
        }

        setLoading(true); // Show loading state
        canvasInfo.title = fileName;

        try {
            const success = await crudFunctions.SaveFile({ 
                setAuthorize, 
                setVerification, 
                set_importUserFiles //  Fixed variable name 
            });
            console.log('success is ',success);
            if (!success) {
                throw new Error("File save failed.");
            }

            setMessage(`✅ File "${fileName}" saved successfully!`);
            setTimeout(() => {
                setMessage("");
                setservice("canvas");
                set_saveStatus(true);
            }, 2000);
        } catch (error) {
            setMessage("❌ Error saving file. Try again.");
            console.error("Save Error:", error.message);
            setTimeout(() => setMessage(""), 3000);
        } finally {
            setLoading(false);
        }
    };

    const handleDiscard = () => {
        setFileName("");
        setMessage("⚠️ File saving canceled.");
        setTimeout(() => setMessage(""), 2000);
        setservice("canvas");
        set_saveStatus(true);
    };

    return (
        <div className="file-saver-container">
            <h2>Enter File Name</h2>
            <input 
                type="text" 
                value={fileName} 
                onChange={(e) => setFileName(e.target.value)} 
                placeholder="Enter file name..." 
                className="file-input"
                disabled={loading} 
            />
            <div className="button-group">
                <button className="save-btn" onClick={handleSave} disabled={loading}>
                    {loading ? "Saving..." : "Save"}
                </button>
                <button className="discard-btn" onClick={handleDiscard}>
                    Cancel
                </button>
            </div>
            {message && <p className="message" aria-live="polite">{message}</p>} 
        </div>
    );
}
