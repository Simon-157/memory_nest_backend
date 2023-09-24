const express = require('express');
const router = express.Router();
const careReceiverService = require('../services/core/careReceiver.services');
const mapRouteService = require('../services/core/map_route')

// TODO: Create middlewares for data validating
router
  .route('/')
  .get(careReceiverService.readAllCareReceivers)
  .post(careReceiverService.createCareReceiver)

router.post('/route', mapRouteService.planRoute)
router.post('/:id/help', mapRouteService.help)

router
  .route('/:id')
  .get(careReceiverService.readCareReceiver)
  .put(careReceiverService.updateCareReceiver)
  .delete(careReceiverService.deleteCareReceiver);

module.exports = router;
