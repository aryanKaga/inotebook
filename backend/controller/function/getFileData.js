const CanvasModel=require('../model/canvasmodel');
 async function getFileData(req,res){

    const fileId=req.body.fileId;
    try{
        const file_data=await CanvasModel.findById(fileId,{CanvasLines:1});
        console.log(file_data);
        return res.status(200).json(file_data);
    }
    catch(err){
        console.log(err);
        return res.status(405).json({msg:"Issues in Fetching Data"});
    }
}
module.exports=getFileData;