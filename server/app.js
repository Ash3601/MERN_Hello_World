const dotenv = require("dotenv");
const express = require("express");
const app = express();
dotenv.config({ path: "./config.env" });
require("./db/conn");
const User = require("./model/userSchema");
const router = require("./router/auth");
const PORT = process.env.PORT;

// Middle Ware
// Read JSON
app.use(express.json());

// linked router files to keep routers in one place
app.use(router);

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});

module.exports = app;
