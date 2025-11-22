

// // // server.js
// // require("dotenv").config();
// // const express = require("express");
// // const cors = require("cors");
// // const path = require("path");

// // const { connectDB } = require("./config/db");
// // const alertRoutes = require("./routes/alertRoutes");
// // const videoRoutes = require("./routes/videoRoutes");
// // const criminalRoutes = require("./routes/criminalRoutes"); // new route

// // const app = express();

// // // Middlewares
// // app.use(express.json()); // parse application/json
// // app.use(cors()); // enable CORS for all routes

// // // Step 4: serve uploaded files statically from /uploads
// // // Files saved to backend/uploads/<filename> will be available at:
// // // http://localhost:5000/uploads/<filename>
// // app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // const PORT = process.env.PORT || 5000;

// // (async () => {
// //   try {
// //     // Connect to DB (connectDB should call mongoose.connect and resolve on success)
// //     await connectDB();

// //     // Mount routes under /api namespace
// //     app.use("/api/alerts", alertRoutes);
// //     app.use("/api/videos", videoRoutes);
// //     app.use("/api/criminals", criminalRoutes); // mounted new route

// //     // Health route
// //     app.get("/", (req, res) =>
// //       res.json({ message: "Backend running", routes: ["/api/alerts", "/api/videos", "/api/criminals"] })
// //     );

// //     // Global error handler
// //     app.use((err, req, res, next) => {
// //       console.error(err && err.stack ? err.stack : err);
// //       res.status(err.status || 500).json({
// //         message: err.message || "Internal Server Error",
// //         ...(process.env.NODE_ENV !== "production" ? { stack: err.stack } : {}),
// //       });
// //     });

// //     // Start server
// //     app.listen(PORT, () => {
// //       console.log(`🚀 Server running on http://localhost:${PORT}`);
// //     });
// //   } catch (err) {
// //     console.error("Failed to start server:", err && err.message ? err.message : err);
// //     process.exit(1);
// //   }
// // })();

// // // graceful shutdown
// // process.on("SIGINT", async () => {
// //   console.log("SIGINT received, shutting down...");
// //   try {
// //     const mongoose = require("mongoose");
// //     await mongoose.connection.close(false);
// //     console.log("Mongoose connection closed.");
// //   } catch (e) {
// //     console.error("Error closing mongoose connection:", e);
// //   } finally {
// //     process.exit(0);
// //   }
// // });




// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const path = require("path");

// const { connectDB } = require("./config/db");
// const alertRoutes = require("./routes/alertRoutes"); // keep as-is if exists
// const videoRoutes = require("./routes/videoRoutes"); // keep as-is if exists
// const criminalRoutes = require("./routes/criminalRoutes");

// const app = express();

// // Middlewares
// app.use(express.json()); // parse application/json
// app.use(cors()); // enable CORS for all routes

// // Serve uploaded files statically (if you use uploadMulter disk storage)
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// const PORT = process.env.PORT || 5000;

// (async () => {
//   try {
//     // Connect to DB
//     await connectDB();

//     // Mount routes under /api namespace
//     if (alertRoutes) app.use("/api/alerts", alertRoutes);
//     if (videoRoutes) app.use("/api/videos", videoRoutes);
//     app.use("/api/criminals", criminalRoutes);

//     // Health route
//     app.get("/", (req, res) =>
//       res.json({ message: "Backend running", routes: ["/api/alerts", "/api/videos", "/api/criminals"] })
//     );

//     // Global error handler
//     app.use((err, req, res, next) => {
//       console.error(err && err.stack ? err.stack : err);
//       res.status(err.status || 500).json({
//         message: err.message || "Internal Server Error",
//         ...(process.env.NODE_ENV !== "production" ? { stack: err.stack } : {}),
//       });
//     });

//     // Start server
//     app.listen(PORT, () => {
//       console.log(`🚀 Server running on http://localhost:${PORT}`);
//     });
//   } catch (err) {
//     console.error("Failed to start server:", err && err.message ? err.message : err);
//     process.exit(1);
//   }
// })();

