const express = require("express");
const isAuthenticated = require("../middleware/auth.js")
const router = express.Router();
const ProfilePic = require('../models/user.profile.js')
const singleUpload = require("../middleware/singleUpload.js")
const User = require("../models/user.model.js");
const Progress = require("../models/progress.js")

router.post('/addProfilePic', async (req, res) => {
    try {
        singleUpload(req, res, async (err) => {
        const user = JSON.parse(req.body.email); 
        const imgName = req.file.originalname;
        const img = {
            data: req.file.buffer,
            contentType: req.file.mimetype,
        };
        const userImage = await ProfilePic.findOne({ user });
        if (userImage) {
            await ProfilePic.findOneAndUpdate({user},{ imgName, img})
            await userImage.save();
        } else {
            const newProfilePic = new ProfilePic({ user, imgName, img });
            await newProfilePic.save();
        }
        res.status(201).json({success:true, message: 'Profile picture uploaded successfully' });
    })
    } catch (error) {
        console.error(error);
        res.status(500).json({success:false, error: 'An error occurred while uploading the profile picture' });
    }
});

// GET route to fetch a profile picture by user
router.post('/getProfilePic', async (req, res) => {
    try {
        const user =req.body.email;
        console.log(user);
        const profilePic = await ProfilePic.findOne({ user });

        if (!profilePic) {
            return res.status(404).json({ error: 'Profile picture not found' });
        }
        res.status(200).json({"success": true, data: profilePic.img})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching the profile picture' });
    }
});
router.post('/addUser',async(req,res)=>{
    try{
        console.log("REQ.BODY RECEIVED IS", req.body);
        const user = new User(req.body);
        await user.save();
    
        res.json({
            success:true,
            message:"user data is saved"
        })
    } catch(e){
        res.json({
            success:false,
            message:"user already exists"
        })
    }

});

router.post('/uploadpic', async (req, res) => {
    try {
        singleUpload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        const userId = JSON.parse(req.body.email); 
        const weight = JSON.parse(req.body.weight); 
        const user = await User.findOne({email:userId});
        if (!user) {
            return res.status(200).json({
                success: false,
                message: "User not found"
            });
        }
        const { originalname, buffer, mimetype } = req.file || {};
        if (originalname && buffer && mimetype) {
            const image = {
                name: originalname,
                img: {
                    data: buffer,
                    contentType: mimetype
                },
                weight
            };
            const userImage = await Progress.findOne({ user: userId });
            if (userImage) {
                userImage.images.push(image);
                await userImage.save();
            } else {
                await Progress.create({ user: userId, images: [image] });
            }
        }
        res.json({
            success: true,
            message: "User data is saved"
        });
    })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});
router.post('/getUsersPic', async (req, res) => {
    try {
        console.log("hiting getUserPic")
        const {email} = req.body; 
        console.log(req.body);
        const userImage=await Progress.findOne({user:email})
        console.log("user image is", (userImage) ? userImage.images : []);
        res.json({
            success: true,
            data:  (userImage) ? userImage.images : []             
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});
router.post('/getProgressWeight', async (req, res) => {
    try {
        const {email} = req.body; 
        const userImage=await Progress.findOne({user:email});
        let weight=[];
        userImage.images.filter((data)=>{
            weight.push(data.weight);
        })
        res.json({
            success: true,
            data: weight
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});
router.post('/addUserDiet', async (req, res) => {
    console.log(req.body);
    try {
        let {diet} = req.body;
        const userId = req.body.email; 

        const user = await User.findOneAndUpdate({email:userId}, {recommendedDiet:diet});

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        // diet={id:user.recommendedDiet.length+1,...diet}
        // user.recommendedDiet.push(diet);
        await user.save();

        res.json({
            success: true,
            message: "User data is saved"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});


router.post('/getUserDiet', async (req, res) => {
    try {
        const userId = req.body.email; 

        const user = await User.findOne({email:userId});

        if (!user) {
            return res.status(204).json({
                success: false,
                message: "User not found"
            });
        }
        // const index = user.recommendedDiet.indexOf({id:diet.id})
        // user.recommendedDiet.splice(index,1);
        await user.save();

        res.json({
            success: true,
            message: "success",
            data:user.recommendedDiet
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});


router.get('/allUser' , async(req,res)=>{
        const allUser = await User.find({isAdmin: false}).exec();
        res.json({
            success: true,
            data:allUser
        })
})

module.exports = router;