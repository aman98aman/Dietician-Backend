const express = require("express");
const router = express.Router();
const Plan = require("../models/plans.model");

router.get('/',async(req,res)=>{
    const plan = await Plan.find({}).exec();

    res.json({
        success:true,
        data: plan
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
    let plan = new Plan(payload);
    plan=await plan.save()
    res.json({
        success:true,
        data: plan
    })

});
module.exports = router;