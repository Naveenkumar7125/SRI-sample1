// // const express = require('express');
// // const router = express.Router();
// // const upload = require('../middleware/uploadMulter');
// // const controller = require('../controllers/criminalController');

// // /**
// //  * POST /api/criminals
// //  * multipart/form-data:
// //  * fields: status, fullName, age, contact, description, crimeOrReason, reward, lastSeenDateTime, lastSeenLocation
// //  * files: images (array, max 6)
// //  */
// // router.post('/', upload.array('images', 6), controller.createCriminal);

// // // GET /api/criminals?status=Wanted&q=name
// // router.get('/', controller.listCriminals);

// // // GET single
// // router.get('/:id', controller.getCriminalById);

// // // DELETE single
// // router.delete('/:id', controller.deleteCriminal);

// // module.exports = router;





// // E:\SIH-25197\Final\backend\routes\criminalRoutes.js
// const express = require("express");
// const router = express.Router();
// const path = require("path");
// const uploadMulter = require("../middleware/uploadMulter");

// // NOTE: Replace the following mock store with your real Mongoose model logic.
// const mockDB = []; // temporary in-memory store for demonstration

// // GET all criminals (demo)
// router.get("/", (req, res) => {
//   res.json({ ok: true, data: mockDB });
// });

// // POST create new criminal with optional image upload
// // Use field name 'image' from multipart/form-data
// router.post("/", uploadMulter.single("image"), (req, res, next) => {
//   try {
//     const { name, description } = req.body;
//     const record = {
//       id: mockDB.length + 1,
//       name: name || "Unknown",
//       description: description || "",
//       createdAt: new Date(),
//     };

//     if (req.file) {
//       // save file path relative to server URL
//       // e.g. /uploads/filename.jpg
//       const publicPath = `/uploads/${path.basename(req.file.path)}`;
//       record.image = publicPath;
//     }

//     mockDB.push(record);

//     return res.status(201).json({ ok: true, data: record });
//   } catch (err) {
//     return next(err);
//   }
// });

// // Example: GET /api/criminals/:id
// router.get("/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const rec = mockDB.find((r) => r.id === id);
//   if (!rec) return res.status(404).json({ ok: false, message: "Not found" });
//   res.json({ ok: true, data: rec });
// });

// module.exports = router;



// routes/criminalRoutes.js
const express = require("express");
const router = express.Router();
const uploadMulter = require("../middleware/uploadMulter");
const controller = require("../controllers/criminalController");

// GET /api/criminals
router.get("/", controller.listCriminals);

// GET /api/criminals/:id
router.get("/:id", controller.getCriminalById);

// POST create (multipart/form-data, field name 'images' for multiple files)
router.post("/", uploadMulter.array("images", 6), controller.createCriminal);

// DELETE
router.delete("/:id", controller.deleteCriminal);

module.exports = router;
