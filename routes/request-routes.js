const express = require('express');
const router = express.Router();
const Request = require('../models/request.model');

router.post("/postRequest",async(req,res)=>{
    console.log("req body received is". req.body);
    const request = new Request(req.body);
    await request.save();
    res.json({
        success:true,
        message:"Request is sent to the admin"
    })
})

router.get("/getRequest", async(req,res)=>{
    const allRequest = await Request.find().exec();
    res.json({
        success:true,
        data:allRequest
    })
})

router.delete("/deleteRequest", async(req,res)=>{
    const deleteById = await Request.findByIdAndDelete(req.body.id);
    if(deleteById !== null){
    res.json({
        success:true,
    })}else{
        res.json({
            success:false,
        })
    }
})

module.exports = router;