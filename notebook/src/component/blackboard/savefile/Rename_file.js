import { useState } from "react";
import "./savefile.css"; // Add styles for better UI
import { crudFunctions } from "../blackboard_backend/crud_file";
import { useAuthFile } from "../customHooks/authhook";
import { useSaveFile } from "../customHooks/savefile_context";
import { useAppService } from "../customHooks/appHook";

export default function File_Rename({ setservice }) {
    const [fileName, setFileName] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false); // Loading state

    const { setAuthorize, setVerification } = useAuthFile();
    const { set_importUserFiles } = useAppService();
    const { set_saveStatus } = useSaveFile();

    const handleRename = async () => {
        if (!fileName.trim()) {
            setMessage("⚠️ File name cannot be empty!");
            setTimeout(() => setMessage(""), 3000);
            return;
        }

        setLoading(true); // Show loading state

        try {
            await crudFunctions.Rename({ fileName, setservice, setAuthorize, setVerification, set_importUserFiles });

            setMessage(`✅ File renamed to "${fileName}" successfully!`);

            setTimeout(() => {
                setMessage("");
                setservice("canvas");
                set_saveStatus(true);
            }, 3000);
        } catch (error) {
            setMessage("❌ Error renaming file. Try again.");
            console.error("Rename Error:", error);
            setTimeout(() => setMessage(""), 4000);
        } finally {
            setLoading(false);
        }
    };

    const handleDiscard = () => {
        setMessage("⚠️ File renaming canceled.");
        setTimeout(() => setMessage(""), 2000);
        setservice("canvas");
        set_saveStatus(true);
    };

    return (
        <div className="file-saver-container">
            <h2>Enter New File Name</h2>
            <input
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                placeholder="Enter file name..."
                className="file-input"
            />
            <div className="button-group">
                <button className="save-btn" onClick={handleRename} disabled={loading}>
                    {loading ? "Renaming..." : "Rename"}
                </button>
                <button className="discard-btn" onClick={handleDiscard} disabled={loading}>
                    Cancel
                </button>
            </div>
            {message && <p className="message">{message}</p>}
        </div>
    );
}
