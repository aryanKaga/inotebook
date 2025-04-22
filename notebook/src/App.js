import React, { useEffect, useState } from "react";
import "./index.css";
import "./component/blackboard/blackboard_style.css";
import reportWebVitals from "./reportWebVitals";
import Navigation from "./component/Nav";
import Blackboard from "./component/blackboard/blackboard";
import AuthPage from "./component/authentication/auth";
import CheckVerify from "./component/authentication/verification"; 
import { SaveFileContextProvider } from "./component/blackboard/customHooks/savefile_context";
import { AuthProvider, useAuthFile } from "./component/blackboard/customHooks/authhook";
import { user_Op } from "./component/file.js/updatefile";
import { useAppService } from "./component/blackboard/customHooks/appHook";
import WrappedFilesComp from "./component/file.js/userFile";
import Connection from "./component/searchuser/searchuser";
import useSocketFile from "./component/blackboard/customHooks/websocket";
import Notification from "./component/blackboard/notification/notification";
import ViewPublic from "./component/blackboard/viewPublic";
import { ViewFileContextProvider } from "./component/blackboard/customHooks/viewPublicHook";
export default function App() {
    const { appService, setAppService } = useAppService();
    const [Comp, setComp] = useState(null);

    const { isReady, setisReady, ws } = useSocketFile();

    useEffect(() => {
        if (appService === "blackboard") setComp(() => Blackboard);
        else if (appService === "userFiles") setComp(() => WrappedFilesComp);
        else if (appService === "connection") setComp(() => Connection);
        else if(appService==='notifications')setComp(()=>Notification)
        else if (appService ==='public')setComp(()=>ViewPublic)
    }, [appService]);

    const { authorize, setAuthorize, verification, setVerification } = useAuthFile();

    useEffect(() => {
        if (!authorize) return;
        let socket;
        console.log(authorize);

       


        try{
             socket = new WebSocket(`ws://localhost:5000`, [], {
                withCredentials: true
            })
            ws.current=socket;
            console.log(ws);
            setisReady(true);
           
        }
        catch(err){
            console.log(err);
            return ;
        }
        
        


        socket.onopen = () => {
            console.log('Connection established');
            ws.current = socket;
            setisReady(true);
        };
        


        

    }, [authorize]);

    console.log(authorize);
    
    if (!authorize && !verification) {
        console.log("Verifying...");
        return <CheckVerify setAuthorize={setAuthorize} setVerification={setVerification} />;
    }

    if (!authorize) {
        return <AuthPage authorize={authorize} setAuthorize={setAuthorize} />;
    }

    user_Op.import_files({ setAuthorize, setVerification });

    return (
        <SaveFileContextProvider>
             <ViewFileContextProvider>
                <div id="parentapp">
                    <div id="navigationbar">
                        <Navigation />
                    </div>
                    <div id="blackboard">
                        {Comp && <Comp />}
                    </div>
                </div>
                </ViewFileContextProvider>
        </SaveFileContextProvider>
    );
}

reportWebVitals();
