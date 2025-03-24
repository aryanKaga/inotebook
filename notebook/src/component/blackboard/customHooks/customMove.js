
import { useState } from "react";

export function useService(){
    
    const [service,setservice]=useState("canvas");
    return {service,setservice};
}

