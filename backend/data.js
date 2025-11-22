
// // // summarize-model.js
// // // Usage: node summarize-model.js   (or import the model from another file)

// // const mongoose = require('mongoose');

// // // --- Replace with your connection string (or use an env var) ---
// // const MONGO_URI = 'mongodb+srv://naveenkumart906_db_user:JrY0q4QoPtIhGRfz@nk.wpf1cvv.mongodb.net/SRI?retryWrites=true&w=majority&appName=NK';

// // // --- Connect to MongoDB ---
// // async function connectDB() {
// //   try {
// //     await mongoose.connect(MONGO_URI, {
// //       useNewUrlParser: true,
// //       useUnifiedTopology: true,
// //     });
// //     console.log('MongoDB connected ✅');
// //   } catch (err) {
// //     console.error('MongoDB connection error:', err);
// //     process.exit(1);
// //   }
// // }

// // // --- Schema definition ---
// // const SummarizeSchema = new mongoose.Schema(
// //   {
// //     // name of the video file
// //     video_file: {
// //       type: String,
// //       required: true,
// //       trim: true,
// //     },

// //     // array of image URLs (strings) — must be exactly length 5
// //     img_url: {
// //       type: [String],
// //       validate: {
// //         validator: function (arr) {
// //           // allow exactly 5 entries; change to arr.length <= 5 if you want up-to-5
// //           return Array.isArray(arr) && arr.length === 5;
// //         },
// //         message: 'img_url must be an array of exactly 5 strings.',
// //       },
// //       required: true,
// //     },

// //     // timeline points as strings — must be exactly length 5 (aligned with img_url)
// //     time_line: {
// //       type: [String],
// //       validate: {
// //         validator: function (arr) {
// //           return Array.isArray(arr) && arr.length === 5;
// //         },
// //         message: 'time_line must be an array of exactly 5 strings.',
// //       },
// //       required: true,
// //     },

// //     // video length in seconds (integer)
// //     video_len: {
// //       type: Number,
// //       required: true,
// //       min: [0, 'video_len cannot be negative'],
// //     },

// //     // summary / report text
// //     sum_rep: {
// //       type: String,
// //       required: true,
// //       trim: true,
// //     },
// //   },
// //   {
// //     timestamps: true,
// //     collection: 'summarize', // force collection name
// //   }
// // );

// // // Optionally add an index if you expect to query by video_file often
// // SummarizeSchema.index({ video_file: 1 });

// // // --- Model ---
// // const Summarize = mongoose.model('Summarize', SummarizeSchema);

// // // --- Example: create a sample document ---
// // async function createSample() {
// //   await connectDB();

// //   try {
// //     const sample = {
// //       video_file: 'example_video.mp4',
// //       img_url: [
// //         'https://example.com/img1.jpg',
// //         'https://example.com/img2.jpg',
// //         'https://example.com/img3.jpg',
// //         'https://example.com/img4.jpg',
// //         'https://example.com/img5.jpg',
// //       ],
// //       time_line: ['00:00', '00:10', '00:20', '00:30', '00:40'],
// //       video_len: 120,
// //       sum_rep: 'Short automated summary of the video.',
// //     };

// //     const doc = await Summarize.create(sample);
// //     console.log('Inserted document:', doc);
// //   } catch (err) {
// //     console.error('Error creating sample:', err.message || err);
// //   } finally {
// //     mongoose.connection.close();
// //   }
// // }

// // // If file called directly, run createSample to test
// // if (require.main === module) {
// //   createSample();
// // }

// // // Export for use elsewhere
// // module.exports = {
// //   connectDB,
// //   Summarize,
// // };








// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");

// const app = express();
// app.use(bodyParser.json());

// // ---------- Replace with your connection string ----------
// const MONGO_URI = "mongodb+srv://naveenkumart906_db_user:JrY0q4QoPtIhGRfz@nk.wpf1cvv.mongodb.net/SRI?retryWrites=true&w=majority&appName=NK";
// // --------------------------------------------------------

// mongoose
//   .connect(MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("🔌 Connected to MongoDB"))
//   .catch((err) => {
//     console.error("❌ Mongo connection error:", err);
//     process.exit(1);
//   });

// /**
//  * Counter Schema for atomic incrementing of alert_id
//  * We'll store documents like { _id: "case_alert_id", seq: 1 }
//  */
// const counterSchema = new mongoose.Schema({
//   _id: { type: String, required: true },
//   seq: { type: Number, default: 0 },
// });
// const Counter = mongoose.model("Counter", counterSchema);

// /**
//  * Case schema and model
//  * Collection name explicitly set to 'case' (as requested).
//  */
// const caseSchema = new mongoose.Schema(
//   {
//     alert_id: { type: Number, required: true, unique: true }, // assigned automatically
//     category: { type: String, required: true },
//     img_url: { type: String, required: true },
//     cam_no: { type: String, required: true },
//     location: { type: String, required: true },
//     team_id: { type: String, required: true },
//     steam_id: { type: String, required: true }, // using the exact field name you provided
//     createdAt: { type: Date, default: Date.now },
//   },
//   {
//     collection: "case", // force the collection name to 'case'
//   }
// );

