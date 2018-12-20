const insertNewPosition = (vehicleNum, vehicleId, data) => {
  // Query to insert new vehicle position
  let INSERT_VEHICLE_POSITION_QUERY =
    "INSERT INTO `positions` (vehicle_number, vehicle_id, odometer, total_distance) VALUES ('" +
    vehicleNum +
    "','" +
    vehicleId +
    "', '" +
    data.odometer +
    "', '" +
    data.totalDistance +
    "')";

  return INSERT_VEHICLE_POSITION_QUERY;
};

module.exports = {
  insertNewPosition
};
