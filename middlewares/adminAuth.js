const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const jwt_adminPass = process.env.adminJWTPassword;

function adminAuth(req, res, next) {
    const authHeader = req.headers.token;
    try {
        const decoded_Data = jwt.verify(authHeader, jwt_adminPass);
        req.adminID = decoded_Data.id;
        req.adminName = decoded_Data.adminName;
        next();
    } catch (e) {
        console.error("JWT Verification Error:", e.message); // Debugging
        res.status(403).json({ message: "Invalid or expired token" });
    }
}

module.exports = {
    adminAuth: adminAuth,
    jwt_adminPass: jwt_adminPass,
};