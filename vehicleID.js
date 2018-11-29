/**
 * GET Vehicle ID from vehicle number / name requested by user
 * NOTE:
 */

// Load all dependencies
const request = require("request");
const { email, password, token, server } = require("./config");

// Function to get vehicle ID from vehicle number given
const getVehicleID = (vehicleNumber, callback) => {
  request(
    {
      url: `${server}/api/devices?token=${token}`,
      json: true
    },
    (err, response, body) => {
      if (!err && response.statusCode == 200) {
        let id;
        for (let i = 0; i < body.length; i++) {
          if (body[i].name === vehicleNumber) {
            id = body[i].id;
          }
        }
        callback(undefined, id);
      } else {
        // to handle the error
        callback("Unable to find vehicle ID");
      }
    }
  ).auth(email, password);
};

module.exports = {
  getVehicleID
};

// TEST RUN THE FUNCTION
// getVehicleID("SLHxxxZ", (err, result) => {
//   if (!err) {
//     console.log(result);
//   } else {
//     console.log(err);
//   }
// });