// /**
//  * Pre-save hook to get next alert_id atomically via counters collection
//  */
// caseSchema.pre("validate", async function (next) {
//   // if alert_id is already set (e.g., manual insert), skip
//   if (this.alert_id && this.alert_id > 0) return next();

//   try {
//     const counterId = "case_alert_id";
//     const updated = await Counter.findByIdAndUpdate(
//       counterId,
//       { $inc: { seq: 1 } },
//       { new: true, upsert: true, setDefaultsOnInsert: true }
//     ).exec();

//     this.alert_id = updated.seq;
//     next();
//   } catch (err) {
//     next(err);
//   }
// });

// const CaseModel = mongoose.model("CaseModel", caseSchema);

// /**
//  * Routes
//  */

// // Create a new case document
// app.post("/api/cases", async (req, res) => {
//   try {
//     // Validate minimal required fields quickly (more validation can be added)
//     const { category, img_url, cam_no, location, team_id, steam_id } = req.body;
//     if (!category || !img_url || !cam_no || !location || !team_id || !steam_id) {
//       return res
//         .status(400)
//         .json({ error: "Missing required fields. See API docs in server.js comment." });
//     }

//     const newCase = new CaseModel({
//       // alert_id will be auto-assigned in pre-validate hook
//       category,
//       img_url,
//       cam_no,
//       location,
//       team_id,
//       steam_id,
//     });

//     const saved = await newCase.save();
//     return res.status(201).json({ message: "Case created", data: saved });
//   } catch (err) {
//     console.error("Error creating case:", err);
//     // handle duplicate alert_id (very unlikely with counters approach) or other validation errors
//     return res.status(500).json({ error: "Server error", details: err.message });
//   }
// });

// // List cases (with optional paging)
// app.get("/api/cases", async (req, res) => {
//   try {
//     const limit = parseInt(req.query.limit || "50", 10);
//     const page = Math.max(0, parseInt(req.query.page || "0", 10));
//     const docs = await CaseModel.find()
//       .sort({ alert_id: -1 })
//       .skip(page * limit)
//       .limit(limit)
//       .exec();
//     return res.json({ count: docs.length, data: docs });
//   } catch (err) {
//     console.error("Error fetching cases:", err);
//     return res.status(500).json({ error: err.message });
//   }
// });

// // Get a single case by alert_id
// app.get("/api/cases/:alert_id", async (req, res) => {
//   try {
//     const alertId = parseInt(req.params.alert_id, 10);
//     const doc = await CaseModel.findOne({ alert_id: alertId }).exec();
//     if (!doc) return res.status(404).json({ error: "Not found" });
//     return res.json({ data: doc });
//   } catch (err) {
//     return res.status(500).json({ error: err.message });
//   }
// });

// /**
//  * Optional: endpoint to reset or view counter (for admin/debug only)
//  * Be careful with exposing this in production.
//  */
// app.get("/admin/counter", async (req, res) => {
//   try {
//     const c = await Counter.findById("case_alert_id").exec();
//     return res.json({ counter: c || { _id: "case_alert_id", seq: 0 } });
//   } catch (err) {
//     return res.status(500).json({ error: err.message });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));





const mongoose = require("mongoose");

// ----------------------
// MongoDB Connection
// ----------------------
const MONGO_URI =
  "mongodb+srv://naveenkumart906_db_user:JrY0q4QoPtIhGRfz@nk.wpf1cvv.mongodb.net/SRI?retryWrites=true&w=majority&appName=NK";

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✔️ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB error:", err));


// ----------------------
// Counter Schema
// ----------------------
const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

const Counter = mongoose.model("Counter", counterSchema);


// ----------------------
// Case Schema
// ----------------------
const caseSchema = new mongoose.Schema(
  {
    alert_id: { type: Number, required: true, unique: true },
    category: { type: String, required: true },
    img_url: { type: String, required: true },
    cam_no: { type: String, required: true },
    location: { type: String, required: true },
    team_id: { type: String, required: true },
    steam_id: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    collection: "case", // <-- COLLECTION NAME
  }
);

// Auto-increment alert_id
caseSchema.pre("validate", async function (next) {
  if (this.alert_id && this.alert_id > 0) return next();

  try {
    const counter = await Counter.findByIdAndUpdate(
      "case_alert_id",
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    this.alert_id = counter.seq;
    next();
  } catch (err) {
    next(err);
  }
});

const CaseModel = mongoose.model("CaseModel", caseSchema);


// ----------------------
// Insert One Mock Document
// ----------------------
async function insertMockData() {
  try {
    const mock = new CaseModel({
      category: "weapon_detected",
      img_url: "https://example.com/test-image.jpg",
      cam_no: "CAM-01",
      location: "Main Entrance",
      team_id: "TEAM-123",
      steam_id: "STEAM-999",
    });

    const saved = await mock.save();
    console.log("✔️ Mock data inserted:", saved);
  } catch (err) {
    console.error("❌ Insert error:", err);
  } finally {
    mongoose.connection.close();
  }
}

insertMockData();
