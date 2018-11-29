const request = require("request");
const { email, password, token, server } = require("./config");

// Function to get Odometer list from server API
const getOdometerList = () => {
  let odometerArray = [];
  request(
    {
      url: `${server}/api/positions?token=${token}`,
      json: true
    },
    (err, response, body) => {
      if (err) {
        console.log(`Error: ${err}`);
      } else {
        for (let i = 0; i < body.length; i++) {
          let id = body[i].id;
          let odometer = body[i].attributes.odometer;
          odometerArray.push({
            id: id,
            odometer: odometer
          });
        }
      }
    }
  ).auth(email, password);
  // return odometerArray;
  console.log(odometerArray);
};

// Function to get odometer value from a specific car
const getOdometer = vehicleID => {
  let odometer = 0;
  let odometerList = getOdometerList();
  for (let i = 0; i < odometerList.length; i++) {
    if (odometerList[i].id === vehicleID) {
      odometer = odometerList[i].odometer;
    }
  }
  return odometer;
};

// console.log(getOdometer(7040422));
getOdometerList();

module.exports = {
  getOdometer
};
