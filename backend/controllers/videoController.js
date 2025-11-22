// // controllers/video.controller.js
// const videoService = require("../services/video.service");

// const getAll = async (req, res, next) => {
//   try {
//     const { limit, skip, category } = req.query;
//     const filter = {};
//     if (category) filter.category = category;

//     const options = {
//       limit: Math.min(parseInt(limit) || 100, 1000),
//       skip: parseInt(skip) || 0,
//       sort: { timestamp: -1 },
//     };

//     const videos = await videoService.listVideos(filter, options);
//     res.json(videos);
//   } catch (err) {
//     next(err);
//   }
// };

// const getOne = async (req, res, next) => {
//   try {
//     const video = await videoService.getVideoById(req.params.id);
//     if (!video) return res.status(404).json({ message: "Video not found" });
//     res.json(video);
//   } catch (err) {
//     next(err);
//   }
// };

// const create = async (req, res, next) => {
//   try {
//     const body = req.body;
//     const created = await videoService.createVideo(body);
//     res.status(201).json(created);
//   } catch (err) {
//     // handle duplicate key error nicely
//     if (err.code === 11000) {
//       return res.status(409).json({ message: "Video already exists", details: err.keyValue });
//     }
//     next(err);
//   }
// };

// const update = async (req, res, next) => {
//   try {
//     const updated = await videoService.updateVideo(req.params.id, req.body);
//     if (!updated) return res.status(404).json({ message: "Video not found" });
//     res.json(updated);
//   } catch (err) {
//     next(err);
//   }
// };

// const remove = async (req, res, next) => {
//   try {
//     const removed = await videoService.deleteVideo(req.params.id);
//     if (!removed) return res.status(404).json({ message: "Video not found" });
//     res.json({ message: "Deleted", id: req.params.id });
//   } catch (err) {
//     next(err);
//   }
// };

// module.exports = {
//   getAll,
//   getOne,
//   create,
//   update,
//   remove,
// };





// backend/controllers/videoController.js
const Video = require("../models/Videos");

// GET /api/videos?limit=20&skip=0&category=weapon_detected
exports.getAll = async (req, res, next) => {
  try {
    const { limit = 100, skip = 0, category, cam_no } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (cam_no) filter.cam_no = cam_no;

    const videos = await Video.find(filter)
      .sort({ timestamp: -1 })
      .skip(Number(skip) || 0)
      .limit(Math.min(Number(limit) || 100, 1000))
      .lean();

    res.json(videos);
  } catch (err) {
    next(err);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id).lean();
    if (!video) return res.status(404).json({ message: "Video not found" });
    res.json(video);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const payload = req.body;
    if (!payload.video_url) {
      return res.status(400).json({ message: "video_url is required" });
    }

    const created = await Video.create(payload);
    res.status(201).json(created);
  } catch (err) {
    // duplicate key
    if (err.code === 11000) {
      return res.status(409).json({ message: "Video already exists", details: err.keyValue });
    }
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const updated = await Video.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).lean();

    if (!updated) return res.status(404).json({ message: "Video not found" });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const removed = await Video.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ message: "Video not found" });
    res.json({ message: "Deleted", id: req.params.id });
  } catch (err) {
    next(err);
  }
};
