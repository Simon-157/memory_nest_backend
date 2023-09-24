const express = require('express');
const router = express.Router();

// Import route modules
const volunteerRoutes = require('./volunteerRoutes');
const careGiverRoutes = require('./careGiverRoutes');
const careReceiverRoutes = require('./careReceiverRoutes');
const sosRoutes = require('./sosRoutes');
const travelLogRoutes = require('./travelLogRoutes');

// Mount route modules
router.use('/volunteers', volunteerRoutes);
router.use('/caregivers', careGiverRoutes);
router.use('/carereceivers', careReceiverRoutes);
router.use('/sos', sosRoutes);
router.use('/travellog', travelLogRoutes);

module.exports = router;