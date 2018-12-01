/**
 * This file handles request to API
 * and get the current odometer value of a given vehicle
 */

// Load all the modules
const request = require("request");
const { email, password, token, server } = require("../../config");

// Function to get Odometer list from server API
const getOdometer = (vehicleID, callback) => {
  request(
    {
      url: `${server}/api/positions?token=${token}`,
      json: true
    },
    (err, response, body) => {
      if (!err && response.statusCode == 200) {
        // get the Odometer and assign it to odometer variable
        let odometer;
        for (let i = 0; i < body.length; i++) {
          if (body[i].deviceId == vehicleID) {
            odometer = body[i].attributes.odometer;
          }
        }
        callback(undefined, odometer);
      } else {
        // To handle the error here
        console.log(`Error: ${err}`);
        callback(err);
      }
    }
  ).auth(email, password);
};

module.exports = {
  getOdometer
};
