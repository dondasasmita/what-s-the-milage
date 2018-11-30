const express = require("express");
const { getOdometer } = require("./vehicle-info/odometer");
const { getVehicleID } = require("./vehicle-info/vehicleID");

const app = express();

const port = 3000;

// Configured middleware for template engine
app.set("views", __dirname + "/views"); // set express to look in this folder to render the view
app.set("view engine", "ejs"); //configure template engine

// Configured middleware for body-parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // parse from data client

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/get-odometer", (req, res) => {
  // To get vehicle number from request body
  let vehicleNum = req.body.vehicle_number;
  // Get the vehicle id
  getVehicleID(vehicleNum, (err, id) => {
    if (err) {
      // To handle the error
      res.send("Vehicle ID cannot be found", err);
    } else {
      // pass the vehicle ID to get Odometer function
      let vehicleID = id;
      getOdometer(vehicleID, (err, odometer) => {
        if (err) {
          // To handle the Error
          res.send("Vehicle Odometer cannot be found", err);
        } else {
          res.send({
            vehicleID: vehicleID,
            odometer: odometer
          });
        }
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
