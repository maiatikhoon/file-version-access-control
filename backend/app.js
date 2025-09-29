
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const connectDB = require("./src/databases/dbConfig");
require("dotenv").config();

app.use(cors());
app.use(express.json());


connectDB();

app.get("/", (req, res) => {
    return res.send("Welcome to the server");
})

app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
})