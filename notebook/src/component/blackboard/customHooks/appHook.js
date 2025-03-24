import { createContext ,useState,useContext} from "react";

const AppService=createContext();

export function AppContextProvider({children}){
    
    const [appService,setAppService]=useState('blackboard');//hook  for app services
    const [importUserFiles,set_importUserFiles]=useState(false);
    return(
    <AppService.Provider value={{appService,setAppService,importUserFiles,set_importUserFiles}}>
        {children}
    </AppService.Provider>
    )
}

export function useAppService(){
    return useContext(AppService);
}
export default  AppService;