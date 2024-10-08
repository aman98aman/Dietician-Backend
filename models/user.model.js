const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true
    },
    phoneNumber: {
        type: Number,
        unique: true
    },
    planExpiry: {type: Date},
    notifyCount: {type: Number},
    createdDt:{type: Date,default: Date.now},
    password: String,
    age: String,
    alcoholConsumption:String,
    allergies:String,
    bodyFatPercentage:String,
    bodyType:String,
    dietType:String,
    dailyBreakfast:String,
    dailyDinner:String,
    dailyLunch:String, 
    dmailySnacks:String,
    fitnessGoal:String,
    gender:String,
    gymDaysPerWeek:String,
    healthIssues:String,
    height:String,
    injuries:String,
    medicines:String,
    occupation:String,
    smoking:String,
    supplements:String,
    weight:String,
    currentPlan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plan'
    },
    workHours:String,
    workoutTime:String,
    isAdmin:{ type:Boolean, default:false},
    isUser:{ type:Boolean, default:true},
    recommendedDiet:{
        type:Array
    }
})

const Users = mongoose.model('Users', userSchema);

module.exports = Users;