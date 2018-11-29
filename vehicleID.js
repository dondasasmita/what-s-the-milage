/**
 * GET Vehicle ID from vehicle number / name requested by user
 * NOTE:
 */

const request = require("request");
const { email, password, token, server } = require("./config");

// To create callback
const getVehicleID = (vehicleNumber, callback) => {
  request(
    {
      url: `${server}/api/devices?token=${token}`,
      json: true
    },
    (err, response, body) => {
      if (err) {
        console.log(`Err: ${err}`);
        console.log(response.statusCode);
      } else {
        console.log(response.statusCode);
        let data = body;
        for (let i = 0; i < data.length; i++) {
          if (data[i].name.toString() === vehicleNumber) {
            let id = data[i].id;
            console.log(id);
          }
        }
      }
    }
  ).auth(email, password);
};

// module.exports = {
//   getVehicleID
// };

// TEST RUN THE FUNCTION
console.log(getVehicleID("SKAxxxxc"));
