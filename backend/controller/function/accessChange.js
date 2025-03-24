const  usermodel =require('../model/usermodel');
async function accessChange(req,res){
    
    try{
    const currAccess=req.body.currAccess;
    const newAccess=req.body.newAccess;
    console.log(req.body);
    const shiftdata=await usermodel.findOne({username:req.user.username,'documents.title':req.body.filename},{'documents.$':1});
    const data=shiftdata.documents[0];

    console.log(data);
    if(currAccess==='public'){
        await usermodel.findOneAndUpdate({username:req.user.username},{$pull:{public:{title:req.body.filename}}},{new:true});
    }
    else if(currAccess==='private'){
        await usermodel.findOneAndUpdate({username:req.user.username},{$pull:{private:{title:req.body.filename}}},{new:true});
    }
    else if(currAccess==='locked'){
        await usermodel.findOneAndUpdate({username:req.user.username},{$pull:{locked:{title:req.body.filename}}},{new:true});
    }
    if(newAccess==='public'){
       await usermodel.findOneAndUpdate({username:req.user.username},{$push:{public:data}},{new:true});
    }
    else if(newAccess==='private'){
       await usermodel.findOneAndUpdate({username:req.user.username},{$push:{private:data}},{new:true});
    }
    else if(newAccess==='locked'){
       await usermodel.findOneAndUpdate({username:req.user.username},{$push:{locked:data}},{new:true});
    }
   
    return res.status(200).json({});
  
    }
    catch(err){
        console.log(err);
        res.status(405).json({msg:"error encountered"});
    }
   
    
}
module.exports={accessChange}

                                                                                                                                                             