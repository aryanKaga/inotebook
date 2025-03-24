import { memo, useState, useEffect } from "react";
import { userFiles } from "../blackboard/globalTool";
import { crudFunctions } from "../blackboard/blackboard_backend/crud_file";
import { useSaveFile } from '../blackboard/customHooks/savefile_context';
import { useAppService } from "../blackboard/customHooks/appHook";
import { canvasInfo } from "../blackboard/globalTool";
import { matchedFiles } from "./matchFile";
import './file.css';

const MemoFilesComp = memo(function UserFiles({ filesArr, setDocType, setSearchDoc ,setFilesArr}) {
    const { set_saveStatus } = useSaveFile();
    const { setAppService, importUserFiles, set_importUserFiles } = useAppService();

    useEffect(() => {
        console.log('📂 File list updated.');
        set_importUserFiles(false);
    }, [importUserFiles, set_importUserFiles]);

    return (
        <>
            <div className="search-bar-wrapper">
                <input 
                    type="text"
                    placeholder="Search files..."
                    className="search-input"
                    onChange={(e) => setSearchDoc(e.target.value)}
                />
            </div>

            {(!filesArr || filesArr.length === 0) ? (
                <h1 className="no-files-text">No Files Found!</h1>
            ) : (
                <div className="files-wrapper">
                    {filesArr.map((elem, index) => (
                        <div className="file-container" key={index}>
                            <span className="file-title">{elem.title}</span>
                            <button className="import-button" onClick={() => {
                                crudFunctions.setFile({
                                    filename: elem.title,
                                    sharestatus: elem.sharestatus,
                                    set_saveStatus,
                                    setAppService
                                });
                            }}>
                                Open
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Button Section */}
            <div className="button-wrapper">
                <button className="create-button" onClick={() => {
                    setAppService('blackboard');
                    canvasInfo.title = '';
                    canvasInfo.save([]);
                }}>
                    Create
                </button>
                <button className="back-button" onClick={() => setDocType('all')}>All</button>
                <button className="status-button public" onClick={() => setDocType('public')}>Public</button>
                <button className="status-button private" onClick={() => setDocType('private')}>Private</button>
                <button className="status-button locked" onClick={() => setDocType('locked')}>Locked</button>
            </div>
        </>
    );
});

export default function WrappedFilesComp() {
    const [filesArr, setFilesArr] = useState(userFiles.savedFiles);
    const [searchDoc, setSearchDoc] = useState('');
    const [docType, setDocType] = useState('all'); 
    

   

    useEffect(() => {
        let filteredFiles = userFiles.savedFiles;

        if (docType === 'public') setFilesArr(userFiles.public)
        else if (docType === 'private') setFilesArr(userFiles.private)
        else if (docType === 'locked') setFilesArr(userFiles.locked)
        else if (docType === 'all') setFilesArr(userFiles.savedFiles);
    }, [docType]);

    useEffect(() => {
        matchedFiles({ filesArr, searchDoc, setFilesArr });
    }, [searchDoc]);

    

    return <MemoFilesComp filesArr={filesArr} setDocType={setDocType} setSearchDoc={setSearchDoc} setFilesArr={setFilesArr} />;
}
