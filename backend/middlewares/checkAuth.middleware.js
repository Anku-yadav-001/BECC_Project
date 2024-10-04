const jwt = require("jsonwebtoken")
const blacklistModel = require("../models/blacklist.model")
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

const checkAuth = async(req, res,next)=>{
    const authHeader = req.headers.authorization
    if(!authHeader){
        return res.json({
            message:"please provide token",
            status:404
        })
    }
    const token = authHeader.split(" ")[1]
    const isPresentInBlackList = await blacklistModel.findOne({token})
            if(isPresentInBlackList){
                    return res.send("token expired,please login again")
            }

    jwt.verify(token,JWT_SECRET_KEY,(error,decoded)=>{
        console.log(error)
        if(error){
            return res.json({
                message:"Invalid token,unauthoiezed access",
                status:401
            })
        }
        console.log(decoded)
        req.user = decoded
        next()
    })
}

module.exports = checkAuth