// middleware/middleware.js
require('dotenv').config();
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            console.error("Token verification error:", err);
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        } else {
            console.log("login sucess")
        }
        req.user = decoded;
        next();
    });
};

module.exports = verifyToken;
