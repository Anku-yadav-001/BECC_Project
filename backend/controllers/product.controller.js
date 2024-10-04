const express = require("express")
const productModel = require("../models/product.model")
const checkAuth = require("../middlewares/checkAuth.middleware")
const checkUserRole = require("../middlewares/checkUserRole.middleware")
const productRouter = express.Router()

productRouter.post("/",checkAuth,checkUserRole(["admin"]),async(req,res)=>{
    const {title,desc,price,stock,category,brand,warranty,url}  = req.body
    console.log(req.user)
    try {
        const product = productModel({
            title,
            desc,
            price,
            stock,
            category,
            brand,
            warranty,
            url,
            user:req.user.userId
        })
        await product.save()
        res.json({
            message:"product added succesfully",
            status:201
        })
    } catch (error) {
        res.json({
            message:"failed to add product",
            status:400,
            err:error.message
        })
    }
})
productRouter.get("/", checkAuth, checkUserRole(["admin", "user", "seller"]), async (req, res) => {
    const { page = 1, limit = 9, title, price, category, brand } = req.query;
    try {
      const query = {};
  
      if (title) {
        query.title = new RegExp(title, "i");
      }
      if (category) {
        query.category = new RegExp(category, "i");
      }
      if (brand) {
        query.brand = new RegExp(brand, "i");
      }
      
      if (price) {
        if (price === 'low') {
          query.price = { $lt: 200 }; 
        } else if (price === 'high') {
          query.price = { $gte: 200 }
        }
      }
  
      const totalDocuments = await productModel.countDocuments(query);
  
      const products = await productModel.find(query)
        .skip((page - 1) * limit)
        .limit(Number(limit));
      console.log(products)
      res.json({
        message: "list of all products",
        status: 200,
        products,
        totalDocuments,
        currentPage: Number(page),
        totalPages: Math.ceil(totalDocuments / limit),
      });
    } catch (error) {
      res.json({
        message: "failed to list products",
        status: 400,
        err: error.message,
      });
    }
  });
  
productRouter.get("/find-by-id/:id",checkAuth,checkUserRole(["admin","user","seller"]),async(req,res)=>{
    const {id} = req.params
    try {
        const products = await productModel.findById({_id:id})
        res.json({
            message:"list of all products",
            status:202,
            products
        })
    } catch (error) {
        res.json({
            message:"failed to list products",
            status:400,
            err:error.message
        })
    }
})
productRouter.patch("/:id",checkAuth,checkUserRole(["admin"]),async(req,res)=>{
    const {id} = req.params
    try {
        const isProductPresentInDb = await productModel.findById({_id:id})
        if(!isProductPresentInDb){
            return res.json({
                message:"product not exist in DB",
                status:404
            })
        }
        await productModel.findByIdAndUpdate({_id:id},req.body)
        res.json({
            message:"product updated successfully",
            status:200
        })
    } catch (error) {
        res.json({
            message:"failed to update product",
            status:400,
            err:error.message
        })
    }
})

productRouter.delete("/:id",checkAuth,checkUserRole(["admin"]),async(req, res)=>{
    const {id} = req.params
    try {
        const isProductPresentInDb = await productModel.findById({_id:id})
        if(!isProductPresentInDb){
            return res.json({
                message:"product not exist in DB",
                status:404
            })
        }
        await productModel.findByIdAndDelete({_id:id})
        res.json({
            message:"product deleted successfully",
            status:200
        })
    } catch (error) {
        res.json({
            message:"failed to delete product",
            status:400,
            err:error.message
        })
    }
})


productRouter.post("/product-add-seller",checkAuth,checkUserRole(["seller"]),async(req,res)=>{
    const {title,desc,price,stock,category,brand,warranty,url}  = req.body
    try {
        const product = productModel({
           title,
           desc,
           price,
           stock,
           category,
           brand,
           warranty,
           url,
           user:req.user.userId
        })
        await product.save()
        res.json({
            message:"product added successfully",
            status:201
        })
    } catch (error) {
        res.json({
            message:"failed to add product",
            status:500,
            err:error.message
        })
    }
})



productRouter.get("/all-product-seller",checkAuth,checkUserRole(["seller"]),async(req,res)=>{
    try {
        const products = await productModel.find({user:req.user.userId}).populate("user")
        res.json({
            message:"list of all products",
            status:200,
            products
        })
    } catch (error) {
        res.json({
            message:"failed to list all products",
            status:500,
            err:error.message
        })
    }
})


productRouter.patch("/update-product-seller/:id",checkAuth,checkUserRole(["seller"]),async(req,res)=>{
    const {id} = req.params
    try {
        const isProductExists = await productModel.findById({_id:id,user:req.user.userId},req.body)
        if(!isProductExists){
            return res.send("product not exists")
        }
        await productModel.findByIdAndUpdate({_id:id},req.body)
        res.json({
            message:"product updated successfully"
        })
    } catch (error) {
        res.json({
            message:"failed to update product",
            status:500,
            err:error.message
        })
    }
})

productRouter.delete("/product-delete-seller/:id",checkAuth,checkUserRole(["seller"]),async(req,res)=>{
    const {id} = req.params
    try {
        const isProductExists = await productModel.findById({_id:id,user:req.user.userId})
        if(!isProductExists){
            return res.send("product not exists")
        }
        await productModel.findByIdAndDelete({_id:id},req.body)
        res.json({
            message:"product deleted successfully"
        })
    } catch (error) {
        res.json({
            message:"failed to delete product",
            status:500,
            err:error.message
        })
    }
})

module.exports = productRouter