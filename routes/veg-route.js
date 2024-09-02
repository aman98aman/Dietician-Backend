const express = require("express");
const vegModal = require("../models/vegetable.model");
const router = express.Router();

router.get('/',async(req,res)=>{
    const vegetables = await vegModal.find({}).exec();

    res.json({
        success:true,
        data: vegetables
    })

});

router.post('/',async(req,res)=>{
    const payload = req?.body;
    if(!payload){
        return res.status(400).json({
            status: 400,
            message: "payload is required"
        })
    }
    let vegetable = new vegModal(payload);
    vegetable=await vegetable.save()
    res.json({
        success:true,
        data: vegetable
    })

});
module.exports = router;