const usermodel=require('../model/usermodel');
const canvasmodel=require('../model/canvasmodel');
async function deltefile(req,res){
    const user=req.user.username;
    
    //console.log(req.body,req.user);
    const filename=req.body.filename;
    try{
        const change = await usermodel.findOne(
            { username: user, 'documents.title': filename },
            { documents: { $elemMatch: { title: filename } },_id:1} // ✅ Correct Usage
        );
        console.log(change);
        const canvasId=change.documents[0].docId;
        const userId=change._id;
            try{
                const tempchange=await canvasmodel.findByIdAndDelete(canvasId);
                const oper = await usermodel.findByIdAndUpdate(
                    userId,
                    { $pull: { documents: { title: filename } } },
                    { new: true }
                );
            }
            catch(err){
                console.log(err);
            }
    
        console.log(change);
        return res.status(200).json({msg:"file name changed"});
    }
    catch(err){
        console.log(err);
        return res.status(415).json({msg:"error deleting"})
    }
    
}
module.exports=deltefile;