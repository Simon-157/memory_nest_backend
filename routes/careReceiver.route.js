const express = require('express');
const router = express.Router();
const careReceiverController = require('../controllers/careReceiver.controller');

// TODO: Create middlewares for data validating
router
  .route('/')
  .get(careReceiverController.readAllCareReceivers)
  .post(careReceiverController.createCareReceiver);

router
  .route('/:id')
  .get(careReceiverController.readCareReceiver)
  .put(careReceiverController.updateCareReceiver)
  .delete(careReceiverController.deleteCareReceiver);

module.exports = router;
