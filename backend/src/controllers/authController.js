const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


module.exports.registerUser = async (req, res) => {

    try {

        const { name, email, role, password } = req.body;

        if (!name) {
            return res.status(400).json({ status: 400, message: "Name is required" });
        }

        if (!email) {
            return res.status(400).json({ status: 400, message: "Email is required" });
        }

        if (!password) {
            return res.status(400).json({ status: 400, message: "Password is required" });
        }

        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ status: 400, message: "User Already Registered" });
        }


        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({ name, email, password: hashPassword, role });

        const payload = { _id: newUser._id, name, email, role };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });

        const data = { ...payload, token }

        return res.status(200).json({ status: 200, message: "User registered Successfully", data: data });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
}

module.exports.loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ status: 400, message: "Email & password is requried" });
        }

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(400).json({ status: 400, message: "User not found! Register first " });
        }

        const isPasswordMatch = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordMatch) {
            return res.status(400).json({ status: 400, message: "Invalid Credentials" });
        }

        const payload = { _id: existingUser._id, name: existingUser.name, role: existingUser.role, email: existingUser.email };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
        const data = { ...payload, token };

        return res.status(200).json({ status: 200, message: "User logged in successfully", data: data });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
}