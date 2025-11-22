// const mongoose = require('mongoose');

// const counterSchema = new mongoose.Schema({
//   _id: { type: String, required: true },
//   seq: { type: Number, default: 0 }
// });

// module.exports = mongoose.model('Counter', counterSchema);





// models/Counter.js
const mongoose = require("mongoose");

/**
 * Used for auto-incrementing alert_id inside Case model.
 * Document stored as:
 * { _id: "case_alert_id", seq: <number> }
 */
const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 }
});

module.exports = mongoose.model("Counter", counterSchema);
