import { userFiles } from "../blackboard/globalTool"

export const user_Op={
    import_files:async ({setAuthorize,setVerification})=>{
        
        try{
        const response=await fetch('http://localhost:5000/Files/getFileInfo',{
            method:"GET",
            credentials:"include",
            headers:{ "Content-Type": "application/json" }
        });
            if(response.ok){


                const temp=await response.json();
                userFiles.private=temp.private||[];
                userFiles.public=temp.public || [];
                userFiles.locked=temp.locked || [];
               userFiles.savedFiles=[];
                userFiles.private.forEach((elem)=>{
                    elem.sharestatus='private';
                    userFiles.savedFiles.push(elem);
                })
                userFiles.public.forEach((elem)=>{
                    elem.sharestatus='public';
                    userFiles.savedFiles.push(elem);
                })
                userFiles.locked.forEach((elem)=>{
                    elem.sharestatus='locked';
                    userFiles.savedFiles.push(elem);
                })
                return true;
            }
            else if(response.status===403){
                setAuthorize(false);
                setVerification(false);
                return false;

            }
            else{
                console.log('response status is '+response.status);
                //alert('fuck you brother error occured');
                return false;
            }
        }
        catch(err){
            console.log(err);
            return false;
        }
    }
}






