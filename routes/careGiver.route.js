const express = require('express');
const router = express.Router();
const careGiverService = require('../services/core/careGiver.services');

// TODO: Create middlewares for data validating
router
  .route('/')
  .get(careGiverService.readAllCareGivers)
  .post(careGiverService.createCareGiver);

router
  .route('/:id')
  .get(careGiverService.readCareGiver)
  .put(careGiverService.updateCareGiver)
  .delete(careGiverService.deleteCareGiver);

module.exports = router;
