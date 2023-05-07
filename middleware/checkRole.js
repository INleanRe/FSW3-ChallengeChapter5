module.exports = (role) =>{
    return async function (req, res, next){
        if(req.user.role !== role){
            req.status(403).json({
                status:'failed',
                message:`unidentified ${role}`
            })
        }else{
            next()
        }
    }
}