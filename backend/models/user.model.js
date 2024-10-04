const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [2, "Name must be at least 2 characters"],
        maxlength: [50, "Name must be less than 50 characters"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters"]
    },
    age: {
        type: Number,
        min: [0, "Age cannot be less than 0"],
        max: [120, "Age cannot be more than 120"]
    },
    address: {
        type: String,
        maxlength: [100, "Address must be less than 100 characters"]
    },
    gender: {
        type: String,
        enum: {
            values: ["male", "female", "other"],
            message: "Gender must be either 'male', 'female', or 'other'"
        }
    },
    role:{
        type:String,
        required:true,
        enum:["admin","seller","user"],
        default:"user"
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
})

const userModel = mongoose.model("Registered-user",userSchema)

module.exports = userModel