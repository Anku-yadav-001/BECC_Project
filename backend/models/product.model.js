const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Product title is required"],
        minlength: [3, "Title must be at least 3 characters"],
        maxlength: [100, "Title can not exceed 100 characters"]
    },
    desc: {
        type: String,
        maxlength: [500, "Description can not exceed 500 characters"]
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price cannot be negative"],
    },
    stock: {
        type: Number,
        required: [true, "Stock is required"],
        min: [0, "Stock cannot be negative"]
    },
    category: {
        type: String,
        required: [true, "Category is required"],
        enum: {
            values: ["Electronics", "Clothing", "Home", "Beauty", "Books", "Sports"],
            message: "Category is not valid"
        }
    },
    brand: {
        type: String,
        required: [true, "Brand is required"],
        minlength: [2, "Brand name must be at least 2 characters"],
        maxlength: [50, "Brand name cannot exceed 50 characters"]
    },
    warranty: {
        type: Number, 
        min: [0, "Warranty cannot be negative"]
    },
    url: {
        type: String,
        required: [true, "Product image URL is required"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Registered-user"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const productModel = mongoose.model("Product",productSchema)

module.exports = productModel


