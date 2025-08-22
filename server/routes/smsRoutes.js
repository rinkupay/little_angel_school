const  express = require("express");
const router = express.Router();
const { sendSms,sendOtpOverEmail,verifyEmailOtp } = require("../controllers/smsController");
const { isAuthenticatedUser, authorizeRole } = require("../middleware/authUser");


router.route("/send-sms").post(isAuthenticatedUser,authorizeRole("super"),sendSms);
router.route("/send-otp-email").post(isAuthenticatedUser,authorizeRole("user","admin","super"),sendOtpOverEmail); // Route to send OTP over email
router.route("/verify-email-otp").post(verifyEmailOtp);

module.exports = router;