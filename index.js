const express = require("express");
const { getOdometer } = require("./odometer");
const { getVehicleID } = require("./vehicleID");

const app = express();

const port = 3000;

// Configured middleware for body-parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // parse from data client

app.get("/get-odometer", (req, res) => {
  // To get vehicle number from request params or body
  // Get the vehicle id
  // pass the vehicle ID to get Odometer function
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
