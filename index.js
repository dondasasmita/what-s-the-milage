const express = require("express");
const request = require("request");
const { email, password, token, server } = require("./config");
const { getOdometer } = require("./odometer");
const { getVehicleID } = require("./vehicleID");

const app = express();

const port = 3000;

// Configured middleware for body-parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // parse from data client

app.get("/get-odometer", (req, res) => {
  // to get vehicle ID
  let vehicleID = getVehicleID(req.body.number);
  // pass the vehicle ID to getOdometer function
  let odometer = getOdometer(vehicleID);
  res.send({
    vehicleID: vehicleID,
    odometer: odometer
  });
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
