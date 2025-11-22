// // const multer = require('multer');

// // const storage = multer.memoryStorage();
// // const upload = multer({
// //   storage,
// //   limits: {
// //     fileSize: 5 * 1024 * 1024 // 5MB per file limit
// //   },
// //   fileFilter: (req, file, cb) => {
// //     // accept images only
// //     if (!file.mimetype.startsWith('image/')) {
// //       return cb(new Error('Only image files are allowed!'), false);
// //     }
// //     cb(null, true);
// //   }
// // });

// // module.exports = upload;





// // E:\SIH-25197\Final\backend\middleware\uploadMulter.js
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");

// // ensure uploads directory exists
// const UPLOAD_DIR = path.join(__dirname, "..", "uploads");
// try {
//   fs.mkdirSync(UPLOAD_DIR, { recursive: true });
// } catch (e) {
//   // ignore if exists
// }

// // disk storage with unique filename
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, UPLOAD_DIR);
//   },
//   filename: function (req, file, cb) {
//     // timestamp + random + original ext
//     const ext = path.extname(file.originalname) || "";
//     const basename = path.basename(file.originalname, ext).replace(/\s+/g, "_");
//     const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
//     cb(null, `${basename}-${uniqueSuffix}${ext}`);
//   },
// });

// const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// const fileFilter = (req, file, cb) => {
//   // accept images only
//   if (!file.mimetype.startsWith("image/")) {
//     return cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE", "Only image files are allowed"), false);
//   }
//   cb(null, true);
// };

// const upload = multer({
//   storage,
//   limits: {
//     fileSize: MAX_FILE_SIZE,
//   },
//   fileFilter,
// });

// // helpers for common usage
// module.exports = {
//   // single file named 'image' by default
//   single: (fieldName = "image") => upload.single(fieldName),

//   // multiple files (array) with field name 'images'
//   array: (fieldName = "images", maxCount = 5) => upload.array(fieldName, maxCount),

//   // fields: use when you have multiple named fields
//   fields: (fieldsArray) => upload.fields(fieldsArray),

//   // expose upload dir path so other modules can use it
//   uploadDir: UPLOAD_DIR,

//   // convenience middleware to convert Multer errors to normal next(err)
//   multerErrorHandler: (err, req, res, next) => {
//     if (err instanceof multer.MulterError) {
//       // handle Multer-specific errors
//       return res.status(400).json({ message: err.message, code: err.code });
//     }
//     // pass to default error handler
//     return next(err);
//   },
// };





// middleware/uploadMulter.js
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ensure uploads directory exists
const UPLOAD_DIR = path.join(__dirname, "..", "uploads");
try {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
} catch (e) {
  // ignore if exists
}

// disk storage with unique filename
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname) || "";
    const basename = path.basename(file.originalname, ext).replace(/\s+/g, "_");
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${basename}-${uniqueSuffix}${ext}`);
  },
});

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image/")) {
    return cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE", "Only image files are allowed"), false);
  }
  cb(null, true);
};

const upload = multer({
  storage,
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
  fileFilter,
});

// helpers for common usage
module.exports = {
  // single file named 'image' by default
  single: (fieldName = "image") => upload.single(fieldName),

  // multiple files (array) with field name 'images'
  array: (fieldName = "images", maxCount = 6) => upload.array(fieldName, maxCount),

  // fields: use when you have multiple named fields
  fields: (fieldsArray) => upload.fields(fieldsArray),

  // expose upload dir path
  uploadDir: UPLOAD_DIR,

  // convenience error handler (use in server error handler chain if desired)
  multerErrorHandler: (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: err.message, code: err.code });
    }
    return next(err);
  },
};
