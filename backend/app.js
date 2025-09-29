
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const connectDB = require("./src/databases/dbConfig");
const routes = require("./src/routes");
require("dotenv").config();
const apiVersion = process.env.apiVersion;

app.use(cors());
app.use(express.json());


connectDB();

app.get("/", (req, res) => {
    return res.send("Welcome to the server");
})


app.use(apiVersion, routes);

app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
})