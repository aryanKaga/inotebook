
const usermodel=require('../model/usermodel');
async function renamefile(req,res){

       console.log('incoming req,res');
        const currFile=req.body.currFile;
        const newFile=req.body.newFile;
        const user_name=req.user.username;
        console.log(newFile+' '+currFile);
        try{
            const result = await usermodel.findOneAndUpdate(
                { username: user_name },  // Find user with given username and doc
                { $set: { "documents.$[elem].title": newFile } },  // Update the title field
                { arrayFilters: [{ "elem.title": currFile }] }  // Match elements where title = currFile
            );
            console.log(result);
            return res.status(200).json({msg:"Renamed File"});
        }
        catch(err){
            console.log("Rename file.js error renaming");
            console.log(err);
            return res.status(401).json({msg:"Renaming Failed"});
        }
    
        return res.json({msg:"hello"});
}
module.exports=renamefile;