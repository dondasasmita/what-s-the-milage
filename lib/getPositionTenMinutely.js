const { getPosition } = require("../routes/vehicle-info/odometer");
const { insertNewPosition } = require("../database/query");
const CronJob = require("cron").CronJob;

const getPositionTenMinutely = (vehicleId, vehicleNum) => {
  let scheduledTask = new CronJob("0 * * * *", () => {
    // Set as hourly
    getPosition(vehicleId, (err, data) => {
      if (err) {
        // To handle the Error
        console.log(`Error getting vehicle position : ${err}`);
      } else {
        // Insert To Database
        insertNewPosition(vehicleNum, vehicleId, data, result => {
          console.log(result);
        });
      }
    });
  });
  scheduledTask.start();
  console.log("Scheduled Task Started for '" + vehicleNum + "'");
};

module.exports = {
  getPositionTenMinutely
};
