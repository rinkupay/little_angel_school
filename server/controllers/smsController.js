const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { sendOtp } = require("../services/otp.services");
const sendMail = require("../services/email.services");
const User = require("../models/userModel");
const crypto = require("crypto");
const {generateOtp} = require("../utils/otpGenerator");


// Route to send SMS
const sendSms = catchAsyncErrors(async (req, res) => {
  
  const { otp, phoneNumber } = req.body;
  if (!otp || !phoneNumber) {
    return res
      .status(400)
      .json({ message: "OTP and phone number are required" });
  }
  const response = await sendOtp({ otp, phoneNumber });
  
  if (response.status === "success") {
    return res.status(200).json({ message: "SMS sent successfully" });
  }
  return res
    .status(500)
    .json({ message: response.message || "Failed to send SMS" });
});



// Send Otp over Email
const sendOtpOverEmail = catchAsyncErrors(async(req,res) => {
  const {email} = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  const user = await User.findOne({email});
  if(!user){
    return res.status(400).json({message: "User not found"});
  }

  const otp = await generateOtp();
  const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

  user.otp = hashedOtp;
  user.otpExpires = Date.now() + 5 * 60 * 1000 ;

 await user.save();
// Send Over Email
await sendMail({
      email: user.email,
      subject: " OTP for Email Verification",
      message: `Your OTP is ${otp} (valid for 5 minutes)`, 

    });

 return res.status(200).json({
  message:`Otp sent to this ${email} `
 })

});

// Verify Email Otp
const verifyEmailOtp = catchAsyncErrors(async(req,res)=>{
  const {email,otp} =req.body;
  if(!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");
  if (user.otp !== hashedOtp || user.otpExpires < Date.now()) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }
  user.isEmailVerified = true; // Set email as verified
  user.otp = undefined; // Clear the OTP
  user.otpExpires = undefined; // Clear the expiration time
  await user.save();

  return res.status(200).json({ message: "Email verified successfully" });

})





module.exports = { sendSms,verifyEmailOtp,sendOtpOverEmail };
