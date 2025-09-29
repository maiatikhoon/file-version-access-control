
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyAuth = async (req, res, next) => {

    try {

        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
            return res.status(400).json({ status: 400, message: "Token is missing" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({ _id: decoded._id });

        if (!user) {
            return res.status(401).json({ status: 401, message: "User not found" });
        }

        req.user = user;

        next();

    } catch (error) {
        console.log(error.message);
        return res.status(401).json({ status: 401, message: "Authentication failed ! Invalid Token" });
    }

}


module.exports = verifyAuth; 