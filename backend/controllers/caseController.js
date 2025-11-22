const CaseModel = require('../models/Case');

// Create case
exports.createCase = async (req, res) => {
  try {
    // expected fields: category, img_url, cam_no, location, team_id, steam_id
    const { category, img_url, cam_no, location, team_id, steam_id } = req.body;

    if (!category || !img_url || !cam_no || !location || !team_id || !steam_id) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newCase = new CaseModel({
      category,
      img_url,
      cam_no,
      location,
      team_id,
      steam_id
    });

    const saved = await newCase.save();
    return res.status(201).json({ message: 'Case created', data: saved });
  } catch (err) {
    console.error('createCase error:', err);
    return res.status(500).json({ error: err.message });
  }
};

// Get all cases (paging optional)
exports.getCases = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit || '50', 10);
    const page = Math.max(0, parseInt(req.query.page || '0', 10));

    const docs = await CaseModel.find()
      .sort({ alert_id: -1 })
      .skip(page * limit)
      .limit(limit)
      .exec();

    return res.json({ count: docs.length, data: docs });
  } catch (err) {
    console.error('getCases error:', err);
    return res.status(500).json({ error: err.message });
  }
};

// Get single by alert_id
exports.getCaseByAlertId = async (req, res) => {
  try {
    const alertId = parseInt(req.params.alert_id, 10);
    const doc = await CaseModel.findOne({ alert_id: alertId }).exec();
    if (!doc) return res.status(404).json({ error: 'Not found' });
    return res.json({ data: doc });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
