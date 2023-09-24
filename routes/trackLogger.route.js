const express = require('express');
const router = express.Router();
const controller = require('../controllers/trackLogger.controller'); 

// Get Latest Travel Log and All Travel Logs Routes
router.route('/:id')
  .get(controller.readLatestTravelLog)
  .get(controller.readTravelLog)
  .post(controller.createTravelLog);

module.exports = router;
