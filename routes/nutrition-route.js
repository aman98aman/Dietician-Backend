const express = require("express");
const router = express.Router();
const Nutrition = require("../models/Nutrition")

router.get('/',async(req,res)=>{
    const nutrition = await Nutrition.find({}).exec();

    res.json({
        success:true,
        data: nutrition
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
    const nutrition = new Nutrition(payload);
    await nutrition.save()
    res.json({
        success:true,
        data: nutrition
    })

});
module.exports = router;