const careGiverController = require('../../controllers/careGiver.controller');

// Create a new document in the care_giver Firebase collection
async function createCareGiverService(req, res) {
  try {
    const data = req.body;
    const result = await careGiverController.createCareGiver(data);
    res.status(result.status).json({ message: result.message });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
}

// Read and return all documents from the care_giver Firebase collection
async function readAllCareGiversService(req, res) {
  try {
    const result = await careGiverController.readAllCareGivers();
    res.status(result.status).json({ data: result.data });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
}

// Read and return a document with the matching id from the care_giver Firebase collection
async function readCareGiverService(req, res) {
  const id = req.params.id;
  try {
    const result = await careGiverController.readCareGiver(id);
    res.status(result.status).json({ data: result.data });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
}

// Update a document with the matching id in the care_giver Firebase collection
async function updateCareGiverService(req, res) {
  const id = req.params.id;
  const data = req.body;
  try {
    const result = await careGiverController.updateCareGiver(id, data);
    res.status(result.status).json({ message: result.message });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
}

// Add a new care receiver to the care receiver list of the document with the matching id
async function newCareReceiverService(req, res) {
  const id = req.params.id;
  const newCareReceiver = req.body;
  try {
    const result = await careGiverController.newCareReceiver(id, newCareReceiver);
    res.status(result.status).json({ message: result.message });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
}

// Remove a care receiver from the care receiver list of the document with the matching id
async function removeCareReceiverService(req, res) {
  const id = req.params.id;
  const crId = req.params.crId;
  try {
    const result = await careGiverController.removeCareReceiver(id, crId);
    res.status(result.status).json({ message: result.message });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
}

// Delete the document with the matching id from the care_giver Firebase collection
async function deleteCareGiverService(req, res) {
  const id = req.params.id;
  try {
    const result = await careGiverController.deleteCareGiver(id);
    res.status(result.status).json({ message: result.message });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
}

module.exports = {
  createCareGiverService,
  readAllCareGiversService,
  readCareGiverService,
  updateCareGiverService,
  newCareReceiverService,
  removeCareReceiverService,
  deleteCareGiverService,
};
