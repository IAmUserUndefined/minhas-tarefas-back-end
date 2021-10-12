const express = require("express");

const cors = require("./middlewares/cors");

const routers = require("./router/index");

const app = express();

app.use(cors);
app.use(express.json());
app.use(routers);

module.exports = app;