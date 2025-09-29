

const express = require("express");
const authRoutes = require("./authRoutes");
const repoRoutes = require("./repoRoutes");
const uploadRoutes = require("./upload");

const routes = express.Router();


routes.use("/auth", authRoutes);
routes.use("/repo", repoRoutes);
routes.use("/upload", uploadRoutes);

module.exports = routes; 