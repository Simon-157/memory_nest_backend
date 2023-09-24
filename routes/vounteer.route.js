const express = require('express');
const router = express.Router();
const volunteerController = require('../controllers/volunteer.controller');

// TODO: Create middlewares for data validating

router
  .route('/')
  .get(volunteerController.getAllVolunteers)
  .post(volunteerController.addVolunteer);

router
  .route('/:id')
  .get(volunteerController.getVolunteer)
  .put(volunteerController.updateVolunteer)
  .delete(volunteerController.deleteVolunteer);

module.exports = router;
