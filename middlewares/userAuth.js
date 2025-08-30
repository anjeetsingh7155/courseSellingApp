const jwt = require('jsonwebtoken')
const dotenv = require("dotenv")
dotenv.config();
const jwt_userPass = process.env.userJWTPassword;

async function userAuth(req,res,next){
const token = await req.headers.token
    try {
        const decoded_Data = jwt.verify(token , jwt_userPass);
        req.userID = decoded_Data.id;
        req.userName = decoded_Data.userName;
        next();
    } catch (e) {
        console.error("JWT Verification Error:", e.message); // Debugging
        res.status(403).json({ message: "Invalid or expired token" });
    }
}


module.exports ={
    jwt_userPass : jwt_userPass,
    userAuth : userAuth
}