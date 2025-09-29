const Repo = require("../models/Repo");
const User = require("../models/User");



module.exports.create = async (req, res) => {

    try {

        const { name } = req.body;
        const userId = req.user._id;

        const existingRepo = await Repo.findOne({ name, deleted: false });

        if (existingRepo) {
            return res.status(400).json({ message: "Repo with same name exist" });
        }

        const repo = await Repo.create({ name, owner: userId, members: [{ userId, role: "admin" }] });

        return res.status(200).json({ status: 200, message: "Repo created successfully", data: repo });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
}

module.exports.listRepo = async (req, res) => {

    try {

        const userId = req.user._id;

        const repo = await Repo.find({ "members.userId": userId, deleted: false });

        return res.status(200).json({ status: 200, message: "Repo found successfully", data: repo });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
}

module.exports.inviteRepo = async (req, res) => {

    try {

        const { email, role } = req.body;
        const userId = req.user._id;
        const { repo } = req.repo;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ status: 400, message: "User not found" });
        }

        const existing = repo.members.find(m => m.userId.toString() == userId.toString());

        if (existing) {
            existing.role = role;
        } else {
            repo.members.push({ userId: userId, role: role });
        }

        await repo.save();

        return res.status(200).json({ status: 200, message: `Invitation accepted for ${user.name}`, data: repo });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
}

module.exports.renameRepo = async (req, res) => {

    try {

        const { name } = req.body;
        const { repo } = req.repo;
        repo.name = name;

        await repo.save();
        return res.status(200).json({ status: 200, message: "Repo renamed successfully", data: repo });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
}

module.exports.deleteRepo = async (req, res) => {

    try {

        const repo = req.repo;
        repo.deleted = true; // Iam doing soft delete here 

        await repo.save();

        return res.statuss(200).json({ status: 200, message: "Repo deleted successfully", data: repo });

    } catch (error) {
        console.log(error.messge);
        return res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
}