
const mongoose = require("mongoose");
const { _collectionName, _user_type } = require("../utils");

const userSchema = new mongoose.Schema({

    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    role: { type: String, enum: Object.values(_user_type), default: _user_type.user },
    password: { type: String, required: true, trim: true },

},
    {
        timestamps: true
    })


const User = mongoose.model(_collectionName.User, userSchema);

module.exports = User; 