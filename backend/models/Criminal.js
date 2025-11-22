// const mongoose = require('mongoose');

// const Schema = mongoose.Schema;

// const CriminalSchema = new Schema({
//   status: {
//     type: String,
//     enum: ['Wanted', 'Missing'],
//     required: true
//   },
//   fullName: { type: String, required: true },
//   age: { type: String }, // store as string to allow ranges like "30-35"
//   contact: { type: String },
//   description: { type: String },
//   // Wanted-specific
//   crimeOrReason: { type: String },
//   reward: { type: Number, default: 0 },
//   // Missing-specific
//   lastSeenDateTime: { type: Date },
//   lastSeenLocation: { type: String },

//   images: [{ type: String }], // array of Cloudinary URLs

//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Criminal', CriminalSchema);




// models/Criminal.js
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CriminalSchema = new Schema({
  status: {
    type: String,
    enum: ['Wanted', 'Missing'],
    required: true
  },
  fullName: { type: String, required: true },
  age: { type: String }, // store as string to allow ranges like "30-35"
  contact: { type: String },
  description: { type: String },
  // Wanted-specific
  crimeOrReason: { type: String },
  reward: { type: Number, default: 0 },
  // Missing-specific
  lastSeenDateTime: { type: Date },
  lastSeenLocation: { type: String },

  images: [{ type: String }], // array of Cloudinary URLs or local /uploads paths

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Criminal', CriminalSchema);
