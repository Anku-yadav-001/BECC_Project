
const checkUserRole = (roles)=>{
    return (req,res,next)=>{
        const userRole = req.user.role
        if(!roles.includes(userRole)){
            return res.json({
                message:"you have not premission to access this route",
                status:401
            })
        }
        next()
    }
}

module.exports = checkUserRole