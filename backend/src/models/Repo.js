

const mongoose = require("mongoose");
const { _collectionName } = require("../utils");


const memberSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: _collectionName.User, requird: true },
    role: { type: String, enum: ['read', 'write', 'admin'], default: 'read' }
})


const repoSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: _collectionName.User, required: true },
    members: { type: [memberSchema], default: [] },
    deleted: { type: Boolean, default: false },
},
    {
        timestamps: true,
    })

const Repo = mongoose.model(_collectionName.Repo, repoSchema);

module.exports = Repo; 