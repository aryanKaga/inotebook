const mongoose=require('mongoose');
const usermodel=require('./usermodel')
const notification_schema=new mongoose.Schema({
    notification_type:{
        type:String,
        required:true
    },
    sender_email:{
        type:"String",
        required:true
    },
    info:{
        type:"String",
    },
    sender_id:{
        type:mongoose.Schema.Types.ObjectId,ref:'user',default:null
    }
})

const notification_model=mongoose.model('notification',notification_schema);
module.exports=notification_model;