// // graceful shutdown
// process.on("SIGINT", async () => {
//   console.log("SIGINT received, shutting down...");
//   try {
//     const mongoose = require("mongoose");
//     await mongoose.connection.close(false);
//     console.log("Mongoose connection closed.");
//   } catch (e) {
//     console.error("Error closing mongoose connection:", e);
//   } finally {
//     process.exit(0);
//   }
// });





// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const morgan = require("morgan");

const { connectDB } = require("./config/db");

// Optional routes — keep as-is if they exist in your project
const alertRoutes = require("./routes/alertRoutes"); // may be undefined if not present
const videoRoutes = require("./routes/videoRoutes"); // may be undefined if not present
const criminalRoutes = require("./routes/criminalRoutes"); // should exist
const caseRoutes = require("./routes/caseRoutes"); // new: mount case routes for /api/cases

const app = express();

// ---------------------------
// Middleware
// ---------------------------
app.use(helmet()); // basic security headers
app.use(cors()); // enable CORS (adjust options if you want restrictions)
app.use(express.json({ limit: "10mb" })); // parsing json bodies (larger limit for images/base64 if needed)
app.use(express.urlencoded({ extended: true, limit: "10mb" })); // parse urlencoded bodies
app.use(morgan("dev")); // request logger (dev format)

// Serve uploaded files statically (if you use disk storage for multer)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ---------------------------
// Health + simple info route
// ---------------------------
app.get("/", (req, res) =>
  res.json({
    message: "Backend running",
    routes: ["/api/alerts", "/api/videos", "/api/criminals", "/api/cases"],
  })
);

// ---------------------------
// Mount API routes under /api
// ---------------------------
// only mount if the route module exists (prevents crash if file missing)
if (alertRoutes) app.use("/api/alerts", alertRoutes);
if (videoRoutes) app.use("/api/videos", videoRoutes);
if (criminalRoutes) app.use("/api/criminals", criminalRoutes);
if (caseRoutes) app.use("/api/cases", caseRoutes);

// ---------------------------
// Optional admin/debug endpoints
// ---------------------------
// Admin: view counter doc for auto-increment (if Counter model exists)
app.get("/admin/counter", async (req, res, next) => {
  try {
    // require lazily so the app still boots if model file is not present
    let Counter;
    try {
      Counter = require("./models/Counter");
    } catch (e) {
      // model not present
      return res.status(404).json({ error: "Counter model not found" });
    }

    const c = await Counter.findById("case_alert_id").lean().exec();
    return res.json({ counter: c || { _id: "case_alert_id", seq: 0 } });
  } catch (err) {
    next(err);
  }
});

// Simple health check
app.get("/health", (req, res) => res.json({ ok: true, time: new Date().toISOString() }));

// ---------------------------
// Global error handler
// ---------------------------
app.use((err, req, res, next) => {
  // log stack in non-production
  console.error(err && err.stack ? err.stack : err);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV !== "production" ? { stack: err.stack } : {}),
  });
});

// ---------------------------
// Start server after DB connection
// ---------------------------
const PORT = process.env.PORT || 5000;

let serverInstance = null;

(async () => {
  try {
    await connectDB();
    serverInstance = app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err && err.message ? err.message : err);
    process.exit(1);
  }
})();

// ---------------------------
// Graceful shutdown helpers
// ---------------------------
async function gracefulShutdown(signal) {
  console.log(`${signal} received, shutting down gracefully...`);
  try {
    // stop accepting new connections
    if (serverInstance) serverInstance.close();

    // close mongoose connection if present
    try {
      const mongoose = require("mongoose");
      if (mongoose && mongoose.connection && mongoose.connection.readyState) {
        await mongoose.connection.close(false);
        console.log("Mongoose connection closed.");
      }
    } catch (e) {
      console.error("Error closing mongoose connection:", e);
    }

    // allow pending promises to finish
    setTimeout(() => {
      console.log("Shutdown complete, exiting.");
      process.exit(0);
    }, 500);
  } catch (e) {
    console.error("Error during shutdown:", e);
    process.exit(1);
  }
}

process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));

// catch unhandled rejections and exceptions to avoid silent exits
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception thrown:", err);
  // attempt graceful shutdown
  gracefulShutdown("uncaughtException");
});
