// const cloudinary = require('../config/cloudinaryConfig');
// const streamifier = require('streamifier');

// function uploadBufferToCloudinary(buffer, folder = 'criminals') {
//   return new Promise((resolve, reject) => {
//     const uploadStream = cloudinary.uploader.upload_stream(
//       { folder },
//       (error, result) => {
//         if (error) return reject(error);
//         resolve(result);
//       }
//     );
//     streamifier.createReadStream(buffer).pipe(uploadStream);
//   });
// }

// module.exports = { uploadBufferToCloudinary };



// // const cloudinary = require("cloudinary").v2;
// // const dotenv = require("dotenv");

// // dotenv.config(); // IMPORTANT — loads .env

// // // Full config
// // cloudinary.config({
// //   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
// //   api_key: process.env.CLOUDINARY_API_KEY,
// //   api_secret: process.env.CLOUDINARY_API_SECRET,
// //   secure: true
// // });

// // // Debug (Remove later)
// // console.log("Cloudinary Loaded:", {
// //   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
// //   api_key: process.env.CLOUDINARY_API_KEY ? "OK" : "MISSING",
// //   api_secret: process.env.CLOUDINARY_API_SECRET ? "OK" : "MISSING",
// // });

// // module.exports = cloudinary;





// E:\SIH-25197\Final\backend\services\cloudinaryService.js
const fs = require('fs');
const path = require('path');
const os = require('os');
const configCloudinary = require('../config/cloudinary'); // may be null
const { promisify } = require('util');

const writeFile = promisify(fs.writeFile);
const ensureDir = (dir) => {
  try { fs.mkdirSync(dir, { recursive: true }); } catch (e) {}
};

// Local uploads fallback directory (same as uploadMulter)
const UPLOAD_DIR = path.join(__dirname, '..', 'uploads');
ensureDir(UPLOAD_DIR);

/**
 * Upload a Buffer to Cloudinary if configured.
 * If Cloudinary isn't configured or upload fails, fallback to writing
 * the buffer to `backend/uploads` and return a local public path (/uploads/...)
 *
 * @param {Buffer} buffer
 * @param {string} folder optional folder name for Cloudinary
 * @returns {Promise<{ secure_url?: string, localPath?: string, public_id?: string }>}
 */
async function uploadBufferToCloudinary(buffer, folder = 'criminals') {
  // If Cloudinary is not configured, fallback to saving locally
  if (!configCloudinary) {
    // create a unique filename
    const fname = `fallback-${Date.now()}-${Math.floor(Math.random()*1e6)}.jpg`;
    const outPath = path.join(UPLOAD_DIR, fname);
    await writeFile(outPath, buffer);
    // Return object shape similar to Cloudinary upload result
    return { secure_url: `/uploads/${fname}`, localPath: outPath, public_id: null };
  }

  // If cloudinary is configured, upload via upload_stream
  return new Promise((resolve, reject) => {
    try {
      const stream = configCloudinary.uploader.upload_stream(
        { folder },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      stream.end(buffer);
    } catch (err) {
      // on error, fallback to local write
      try {
        const fname = `fallback-${Date.now()}-${Math.floor(Math.random()*1e6)}.jpg`;
        const outPath = path.join(UPLOAD_DIR, fname);
        fs.writeFileSync(outPath, buffer);
        resolve({ secure_url: `/uploads/${fname}`, localPath: outPath, public_id: null });
      } catch (e) {
        reject(err);
      }
    }
  });
}

/**
 * Optional helper to delete a Cloudinary public_id.
 * If Cloudinary not configured, returns a resolved promise.
 */
async function deleteByPublicId(publicId) {
  if (!configCloudinary) return { ok: false, message: 'Cloudinary not configured' };
  return new Promise((resolve, reject) => {
    configCloudinary.uploader.destroy(publicId, (err, res) => {
      if (err) return reject(err);
      resolve(res);
    });
  });
}

module.exports = {
  uploadBufferToCloudinary,
  deleteByPublicId,
};
