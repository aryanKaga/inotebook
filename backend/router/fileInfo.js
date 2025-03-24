const express=require('express');
const router=express.Router();
const getAllFiles=require('../controller/function/getfiles');
const getFileData=require('../controller/function/getFileData');


router.get('/getFileInfo',getAllFiles);
router.post('/getFileData',getFileData);




module.exports=router;