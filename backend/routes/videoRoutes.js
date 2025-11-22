// // routes/video.routes.js
// const express = require("express");
// const router = express.Router();
// const videoCtrl = require("../controllers/video.controller");

// // Collection-level
// router.get("/", videoCtrl.getAll);
// router.post("/", videoCtrl.create);

// // Individual
// router.get("/:id", videoCtrl.getOne);
// router.put("/:id", videoCtrl.update);
// router.delete("/:id", videoCtrl.remove);

// module.exports = router;




// backend/routes/videoRoutes.js
const express = require("express");
const router = express.Router();
const videoCtrl = require("../controllers/videoController");

// Collection routes
router.get("/", videoCtrl.getAll);
router.post("/", videoCtrl.create);

// Single resource routes
router.get("/:id", videoCtrl.getOne);
router.put("/:id", videoCtrl.update);
router.delete("/:id", videoCtrl.remove);

module.exports = router;
