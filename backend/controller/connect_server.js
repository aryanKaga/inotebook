const mongoose=require('mongoose');
const usermodel=require('./model/usermodel')
const connection=async (url)=>{
    try{
        await mongoose.connect(url)

       

        console.log("Database connected");
    }
    catch(error){
        console.log(error);
        console.log("Error on connecting Database");
    }
    //await inotebook.collection_name.updateMany({}, { $unset: { field_name: "" } })
}
module.exports=connection;