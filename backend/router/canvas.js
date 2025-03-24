const express = require("express");
const mongoose = require("mongoose");
const CanvasModel = require("../controller/model/canvasmodel"); // Import the Mongoose model
const jwt=require("jsonwebtoken")
const key=require("./secretkey");
const usermodel=require('../controller/model/usermodel')
const router = express.Router();
const renamefile=require('../controller/function/renamefile');
const savechanges=require('../controller/function/savechanges');
const deletefile=require('../controller/function/deleteFile')
router.post("/saveFile", async (req, res) => {
    //console.log(req.body.lines);
   const lines=req.body.lines;
   const Title=req.body.title;
   const token=req.cookies.auth_token;
   const user=jwt.decode(token,key).username;
   console.log(user);

   try{
    const canvasFile= await CanvasModel.create({CanvasLines:lines,title:Title});
    const document={docId:canvasFile._id,title:Title};
    const updateUser= await usermodel.findOneAndUpdate({username:user},{$push:{documents:document,locked:document}},{new:true});
    return res.status(200).send({msg:"hello user"});
    
   }
   catch(err){
    console.log(err);
    res.status(500).send()
   }
});


router.post('/renameFile',renamefile);

router.post('/saveChanges',savechanges);

router.post('/deletefile',deletefile);
module.exports = router;
