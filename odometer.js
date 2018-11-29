const request = require("request");
const { email, password, token, server } = require("./config");

// Function to get Odometer list from server API
const getOdometer = (vehicleID, callback) => {
  request(
    {
      url: `${server}/api/positions?token=${token}`,
      json: true
    },
    (err, response, body) => {
      if (!err && response.statusCode == 200) {
        // get the Odometer
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
      }
    }
  ).auth(email, password);
};

// TEST THE FUNCTION
// getOdometer(225, (err, result) => {
//   console.log(result);
// });

module.exports = {
  getOdometer
};
