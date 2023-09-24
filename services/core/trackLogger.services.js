const travelLogController = require('../../controllers/trackLogger.controller');

// Create a new document in the track_log Firebase collection
async function createTravelLogService(req, res) {
  try {
    const data = req.body;
    const result = await travelLogController.createTravelLog(data);
    res.status(201).json({ message: result });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
}

// Read all documents from the travel_log Firebase collection
async function readAllTravelLogsService(req, res) {
  try {
    const result = await travelLogController.readAllTravelLogs();
    res.status(200).json({ data: result });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
}

// Read all documents with cr_id matching the specified id from the travel_log Firebase collection
async function readTravelLogService(req, res) {
  const id = req.params.id;
  try {
    const result = await travelLogController.readTravelLog(id);
    res.status(200).json({ data: result });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
}

// Read the last created document with cr_id matching the specified id from the travel_log Firebase collection
async function readLatestTravelLogService(req, res) {
  const id = req.params.id;
  try {
    const result = await travelLogController.readLatestTravelLog(id);
    res.status(200).json({ data: result });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
}

// Update the document with matching id in the travel_log Firebase collection
async function updateTravelLogService(req, res) {
  const id = req.params.id;
  const data = JSON.stringify(req.body);
  try {
    await travelLogController.updateTravelLog(data, id);
    res.status(200).json({ message: 'TravelLog updated successfully' });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
}

module.exports = {
  createTravelLogService,
  readAllTravelLogsService,
  readTravelLogService,
  readLatestTravelLogService,
  updateTravelLogService,
};
