const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { sendOtp } = require("../services/sms.services");

// Route to send SMS
const sendSms = catchAsyncErrors(async (req, res) => {
  const { otp, phoneNumber } = req.body;
    if (!otp || !phoneNumber) {
    return res.status(400).json({ message: "OTP and phone number are required" });
  }
    await sendOtp({ otp, phoneNumber });
    res.status(200).json({ message: "SMS sent successfully" });
});

// Export the route
module.exports = { sendSms };