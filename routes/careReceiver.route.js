const express = require('express');
const router = express.Router();
const careReceiverService = require('../services/core/careReceiver.services');

// TODO: Create middlewares for data validating
router
  .route('/')
  .get(careReceiverService.readAllCareReceivers)
  .post(careReceiverService.createCareReceiver);

router
  .route('/:id')
  .get(careReceiverService.readCareReceiver)
  .put(careReceiverService.updateCareReceiver)
  .delete(careReceiverService.deleteCareReceiver);

module.exports = router;
