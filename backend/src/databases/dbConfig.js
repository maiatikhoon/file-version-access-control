
const mongoose = require("mongoose");


async function connectDB() {

    try {

        await mongoose.connect(process.env.MONGO_URI);
        console.log("database connected successfully!");

    } catch (error) {
        console.log("error connecting database", error.message);
    }
}

module.exports = connectDB; 