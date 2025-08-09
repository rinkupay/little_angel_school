const express = require("express");
const router = express.Router();

const {
  isAuthenticatedUser,
  authorizeRole,
} = require("../middleware/authUser");
const {
  addWebNotification,
  getWebNotifications,
  deleteWebNotification,
  updateWebNotification,
} = require("../controllers/webNotificationsController");

router
  .route("/notifications")
  .post(isAuthenticatedUser, authorizeRole("super"), addWebNotification)
  .get(isAuthenticatedUser, authorizeRole("super"), getWebNotifications);

router
  .route("/notifications/:id")
  .delete(isAuthenticatedUser, authorizeRole("super"), deleteWebNotification)
  .patch(isAuthenticatedUser, authorizeRole("super"),updateWebNotification);

  // PUBLIC ROUTES
  router.route("/school-notifications").get(getWebNotifications);

module.exports = router;
