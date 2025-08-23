const mongoose = require("mongoose");

const studentEnquirySchema = mongoose.Schema(
  {
    studentName: {
      type: String,
      
    },
    fatherName: {
      type: String,
      
    },
    dateOfBirth: {
      type: String,
      
    },
    gender:{
      type:String,
      
    },
    className: {
      type: String,
      
    },
    mobile: {
      type: Number,
      
    },
    address: {
      type: String,
      
    },

    createdBy: {
      adminId: {
        type: mongoose.Schema.ObjectId,
        ref: "Admin",
      },
      adminName: {
        type: String,
    
      },
    },
    isViewd:{
        type:Boolean,
        default:false
    }
  },
  { timestamps: true }
);

// Export the model
module.exports = mongoose.model("StudentEnquiry", studentEnquirySchema);
