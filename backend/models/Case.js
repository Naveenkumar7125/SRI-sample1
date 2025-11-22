// const mongoose = require('mongoose');
// const Counter = require('./Counter');

// const caseSchema = new mongoose.Schema(
//   {
//     alert_id: { type: Number, required: true, unique: true },
//     category: { type: String, required: true },
//     img_url: { type: String, required: true },
//     cam_no: { type: String, required: true },
//     location: { type: String, required: true },
//     team_id: { type: String, required: true },
//     steam_id: { type: String, required: true },
//     createdAt: { type: Date, default: Date.now }
//   },
//   {
//     collection: 'case'
//   }
// );

// // Auto-increment logic
// caseSchema.pre('validate', async function (next) {
//   if (this.alert_id && this.alert_id > 0) return next();

//   try {
//     const counterId = 'case_alert_id';
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

// module.exports = mongoose.model('CaseModel', caseSchema);





// models/Case.js
const mongoose = require("mongoose");
const Counter = require("./Counter");

/**
 * CASE SCHEMA
 * Collection name forced to: case
 */
const caseSchema = new mongoose.Schema(
  {
    alert_id: { type: Number, required: true, unique: true }, // auto-increment
    category: { type: String, required: true },                // e.g. "weapon_detected"
    img_url: { type: String, required: true },                 // image URL
    cam_no: { type: String, required: true },                  // camera name/ID
    location: { type: String, required: true },                // case location
    team_id: { type: String, required: true },                 // NSG group ID
    steam_id: { type: String, required: true },                // operative ID
    createdAt: { type: Date, default: Date.now }
  },
  {
    collection: "case" // << This ensures the collection name is EXACTLY "case"
  }
);

/**
 * Auto-increment alert_id logic
 * This will generate values: 1, 2, 3, ...
 */
caseSchema.pre("validate", async function (next) {
  if (this.alert_id && this.alert_id > 0) return next(); // in case manual override

  try {
    const counter = await Counter.findByIdAndUpdate(
      "case_alert_id",
      { $inc: { seq: 1 } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    this.alert_id = counter.seq;
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("CaseModel", caseSchema);
