const express = require("express");
const isAuthenticated = require("../middleware/auth.js")
const router = express.Router();
const image = require("../models/image.js");
const singleUpload = require("../middleware/singleUpload.js")
const User = require("../models/user.model.js");
const Image = require("../models/image.js");

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
        const userId = JSON.parse(req.body.email); 

            singleUpload(req, res, async (err) => {
              if (err) {
                return res.status(400).json({ message: err.message });
              }
              const { originalname, buffer, mimetype } = req.file || {};
                if (originalname && buffer && mimetype) {
                    const image = new Image({
                        name: req.file.originalname,
                        images: {
                            data: req.file.buffer,
                            contentType: req.file.mimetype
                        }
                    });
                    await image.save();
                }
            })
            
        const user = await User.findOne({email:userId});
        if (!user) {
            return res.status(200).json({
                success: false,
                message: "User not found"
            });
        }
        // const userImage=await Image.findOne({user:userId})
        // if(userImage){
        //     userImage.images.push(image);
        //     await userImage.save();
        // } else {
        //     await Image.create({user:userId, images:image});
        // }
        
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
router.post('/getUsersPic', async (req, res) => {
    try {
        const userId = req.body.name; 
        console.log(req.body);
        const userImage=await Image.findOne({name:userId})
        // res.set('Content-Type', userImage.images.contentType);
        // res.send(userImage.images.data);
        res.json({
            contentType: userImage.images.contentType,
            imageData: userImage.images.data.toString('base64')
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