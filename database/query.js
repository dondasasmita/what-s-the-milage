const insertNewPosition = (vehicleNum, vehicleId, data, callback) => {
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

  database.query(INSERT_VEHICLE_POSITION_QUERY, (err, OkPacket) => {
    if (err) {
      callback(`Error found: ${err}`);
    } else {
      callback(`Record ${vehicleNum} inserted on row: ${OkPacket.insertId}`);
    }
  });
};

module.exports = {
  insertNewPosition
};
