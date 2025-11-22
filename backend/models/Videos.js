// const mongoose = require("mongoose");

// const videoSchema = new mongoose.Schema(
//   {
//     video_url: { type: String, required: true, unique: true },
//     category: { type: String },
//     cam_no: { type: String },
//     location: { type: String },
//     timestamp: { type: Date },
//   },
//   {
//     timestamps: true,
//   }
// );

// // Use exact collection name 'videos' (third arg)
// module.exports = mongoose.model("Video", videoSchema, "videos");




// backend/models/Videos.js
const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    video_url: { type: String, required: true, unique: true },
    category: { type: String },
    cam_no: { type: String },
    location: { type: String },
    timestamp: { type: Date },
  },
  {
    timestamps: true,
  }
);

// Model name "Video", but explicit collection name 'videos' (third arg)
module.exports = mongoose.model("Video", videoSchema, "videos");
