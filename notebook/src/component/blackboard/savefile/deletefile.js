import { useState } from "react";
import "./savefile.css"; // Add styles for better UI
import { crudFunctions } from "../blackboard_backend/crud_file";
import { canvasInfo } from "../globalTool";
import { useAuthFile } from "../customHooks/authhook";
import { useSaveFile } from "../customHooks/savefile_context";

export default function File_delete({ setservice }) {
    const fileName = canvasInfo.title; // Get the file name
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false); // Loading state

    const { set_saveStatus } = useSaveFile();
    const { setAuthorize, setVerification } = useAuthFile();

    const handleDelete = async () => {
        if (!fileName) {
            setMessage("⚠️ No file selected to delete!");
            setTimeout(() => setMessage(""), 3000);
            return;
        }

        setLoading(true); // Show loading state

        try {
            await crudFunctions.deletefiles({ fileName, setAuthorize, setVerification, set_saveStatus });
            
            setMessage(`✅ File "${fileName}" deleted successfully!`);
            canvasInfo.title = ""; // Clear title after successful deletion

            setTimeout(() => {
                setMessage("");
                setservice("canvas"); // Navigate after deletion
                set_saveStatus(true);
            }, 3000);
        } catch (error) {
            setMessage("❌ Error deleting file. Try again.");
            console.error("Delete Error:", error);
            setTimeout(() => setMessage(""), 4000);
        } finally {
            setLoading(false);
        }
    };

    const handleDiscard = () => {
        setMessage("⚠️ File deletion canceled.");
        setTimeout(() => setMessage(""), 2000);
        setservice("canvas");
        set_saveStatus(true);
    };

    return (
        <div className="file-saver-container">
            <h2>Delete File?</h2>
            <p>Are you sure you want to delete <strong>{fileName}</strong>?</p>

            <div className="button-group">
                <button className="save-btn" onClick={handleDelete} disabled={loading}>
                    {loading ? "Deleting..." : "Delete"}
                </button>
                <button className="discard-btn" onClick={handleDiscard} disabled={loading}>
                    Cancel
                </button>
            </div>
            {message && <p className="message">{message}</p>}
        </div>
    );
}
