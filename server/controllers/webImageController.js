const path =require("path");
const fs = require("fs");
const Image =  require("../models/imageModel.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");


// <<<<<<<<<<==========  UPLOAD IMAGES ==============>>>>>>>>>>>
exports.uploadImages = async (req, res) => {
  const { category } = req.query;

  if (!category) {
    return res.status(400).json({ success: false, message: "Category is required" });
  }

  try {
    const uploadedFiles = req.files.map((file) => `/uploads/${file.filename}`);

    // Save each image with its category
    const savedImages = await Image.insertMany(
      uploadedFiles.map((url) => ({
        category, // save category here
        url,
      }))
    );

    res.json({ success: true, images: savedImages });
  } catch (error) {
    console.error("Error uploading images:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};




// <<<<<<<<<<==========  GET IMAGES  ==============>>>>>>>>>>>
exports.getImages = async (req, res) => {
  try {
    const images = await Image.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


// <<<<<<<<<<==========  DELETE IMAGES ==============>>>>>>>>>>>
exports.deleteImage = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await Image.findById(id);
    if (!image) return res.status(404).json({ success: false, error: "Image not found" });

    // Ensure path is correct
    const imagePath = path.join(__dirname, "..", image.url);
    fs.unlink(imagePath, (err) => {
      if (err) console.warn("File not found on disk, deleting from DB only", err);
    });

    await Image.findByIdAndDelete(id);
    res.json({ success: true, message: "Image deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};



// <<<<<<<<<<==========  GET IMAGE TO WEBSITES ==============>>>>>>>>>>>


exports.getAllImagesByCategories = catchAsyncErrors(async (req, res) => {
  const { category } = req.query;

  let query = {};
  if (category) {
    // If category query param exists, filter by it
    query.category = category;
  }

  const images = await Image.find(query).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: images.length,
    images,
  });
});
