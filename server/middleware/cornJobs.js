// cronJobs.js
const cron = require("node-cron");
const { updateLateFeeOverDueFees } = require("./addLateFee");

const startCronJobs = () => {
  // Runs at 12:00 AM on the 1st of every month
  cron.schedule("0 0 11 * *", async () => {
    try {
      const result = await updateLateFeeOverDueFees();
      console.log(result.message);
    } catch (err) {
      console.error("Error applying late fees:", err);
    }
  });
};

module.exports = { startCronJobs };
