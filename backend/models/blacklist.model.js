const mongoose = require("mongoose")

const blacklistSchema = mongoose.Schema({
    token:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:3600
    }
})

const blacklistModel = mongoose.model("blacklist-token",blacklistSchema)

module.exports = blacklistModel