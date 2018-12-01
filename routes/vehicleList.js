const request = require("request");
const { email, password, token, server } = require("../config");

// Function to get all vehicle
const getAllVehicles = callback => {
  request(
    {
      url: `${server}/api/devices?token=${token}`,
      json: true
    },
    (err, response, body) => {
      if (!err && response.statusCode == 200) {
        // Store all vehicles in vehicles array
        let vehicles = [];
        for (let i = 0; i < body.length; i++) {
          vehicles.push({
            id: body[i].id,
            number: body[i].name,
            status: body[i].status,
            type: body[i].category,
            last_update: body[i].lastUpdate
          });
        }
        callback(undefined, vehicles);
      } else {
        // To handle error
        callback(err);
      }
    }
  ).auth(email, password);
};

// Function to list all vehicles and render the result
const listAllVehicles = (req, res) => {
  getAllVehicles((err, vehicles) => {
    if (!err) {
      res.render("list-all-vehicles.ejs", {
        vehicles: vehicles
      });
    }
  });
};

module.exports = {
  listAllVehicles
};

// TEST
// getAllVehicles((err, data) => {
//   if (!err) {
//     console.log(data);
//   } else {
//     console.log(err);
//   }
// });
