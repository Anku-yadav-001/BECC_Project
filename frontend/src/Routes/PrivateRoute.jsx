import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import NotLoggedIn from "../Components/NotLoggedIn"


export function PrivateRoute({children}){
    const {isAuth} = useContext(AuthContext)
    const token = localStorage.getItem("accessToken")
    return token?children:<NotLoggedIn/>
}