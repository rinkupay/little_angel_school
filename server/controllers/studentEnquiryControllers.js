const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Student = require("../models/studentEnquiryModel");


// <<<<<<<<<<<<============ CREATE STUDENT ENQUIRY ================>>>>>>>>>>>>>>>>>>>>

exports.createStudentEnquiry = catchAsyncErrors(async (req, res) => {
  const { studentName, fatherName,gender, dateOfBirth, className, mobile, address } =
    req.body;

 

  try {
    const student = await Student.create({
      studentName,
      fatherName,
      gender,
      dateOfBirth,
      className,
      mobile,
      address,
      createdBy: { adminName: req.user.userName, adminId: req.user._id },
    });

    return res.status(201).json({
      success: true,
      message: "Student added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }

});



// <<<<<<<<<<<<============ CREATE STUDENT PUBLIC  ENQUIRY ================>>>>>>>>>>>>>>>>>>>>

exports.createPublicStudentEnquiry = catchAsyncErrors(async (req, res) => {
  const { name, fatherName,gender, dateOfBirth, className, mobile, address } =
    req.body;

 

  try {
    const student = await Student.create({
      studentName:name,
      fatherName,
      gender,
      dateOfBirth,
      className,
      mobile,
      address,
      
    });

    return res.status(201).json({
      success: true,
      message: "Student added successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }

});




// <<<<<<<<<<<<============ GET ALL STUDENT ENQUIRY ================>>>>>>>>>>>>>>>>>>>>

exports.getStudentEnquiry = catchAsyncErrors(async (req, res) => {
  const { studentName } = req.query;
  // If studentName is provided, filter by it
  const filter = studentName ? { studentName: { $regex: studentName, $options: "i" } } : {};
  // Fetch all students with the filter
  const students = await Student.find(filter).sort({ createdAt: -1 });

  if (!students) {
    return res.status(500).json({
      success: false,
      message: "Students not found",
    });
  } 
  return res.status(200).json({
    success: true,
    students,
  });
});

 





// <<<<<<<<<<<<============ GET SINGLE STUDENT ================>>>>>>>>>>>>>>>>>>>>

exports.getSingleStudentEnquiry = catchAsyncErrors(async (req, res) => {
  const {id} = req.params



  try {
    const student = await Student.findById(id);
    if (!student) {
      return res.status(500).json({
        success: false,
        message: "Students not found",
      });
    }

    return res.status(201).json({
      success: true,
      student,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }

});



// <<<<<<<<<<<<============ UPDATE SINGLE STUDENT ================>>>>>>>>>>>>>>>>>>>>

exports.updateSingleStudentEnquiry = catchAsyncErrors(async (req, res) => {
  const { id } = req.params;

  // Find and update the student by ID
  const student = await Student.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

  if (!student) {
    return res.status(404).json({
      success: false,
      message: "Student not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Updated successfully",

  });
});




// <<<<<<<<<<<<============ DELETE SINGLE STUDENT ================>>>>>>>>>>>>>>>>>>>>

exports.deleteSingleStudentEnquiry = catchAsyncErrors(async (req, res) => {
  const { id } = req.params;

  // Find and update the student by ID
  const student = await Student.findByIdAndDelete(id);

  if (!student) {
    return res.status(404).json({
      success: false,
      message: "Student not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Student deleted successfully",
 
  });
});
