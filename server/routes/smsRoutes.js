const  express = require("express");
const router = express.Router();
const { sendSms } = require("../controllers/smsController");
const { isAuthenticatedUser, authorizeRole } = require("../middleware/authUser");


router.route("/send-sms").post(isAuthenticatedUser,authorizeRole("super"),sendSms);


module.exports = router;