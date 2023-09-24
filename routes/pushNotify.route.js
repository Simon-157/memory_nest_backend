const express = require('express');
const router = express.Router();
const pushNotifyService = require('../services/core/pushNotify.services'); 

router.route('/')
  .get(pushNotifyService.getAllPushNotifyLogs)
  .post(pushNotifyService.addPushNotifyLog);


router.put('/accept', pushNotifyService.acceptPushNotifyRequest);

router.route('/:id')
  .get(pushNotifyService.getLatestPushNotifyLog)
  .put(pushNotifyService.updatePushNotifyStatus);

module.exports = router;