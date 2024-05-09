const {Router} = require('express')
const router = Router();
const userMiddleware = require('../middleware/user')
const jwt = require('jsonwebtoken')
const {jwtPassword} = require('../config')
const {User,Secret} = require('../db')

router.post('/signup',async (req,res)=>{
    //Implement user registration logic
    const username = req.body.username
    const password = req.body.password

    //check if a user with this username exists or not

    await User.create({
        username,
        password
    })

    res.json({
        msg : "user created sucssfully"
    })
})

router.post("/signin",async (req,res)=>{
    //implement user sign in logic
    const username = req.body.username
    const password = req.body.password

    //also check wheter user exists in the db or not
    const user = await User.find({
        username,
        password
    })

    if(user){
        var token = jwt.sign({username},jwtPassword);
        res.json({
            token
        })
    }else{
        res.status(411).json({
            msg : "Incorrect email and Password"
        })
    }
})

router.post('/dashboard',userMiddleware, async (req,res)=>{
    const username = req.username
    const title = req.body.title
    const message = req.body.message
    
    const user = await User.find({
        username
    })

    if(user){
        const secret = await Secret.create({
            title,
            message,
            userMsg : user._id
        })
    
        res.json({
            msg : 'SECRET CREATED SUCCESFULLY',secretId : secret._id
        })
    }else{
        res.status(411).json({
            msg : "Oops Something Went Wrong! Try Again"
        })
    }
    
})
router.get("/dashboard/allMsgs",userMiddleware,async (req,res)=>{
    //get all the user secrets
    const username = req.username
    const user = await User.find({
        username
    })

    const secrets = await Secret.find({
        userMsg : user._id
    })

    res.json({
        secrets
    })

})

module.exports = router