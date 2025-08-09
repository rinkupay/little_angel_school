const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const WebNotification = require("../models/notificationModel"); // adjust path to your model

// WEB NOTIFICATIONS
exports.addWebNotification = catchAsyncErrors(async (req, res, next) => {
    const { messageTitle, messageContent, messageType } = req.body;
    console.log(req.body)
    // Validation
    if (!messageTitle || !messageContent) {
        return next(new ErrorHandler("Message title and content are required", 400));
    }

    // Create notification
     await WebNotification.create({
        messageType: messageType || "General", // default type if not provided
        messageTitle: messageTitle,
        messageContent: messageContent,
        createdBy: {
            adminId: req.user ? req.user._id : null, // assuming req.admin is set
            adminName: req.user ? req.user.userName : "System"
        }
    });

    res.status(201).json({
        success: true,
        message: "Notification created successfully",
        
    });
});






// GET ALL WEB NOTIFICATIONS
exports.getWebNotifications = catchAsyncErrors(async (req, res, next) => {
    const notifications = await WebNotification.find()
        .sort({ createdAt: -1 }); // latest first

    res.status(200).json({
        success: true,
        count: notifications.length,
        notifications
    });
});




// DELETE WEB NOTIFICATION
exports.deleteWebNotification = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;

    const notification = await WebNotification.findById(id);

    if (!notification) {
        return next(new ErrorHandler("Notification not found", 404));
    }

    await notification.deleteOne();

    res.status(200).json({
        success: true,
        message: "Notification deleted successfully"
    });
});



// UPDATE WEB NOTIFICATION
// exports.updateWebNotification = catchAsyncErrors(async (req, res, next) => {
//     const { id } = req.params;
//     const { title, message, type } = req.body;
//     console.log(id)
//     console.log(req.body)


//     // Find existing notification
//     let notification = await WebNotification.findById(id);
//     console.log(notification)

//     if (!notification) {
//         return next(new ErrorHandler("Notification not found", 404));
//     }

//     // Update fields
//     notification.messageTitle = title || notification.messageTitle;
//     notification.messageContent = message || notification.messageContent;
//     notification.messageType = type || notification.messageType;

//     await notification.save();

//     res.status(200).json({
//         success: true,
//         message: "Notification updated successfully",
        
//     });
// });


// PATCH WEB NOTIFICATION
exports.updateWebNotification = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    console.log(id)
    console.log(req.body)

    // Find existing notification
    let notification = await WebNotification.findById(id);

    if (!notification) {
        return next(new ErrorHandler("Notification not found", 404));
    }

    // Update only the provided fields
    if (req.body.messageTitle !== undefined) {
        notification.messageTitle = req.body.messageTitle;
    }
    if (req.body.messageContent !== undefined) {
        notification.messageContent = req.body.messageContent;
    }
    if (req.body.messageType !== undefined) {
        notification.messageType = req.body.messageType;
    }

    await notification.save();

    res.status(200).json({
        success: true,
        message: "Notification updated successfully",
        notification
    });
});
