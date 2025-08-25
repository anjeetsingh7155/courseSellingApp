const jwt = require('jsonwebtoken')
const jwt_password = "hellomydearfriend@#$%^&*!@#$%^&*";

function auth(req,res,next){
const token = req.header.token
const decoded_Data = jwt.verify(token, jwt_password)
if(decoded_Data){
    req.userID = decoded_Data.id
 next()
} else{
    res.sendStatus(403).json({
        message : "User NOt Found"
    })
}
}

module.exports ={
    jwt_password : jwt_password,
    auth : auth
}