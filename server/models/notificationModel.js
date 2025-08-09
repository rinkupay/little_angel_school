const mongoose = require("mongoose");


const notificationSchema = new mongoose.Schema({

    messageType:{
        type:String,
    },

     messageTitle:{
        type:String,
        required:true,
    },
    messageContent:{
        type:String,
        required: true,
    },

    createdBy:{
        adminId:{
            type:mongoose.Schema.ObjectId,
            ref: "Admin",
        },
        adminName:{
            type:String,
        }
    }
   
},{timestamps:true});

module.exports = mongoose.model("WebNotification",notificationSchema);