const Repo = require("../models/Repo");


const verifyAdmin = async (req, res, next) => {

    try {

        const { repoId } = req.params;
        const userId = req.user._id;

        const repo = await Repo.findOne({ _id: repoId, deleted: false });
        if (!repo) {
            return res.status(400).json({ status: 400, messge: "Repo not Found" });
        }

        const isMember = repo.members.find((m) => m.userId.toString() == userId.toString());

        if (!isMember || isMember.role != "admin") {
            return res.status(400).json({ status: 400, message: 'User should be admin' });
        }

        req.repo = repo;
        next();

    } catch (error) {
        console.log(error.message);
    }
}

module.exports = verifyAdmin; 