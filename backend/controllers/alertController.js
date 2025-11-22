// backend/controllers/alertController.js
const Alert = require('../models/Alert');
const mockAlerts = require('../data/mockVideos');

exports.getAllAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find().sort({ timestamp: -1 });
    return res.json(alerts);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error fetching alerts' });
  }
};

exports.getAlertById = async (req, res) => {
  try {
    const alert = await Alert.findById(req.params.id);
    if (!alert) return res.status(404).json({ message: 'Alert not found' });
    return res.json(alert);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: 'Invalid id or server error' });
  }
};

exports.createAlert = async (req, res) => {
  try {
    const { image_url, category, cam_id, location, timestamp } = req.body;
    const newAlert = new Alert({
      image_url, category, cam_id, location,
      timestamp: timestamp ? new Date(timestamp) : new Date()
    });
    const saved = await newAlert.save();
    return res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: 'Error creating alert', error: err.message });
  }
};

exports.deleteAlert = async (req, res) => {
  try {
    const removed = await Alert.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ message: 'Alert not found' });
    return res.json({ message: 'Deleted', removed });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: 'Invalid id or server error' });
  }
};

// Seed mock data into DB if empty
exports.seedAlerts = async (req, res) => {
  try {
    const count = await Alert.countDocuments();
    if (count > 0) {
      return res.json({ message: 'DB already has data. Delete existing documents if you want to reseed.' });
    }
    const inserted = await Alert.insertMany(mockAlerts);
    return res.json({ message: `Inserted ${inserted.length} mock alerts`, inserted });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Seeding error', error: err.message });
  }
};
