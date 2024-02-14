const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
app.use(express.json());

require("./bot");

app.listen(process.env.PORT, () => console.log("✅ Server is online"));
