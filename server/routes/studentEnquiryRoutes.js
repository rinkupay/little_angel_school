const express = require("express");
const router = express.Router();
const { createStudentEnquiry,createPublicStudentEnquiry, getStudentEnquiry, getSingleStudentEnquiry, updateSingleStudentEnquiry, deleteSingleStudentEnquiry } = require("../controllers/studentEnquiryControllers");
const {isAuthenticatedUser,authorizeRole} = require("../middleware/authUser")



router.route("/student-create").post(isAuthenticatedUser,authorizeRole("admin","super"),createStudentEnquiry);  // ADMIN ROUTE
router.route("/student-enquiry").get(isAuthenticatedUser,authorizeRole("admin","super"),getStudentEnquiry);  // ADMIN ROUTE
router.route("/student-enquiry/:id").get(isAuthenticatedUser,authorizeRole("admin","super"),getSingleStudentEnquiry);  // ADMIN ROUTE
router.route("/student-enq/:id").patch(isAuthenticatedUser,authorizeRole("admin","super"),updateSingleStudentEnquiry).delete(isAuthenticatedUser,authorizeRole("admin","super"),deleteSingleStudentEnquiry);  // ADMIN ROUTE


router.route("/public-enquiry").post(createPublicStudentEnquiry)  // Public Routes










module.exports = router