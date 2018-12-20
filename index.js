const express = require("express");
const mysql = require("mysql");
const { databaseConfig } = require("./config");
const { getInfo } = require("./routes/getVehicleInfo");
const { listAllVehicles } = require("./routes/vehicleList");

const app = express();

const database = mysql.createConnection({
  host: databaseConfig.host,
  user: databaseConfig.user,
  password: databaseConfig.password,
  database: databaseConfig.schema
});

// Connect the database
database.connect(err => {
  if (err) {
    throw err;
  }
  console.log("Connected to database");
});

// Initialized database as global object
global.database = database;

const port = 3000;

// Configured middleware for template engine
app.set("views", __dirname + "/views"); // set express to look in this folder to render the view
app.set("view engine", "ejs"); //configure template engine

// Configured middleware for body-parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // parse from data client

/**
 * All routes
 */

// app.get("/", (req, res) => {
//   res.render("partials/header.ejs");
// });

// GET and POST vehicle Info
app.get("/", (req, res) => {
  res.render("login.ejs");
});

app.get("/vehicle-info/:vehicle_number", getInfo);

app.get("/vehicles", listAllVehicles);

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
