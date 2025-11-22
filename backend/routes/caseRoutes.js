const express = require('express');
const router = express.Router();
const caseController = require('../controllers/caseController');

router.post('/', caseController.createCase);
router.get('/', caseController.getCases);
router.get('/:alert_id', caseController.getCaseByAlertId);

module.exports = router;
