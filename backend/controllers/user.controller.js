const express = require("express")
const userRouter = express.Router()
const bcrypt = require("bcrypt")
const userModel = require("../models/user.model")
const SALT_ROUNDS = process.env.SALT_ROUNDS
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
const jwt = require("jsonwebtoken")
const checkAuth = require("../middlewares/checkAuth.middleware")
const checkUserRole = require("../middlewares/checkUserRole.middleware")
const blacklistModel = require("../models/blacklist.model")

userRouter.post("/signup",async(req,res)=>{
    const {name,email,password,address,age,gender,role} = req.body
    try {
        const isUserExist = await userModel.findOne({email})
        if(isUserExist){
           return res.json({
                message:"user already exist",
                status:409
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new userModel({
            name,
            email,
            password: hashedPassword,
            address,
            age,
            gender,
            role
        })
        await user.save()
        res.json({
            message:"user registered successfully",
            status:201,
            data:name
        })
    } catch (error) {
        res.json({
            message:"failed to register user",
            status:400,
            err:error.message
        })
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body
    try {
        const isUserExist = await userModel.findOne({email})
        if(!isUserExist){
            return res.json({
                message:"user not exist please register first",
                status:404
            })
        }

        const checkPassword = await bcrypt.compare(password,isUserExist.password)
        if(!checkPassword){
            return res.json({
                message:"invalid password",
                status:403
            })
        }

        // const token = await jwt.sign({userId:isUserExist._id,email,role:isUserExist.role},JWT_SECRET_KEY,{expiresIn:'1h'})
        const accessToken =jwt.sign({userId:isUserExist._id,role:isUserExist.role},process.env.JWT_SECRET_KEY,{expiresIn:'1h'})
        const refreshToken =jwt.sign({userId:isUserExist._id,role:isUserExist.role},process.env.JWT_SECRET_KEY,{expiresIn:'7d'})
        res.json({
            message:"user login successfully",
            status:200,
            accessToken,
            refreshToken,
            name:isUserExist.name,
            role:isUserExist.role
        })
    } catch (error) {
        res.json({
            message:"failed to login",
            status:400,
            err:error.message
        })
    }
})

userRouter.post("/token", async(req,res)=>{
    const { refreshToken } = req.body;
    if (!refreshToken) {
        return res.send("please provide refresh token")
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY)
        const newAccessToken = jwt.sign({userId:decoded.userId,role: decoded.role},process.env.JWT_SECRET_KEY,{expiresIn: '1h'})

        res.json({
            message: "Access token refreshed successfully",
            accessToken: newAccessToken
        });
    } catch (error) {
        res.send(`error occure ${error}`)
    }
});

userRouter.post("/logout",async(req,res)=>{
    try {
        const token = req.headers.authorization.split(" ")[1]
        if(!token){
            return res.send("please provide token")
        }
        const createBLT = blacklistModel({token})
        await createBLT.save()
        res.json({
            message:"user logout successfully",
            status:200
        })
    } catch (error) {
        res.json({
            message:"failed to logout user",
            status:500,
            err:error.message
        })
    }
})


userRouter.get("/all-users/",checkAuth,checkUserRole(["admin"]),async(req,res)=>{
    try {
        const users = await userModel.find()
        res.json({
            message:"list of all users",
            status:200,
            users
        })
    } catch (error) {
        res.json({
            message:"failed to list all user",
            status:400,
        })
    }
})



module.exports = userRouter