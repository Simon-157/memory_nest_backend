import careReceiverController from '../controllers/careReceiverController';

// Create a new document in the care_receiver Firebase collection
async function createCareReceiverService(req, res) {
  try {
    const data = req.body;
    const result = await careReceiverController.createCareReceiver(data);
    res.status(result.status).json({ message: result.message });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
}

// Read and return all documents from the care_receiver Firebase collection
async function readAllCareReceiversService(req, res) {
  try {
    const result = await careReceiverController.readAllCareReceivers();
    res.status(result.status).json({ data: result.data });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
}

// Read and return a document with the matching id from the care_receiver Firebase collection
async function readCareReceiverService(req, res) {
  const id = req.params.id;
  try {
    const result = await careReceiverController.readCareReceiver(id);
    res.status(result.status).json({ data: result.data });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
}

// Update a document with the matching id in the care_receiver Firebase collection
async function updateCareReceiverService(req, res) {
  const id = req.params.id;
  const data = req.body;
  try {
    const result = await careReceiverController.updateCareReceiver(id, data);
    res.status(result.status).json({ message: result.message });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
}

// Change the care giver for a document with the matching id in the care_receiver Firebase collection
async function changeCareGiverService(req, res) {
  const id = req.params.id;
  const newCg = req.body.newCg; // Assuming you send the new care giver as 'newCg'
  try {
    const result = await careReceiverController.changeCareGiver(newCg, id);
    res.status(result.status).json({ message: result.message });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
}

// Delete a document with the matching id from the care_receiver Firebase collection
async function deleteCareReceiverService(req, res) {
  const id = req.params.id;
  try {
    const result = await careReceiverController.deleteCareReceiver(id);
    res.status(result.status).json({ message: result.message });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
}

export default {
  createCareReceiverService,
  readAllCareReceiversService,
  readCareReceiverService,
  updateCareReceiverService,
  changeCareGiverService,
  deleteCareReceiverService,
};
