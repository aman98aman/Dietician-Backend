const express = require("express");
const router = express.Router();
const Meal = require("../models/diet.model.js")

router.post('/addMeal',async(req,res)=>{
    const meal = new Meal(req.body);
    await meal.save();

    res.json({
        success:true,
        message:"meal data is saved"
    })

});

router.patch('/editMeal/:id',async(req,res)=>{
    const mealId = req.params.id;
    const updatedMeal = req?.body;
    if(!mealId){
        res.status(400).json({
            message:"path param not available"
        })
    }
    else if(!updatedMeal){
        res.status(400).json({
            message:"payload not available"
        })
    }else{
        await Meal.findOneAndUpdate({_id: mealId},{...updatedMeal});
        res.json({
            success:true,
            message:"meal data is updated"
        })
    }
});

router.get('/getMeal', async(req,res)=>{
        const allMeal = await Meal.find({}).exec();
        res.json({
            success: true,
            data:allMeal
        })
})

module.exports = router;