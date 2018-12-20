/**
 * This file runs two functions to grab the vehicle number
 * and find the vehicle ID and odometer
 */

// Load all modules
const { getPosition } = require("./vehicle-info/odometer.js");
const { getVehicleID } = require("./vehicle-info/vehicleID.js");
const { getPositionTenMinutely } = require("../lib/getPositionTenMinutely");

const getInfo = (req, res) => {
  // To get vehicle number from request body
  let vehicleNum = req.params.vehicle_number;
  // Get the vehicle id
  getVehicleID(vehicleNum, (err, id) => {
    if (err) {
      // To handle the error
      res.send("Vehicle ID cannot be found", err);
    } else {
      // pass the vehicle ID to get Odometer function
      let vehicleID = id;
      getPosition(vehicleID, (err, data) => {
        if (err) {
          // To handle the Error
          res.send("Vehicle Odometer cannot be found", err);
        } else {
          //  Render to view
          res.render("vehicle-info.ejs", {
            title: "Vehicle Info",
            vehicle_number: vehicleNum,
            vehicle_id: vehicleID,
            odometer: data.odometer,
            totalDistance: data.totalDistance
          });

          // Save it every ten minutes
          getPositionTenMinutely(vehicleID, vehicleNum);
        }
      });
    }
  });
};

module.exports = {
  getInfo
};
