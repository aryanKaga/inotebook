const mongoose=require('mongoose');
const canvasmodel=require('./canvasmodel');
const notification_model=require('./notification')
const documentSchema=mongoose.Schema({title:String,docId:{type:mongoose.Schema.Types.ObjectId,ref:canvasmodel}})

const userschema= new mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true,
        },
        documents:[documentSchema],

        connections:[{type:mongoose.Schema.Types.ObjectId,ref:'user',default:null}],

        notification:[{type:mongoose.Types.ObjectId,ref:notification_model,default:null}],

        public:[documentSchema],

        private:[documentSchema],

        locked:[documentSchema],



        
    }
)
const usermodel=mongoose.model('user',userschema);



module.exports=usermodel;