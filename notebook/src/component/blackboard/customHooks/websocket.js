import { useState,useContext,createContext ,useRef} from "react";
const SocketContext=createContext();


export function SocketProvider({children}){
    const [isReady,setisReady]=useState(false);
    const ws=useRef(null);
    return (<SocketContext.Provider value={{isReady,setisReady,ws}}>
        {children}
    </SocketContext.Provider>)
}


export default function useSocketFile(){
    return useContext(SocketContext);
}