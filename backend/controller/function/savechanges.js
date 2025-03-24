
const usermodel=require('../model/usermodel');
const canvasmodel=require('../model/canvasmodel')
async function savechanges(req,res){
    const filename=req.body.filename;
    const user=req.user.username;
    const lines=req.body.lines;
    console.log(req.body);
    try{
        console.log(filename+"filename");
         let change=await usermodel.findOne({username:user,'documents.title':filename},{'documents.docId.$':1});
        console.log(change);
        const canvasId=change.documents[0].docId;
        change=await canvasmodel.findByIdAndUpdate(canvasId,{$set:{CanvasLines:lines}},{new:true});
        return res.status(200).json({msg:"Changes Saved"});
    }
    catch(err){
        console.log(err);
        return res.status(401).json({msg:"Erorr modifying"});
    }
}
module.exports=savechanges;