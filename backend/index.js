const express = require("express")
const cors = require("cors")
const server = express()
const dotnev = require("dotenv").config()
const PORT = process.env.PORT
const connection = require("./dbconfig/db")
const userRouter = require("./controllers/user.controller")
const productRouter = require("./controllers/product.controller")

server.use(cors())

// server.use(cors({
//     origin: "", 
//     methods: ["GET", "POST","PATCH","DELETE"], 
//     allowedHeaders: ["Content-Type", "Authorization"] 
// }));

server.get("/api",(req,res)=>{
    res.send("server is working fine")
})

server.use(express.json())
server.use("/api/auth",userRouter)
server.use("/api/products",productRouter)

server.listen(PORT,async()=>{
    try {
        await connection
        console.log("connected to database")
        console.log(`server is running on port ${PORT}`)
    } catch (error) {
        console.log(`failed to connect with database ${error}`)
    }
})

// POST - localhost:8080/api/auth/signup (all) - done
// POST - localhost:8080/api/auth/login (all)  - done
// POST - localhost:8080/api/auth/token (all)
// POST - localhost:8080/api/auth/logout (all)  - done
// GET - localhost:8080/api/auth/all-users (admin)  - done

// POST - localhost:8080/api/products (admin add product) 
// GET - localhost:8080/api/products (admin, seller, user can see all products) - done
// GET - localhost:8080/api/find-by-id/:id (admin, seller, user can see all products) 
// PATCH - localhost:8080/api/products/:id (admin can update product)
// DELETE - localhost:8080/api/products/:id (admin can delete product)

// POST - localhost:8080/api/products/product-add-seller (seller can add product in its own bucket)
// GET - localhost:8080/api/products/all-product-seller (seller can see all its products)
// PATCH - localhost:8080/api/products/update-product-seller/:id (seller can see update its products)
// DELETE - localhost:8080/api/products/delete-product-seller/:id (seller can see delete its products)





