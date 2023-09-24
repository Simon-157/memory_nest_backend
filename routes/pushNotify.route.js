const express = require('express');
const router = express.Router();
const controller = require('../controllers/pushNotify.controller'); 

router.route('/')
  .get(controller.readAllPushNotifyLogs)
  .post(controller.createPushNotifyLog);


router.put('/accept', controller.findPushNotifyLog);

router.route('/:id')
  .get(controller.readLatestPushNotifyLog)
  .put(controller.updatePushNotifyLog);

module.exports = router;
