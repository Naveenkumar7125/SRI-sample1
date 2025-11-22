// const cloudinary = require('cloudinary').v2;
// const dotenv = require('dotenv');
// dotenv.config();

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key:    process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
//   secure:     true
// });

// module.exports = cloudinary;




// E:\SIH-25197\Final\backend\config\cloudinary.js
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
const hasEnv = process && process.env;

dotenv.config();

// Configure only if credentials are present
const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || "";
const API_KEY = process.env.CLOUDINARY_API_KEY || "";
const API_SECRET = process.env.CLOUDINARY_API_SECRET || "";

if (CLOUD_NAME && API_KEY && API_SECRET) {
  cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET,
    secure: true,
  });
  module.exports = cloudinary;
} else {
  // Export a stub object to avoid throwing require-time errors.
  // The service layer will check process.env and handle fallback.
  module.exports = null;
}
