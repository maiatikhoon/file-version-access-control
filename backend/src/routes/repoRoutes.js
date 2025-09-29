
const express = require("express");
const verifyAuth = require("../middlewares/verifyAuth");
const { create, listRepo, inviteRepo, renameRepo, deleteRepo } = require("../controllers/repoController");
const verifyAdmin = require("../middlewares/verifyAdmin");

const repoRoutes = express.Router();


repoRoutes.post("/create", verifyAuth, create);
repoRoutes.get("/", verifyAuth, listRepo);
repoRoutes.post("/:repoId/invite", verifyAuth, verifyAdmin, inviteRepo);
repoRoutes.put("/:repoId", verifyAuth, verifyAdmin, renameRepo);
repoRoutes.delete("/:repoId", verifyAuth, verifyAuth, deleteRepo);



module.exports = repoRoutes; 