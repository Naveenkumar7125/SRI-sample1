// // backend/models/Alert.js
// const mongoose = require('mongoose');

// const alertSchema = new mongoose.Schema({
//   image_url: { type: String, required: true },
//   category:  { type: String, required: true },
//   cam_id:    { type: String, required: true },
//   location:  { type: String, required: true },
//   timestamp: { type: Date,   required: true }
// }, {
//   collection: 'alert' // explicit collection name
// });

// module.exports = mongoose.model('Alert', alertSchema);



// backend/models/Alert.js
const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  image_url: { type: String, required: true },
  category:  { type: String, required: true },
  cam_id:    { type: String, required: true },
  location:  { type: String, required: true },
  timestamp: { type: Date,   required: true }
}, {
  collection: 'alert' // explicit collection name
});

module.exports = mongoose.model('Alert', alertSchema);
