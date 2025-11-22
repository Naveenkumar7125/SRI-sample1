// const Criminal = require('../models/Criminal');
// const { uploadBufferToCloudinary } = require('../services/cloudinaryService');

// /**
//  * Create new criminal record (Wanted or Missing)
//  * Expects multipart/form-data with fields:
//  * - status (Wanted|Missing) [required]
//  * - fullName [required]
//  * - age
//  * - contact
//  * - description
//  * - crimeOrReason (for Wanted)
//  * - reward (for Wanted)
//  * - lastSeenDateTime (ISO string) (for Missing)
//  * - lastSeenLocation (for Missing)
//  * - images[] (0..6) files
//  */
// async function createCriminal(req, res, next) {
//   try {
//     const {
//       status,
//       fullName,
//       age,
//       contact,
//       description,
//       crimeOrReason,
//       reward,
//       lastSeenDateTime,
//       lastSeenLocation
//     } = req.body;

//     if (!status || !['Wanted', 'Missing'].includes(status)) {
//       return res.status(400).json({ success: false, message: 'Invalid or missing status' });
//     }
//     if (!fullName) {
//       return res.status(400).json({ success: false, message: 'fullName is required' });
//     }

//     // Upload images (if any)
//     let imageUrls = [];
//     if (req.files && req.files.length > 0) {
//       if (req.files.length > 6) {
//         return res.status(400).json({ success: false, message: 'Max 6 images allowed' });
//       }
//       // Promise all uploads
//       const uploadPromises = req.files.map(f => uploadBufferToCloudinary(f.buffer, 'criminals'));
//       const uploadResults = await Promise.all(uploadPromises);
//       imageUrls = uploadResults.map(r => r.secure_url);
//     }

//     // Build the document
//     const doc = {
//       status,
//       fullName,
//       age,
//       contact,
//       description,
//       images: imageUrls
//     };

//     if (status === 'Wanted') {
//       if (crimeOrReason) doc.crimeOrReason = crimeOrReason;
//       if (reward) doc.reward = Number(reward) || 0;
//     } else if (status === 'Missing') {
//       if (lastSeenDateTime) {
//         const d = new Date(lastSeenDateTime);
//         if (!isNaN(d)) doc.lastSeenDateTime = d;
//       }
//       if (lastSeenLocation) doc.lastSeenLocation = lastSeenLocation;
//     }

//     const created = await Criminal.create(doc);
//     return res.status(201).json({ success: true, data: created });
//   } catch (err) {
//     next(err);
//   }
// }

// async function listCriminals(req, res, next) {
//   try {
//     // optional filters
//     const { status, q } = req.query;
//     const filter = {};
//     if (status) filter.status = status;
//     if (q) {
//       const re = new RegExp(q, 'i');
//       filter.$or = [{ fullName: re }, { description: re }, { crimeOrReason: re }, { lastSeenLocation: re }];
//     }
//     const docs = await Criminal.find(filter).sort({ createdAt: -1 });
//     res.json({ success: true, data: docs });
//   } catch (err) { next(err); }
// }

// async function getCriminalById(req, res, next) {
//   try {
//     const { id } = req.params;
//     const doc = await Criminal.findById(id);
//     if (!doc) return res.status(404).json({ success: false, message: 'Not found' });
//     return res.json({ success: true, data: doc });
//   } catch (err) { next(err); }
// }

// async function deleteCriminal(req, res, next) {
//   try {
//     const { id } = req.params;
//     const doc = await Criminal.findByIdAndDelete(id);
//     if (!doc) return res.status(404).json({ success: false, message: 'Not found' });
//     // NOTE: You may want to delete images from Cloudinary as well. For simplicity we keep images.
//     return res.json({ success: true, message: 'Deleted', data: doc });
//   } catch (err) { next(err); }
// }

// module.exports = {
//   createCriminal,
//   listCriminals,
//   getCriminalById,
//   deleteCriminal
// };




