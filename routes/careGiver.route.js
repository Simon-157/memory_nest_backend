const express = require('express');
const router = express.Router();
const careGiverController = require('../controllers/careGiver.controller');

// TODO: Create middlewares for data validating
router
  .route('/')
  .get(careGiverController.readAllCareGivers)
  .post(careGiverController.createCareGiver);

router
  .route('/:id')
  .get(careGiverController.readCareGiver)
  .put(careGiverController.updateCareGiver)
  .delete(careGiverController.deleteCareGiver);

module.exports = router;
