const express = require("express");
const bodyParser = require("body-parser");
const projectRouter = require("./routes/projectRoute");
const cors = require('cors');

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/project", projectRouter);

module.exports = app;