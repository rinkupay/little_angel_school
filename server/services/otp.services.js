const axios = require("axios");

async function sendOtp({ otp, phoneNumber }) {
  try {
    const response = await axios.post(
      "https://www.fast2sms.com/dev/bulkV2",
      new URLSearchParams({
        variables_values: otp,     
        route: "otp",              
        numbers: phoneNumber,      
      }),
      {
        headers: {
          authorization: process.env.FAST2SMS_API_KEY, // keep in .env
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    // console.log("Response:", response.data);
    return response.data;
  } catch (err) {
    // console.error("Error:", err.response?.data || err.message);
    return err.response?.data || { message: "Failed to send SMS" };
  }
}

module.exports = { sendOtp };
