const axios = require("axios");

async function sendSMS({ message, phoneNumber }) {
  try {
    const response = await axios.post(
      "https://www.fast2sms.com/dev/bulkV2",
      new URLSearchParams({
        message,                     // Your message text
        route: "dlt",                // DLT route
        sender_id: "SCHLID",         // Your approved Sender ID
        numbers: phoneNumber,        // Mobile numbers
      }),
      {
        headers: {
          authorization: process.env.FAST2SMS_API_KEY,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log("Response:", response.data);
  } catch (err) {
    console.error("Error:", err.response?.data || err.message);
  }
}

module.exports = { sendSMS };
