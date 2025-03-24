const usermodel=require('../model/usermodel');
 async function getAllFiles(req,res){
    console.log('request incoming');
    try{
        const user=req.user.username;
        const Public=await usermodel.findOne({username:user},{public:1});
        const Private=await usermodel.findOne({username:user},{private:1});
        const Locked=await usermodel.findOne({username:user},{locked:1});

        console.log(Public);
       // console.log(files);
        return res.status(200).json({public:Public.public,private:Private.private,locked:Locked.locked});
    }
    catch(err){
        console.log(err);
        return res.status(405).json({msg:"Error fetching files"});
    }

 } 
module.exports=getAllFiles;