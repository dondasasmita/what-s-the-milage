/**
 * This file runs two functions to grab the vehicle number
 * and find the vehicle ID and odometer
 */

// Load all modules
const { getOdometer } = require("./vehicle-info/odometer.js");
const { getVehicleID } = require("./vehicle-info/vehicleID.js");

const getInfo = (req, res) => {
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
          res.render("vehicle-info.ejs", {
            vehicle_number: vehicleNum,
            vehicle_id: vehicleID,
            odometer: odometer
          });
        }
      });
    }
  });
};

module.exports = {
  getInfo
};