// // backend/routes/alertRoutes.js
// const express = require('express');
// const router = express.Router();
// const controller = require('../controllers/alertController');

// router.get('/', controller.getAllAlerts);         // GET /alerts
// router.get('/seed', controller.seedAlerts);       // GET /alerts/seed
// router.get('/:id', controller.getAlertById);      // GET /alerts/:id
// router.post('/', controller.createAlert);         // POST /alerts
// router.delete('/:id', controller.deleteAlert);    // DELETE /alerts/:id

// module.exports = router;


// backend/routes/alertRoutes.js
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Alert = require('../models/Alert');

// GET /alerts -> fetch all alerts, sorted newest first
router.get('/', async (req, res) => {
  try {
    const alerts = await Alert.find().sort({ timestamp: -1 });
    return res.json(alerts);
  } catch (err) {
    console.error('Error fetching alerts:', err);
    return res.status(500).json({ message: 'Server error fetching alerts' });
  }
});

// GET /alerts/:id -> fetch single alert by MongoDB _id (safe validation)
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  // Validate ObjectId BEFORE calling MongoDB
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid alert ID format' });
  }

  try {
    const alert = await Alert.findById(id);
    if (!alert) {
      return res.status(404).json({ message: 'Alert not found' });
    }
    return res.json(alert);
  } catch (err) {
    console.error('Error fetching alert by ID:', err);
    return res.status(500).json({ message: 'Server error fetching alert' });
  }
});

module.exports = router;
