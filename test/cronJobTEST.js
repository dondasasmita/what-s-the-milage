const CronJob = require("cron").CronJob;

console.log("Before job instantiation");
const job = new CronJob("1/10 * * * * *", function() {
  const d = new Date();
  console.log("At 10 Minutes:", d.getMilliseconds());
});
console.log("After job instantiation");
job.start();
