import { canvasInfo } from "../../blackboard/globalTool"
export default async function shiftAccess({selected}){
    const response=await fetch('http://localhost:5000/access/shiftAccess',{
        method:"POST",
        body:JSON.stringify({filename:canvasInfo.title,currAccess:canvasInfo.shareStatus,newAccess:selected}),
        headers:{ "Content-Type": "application/json" },
        credentials:"include"
    });
    if(response.ok){
        canvasInfo.shareStatus=selected;
        return true;
    }
    else{
        console.log(response.status);
        return false;
    }
}