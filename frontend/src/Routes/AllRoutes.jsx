import { Routes, Route } from "react-router-dom"
import { Login } from "../Pages/Login.jsx"
import { Home } from "../Pages/Home.jsx"
import { Register } from "../Pages/Register.jsx"
import { Products } from "../Pages/Products.jsx"
import { Users } from "../Pages/Users.jsx"
import { PrivateRoute } from "./PrivateRoute.jsx"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext.jsx"
import { AdminAccess } from "../Components/AdminAccess.jsx"
import AddProduct from "../Pages/AddProduct.jsx"

export function AllRoutes() {
    const role = localStorage.getItem("role")
    return <>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products" element={
                <PrivateRoute>
                    <Products />
                </PrivateRoute>
            } />
            <Route path="/users" element={
                <PrivateRoute>
                    {role == "admin" ? <Users /> : <AdminAccess />}
                </PrivateRoute>
            } />
            <Route path="/add-product" element={
                <PrivateRoute>
                    <AddProduct/>
                </PrivateRoute>
            }/>
        </Routes>
    </>
}
