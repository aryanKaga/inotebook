const express=require('express');
const router=express.Router();
const {accessChange}=require('../controller/function/accessChange')

router.post('/shiftAccess',accessChange);


module.exports=router;