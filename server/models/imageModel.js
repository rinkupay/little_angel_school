const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    category:{type:String,required:true},
    url: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Image",imageSchema);
