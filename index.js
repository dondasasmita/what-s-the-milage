const express = require("express");
// const { getOdometer } = require("./vehicle-info/odometer");
// const { getVehicleID } = require("./vehicle-info/vehicleID");
const { getInfo } = require("./routes/getVehicleInfo");

const app = express();

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

app.get("/", (req, res) => {
  res.render("get-vehicle-info");
});

// GET and POST vehicle Info
app.get("/vehicle-info", (req, res) => {
  res.render("get-vehicle-info");
});

app.post("/vehicle-info", getInfo);

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
