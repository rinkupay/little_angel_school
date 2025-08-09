const express = require("express");
const { uploadImages, getImages, deleteImage, getAllImagesByCategories }=require("../controllers/webImageController.js");
const upload = require("../middleware/uploader.js");

const router = express.Router();

router.post("/upload", upload.array("images", 10), uploadImages);
router.get("/images", getImages);
router.delete("/images/:id", deleteImage);

// PUBLIC ROUTES
router.route("/image-gallery").get(getAllImagesByCategories);

module.exports =  router;