// controllers/criminalController.js
const path = require("path");
const Criminal = require("../models/Criminal");
const { uploadBufferToCloudinary } = require("../services/cloudinaryService");

/**
 * Create new criminal record (Wanted or Missing)
 * Expects multipart/form-data with fields:
 * - status (Wanted|Missing) [required]
 * - fullName [required]
 * - age
 * - contact
 * - description
 * - crimeOrReason (for Wanted)
 * - reward (for Wanted)
 * - lastSeenDateTime (ISO string) (for Missing)
 * - lastSeenLocation (for Missing)
 * - images[] (0..6) files
 */
async function createCriminal(req, res, next) {
  try {
    const {
      status,
      fullName,
      age,
      contact,
      description,
      crimeOrReason,
      reward,
      lastSeenDateTime,
      lastSeenLocation
    } = req.body;

    if (!status || !['Wanted', 'Missing'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid or missing status' });
    }
    if (!fullName) {
      return res.status(400).json({ success: false, message: 'fullName is required' });
    }

    // Upload images (if any)
    let imageUrls = [];
    // If files are saved to disk by multer, req.files may be array of files with path & buffer not present.
    // We handle two cases:
    // 1) If req.files exist and have .buffer -> upload to Cloudinary using buffer.
    // 2) If req.files exist and have .path -> we will convert to public /uploads path (local storage).
    if (req.files && req.files.length > 0) {
      if (req.files.length > 6) {
        return res.status(400).json({ success: false, message: 'Max 6 images allowed' });
      }

      // If Cloudinary creds provided, upload from buffer if buffer exists
      const uploadPromises = req.files.map(async (f) => {
        if (f.buffer && process.env.CLOUDINARY_API_KEY) {
          // Upload buffer to Cloudinary
          const r = await uploadBufferToCloudinary(f.buffer, 'criminals');
          return r.secure_url;
        } else if (f.path) {
          // multer stored file on disk; return public /uploads path
          return `/uploads/${path.basename(f.path)}`;
        } else {
          return null;
        }
      });

      const uploadResults = await Promise.all(uploadPromises);
      imageUrls = uploadResults.filter(Boolean);
    }

    // Build the document
    const doc = {
      status,
      fullName,
      age,
      contact,
      description,
      images: imageUrls
    };

    if (status === 'Wanted') {
      if (crimeOrReason) doc.crimeOrReason = crimeOrReason;
      if (reward) doc.reward = Number(reward) || 0;
    } else if (status === 'Missing') {
      if (lastSeenDateTime) {
        const d = new Date(lastSeenDateTime);
        if (!isNaN(d)) doc.lastSeenDateTime = d;
      }
      if (lastSeenLocation) doc.lastSeenLocation = lastSeenLocation;
    }

    const created = await Criminal.create(doc);
    return res.status(201).json({ success: true, data: created });
  } catch (err) {
    next(err);
  }
}

async function listCriminals(req, res, next) {
  try {
    // optional filters
    const { status, q } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (q) {
      const re = new RegExp(q, 'i');
      filter.$or = [{ fullName: re }, { description: re }, { crimeOrReason: re }, { lastSeenLocation: re }];
    }
    const docs = await Criminal.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, data: docs });
  } catch (err) { next(err); }
}

async function getCriminalById(req, res, next) {
  try {
    const { id } = req.params;
    const doc = await Criminal.findById(id);
    if (!doc) return res.status(404).json({ success: false, message: 'Not found' });
    return res.json({ success: true, data: doc });
  } catch (err) { next(err); }
}

async function deleteCriminal(req, res, next) {
  try {
    const { id } = req.params;
    const doc = await Criminal.findByIdAndDelete(id);
    if (!doc) return res.status(404).json({ success: false, message: 'Not found' });
    // NOTE: images in Cloudinary are not deleted here; you can add deletion logic if needed.
    return res.json({ success: true, message: 'Deleted', data: doc });
  } catch (err) { next(err); }
}

module.exports = {
  createCriminal,
  listCriminals,
  getCriminalById,
  deleteCriminal
};
