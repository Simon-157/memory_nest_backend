import volunteersController from '../controllers/volunteersController';

// Create a new document in the volunteers Firebase collection
async function createVolunteerService(req, res) {
  try {
    const data = req.body;
    const result = await volunteersController.createVolunteer(data);
    res.status(result.status).json({ message: result.message });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
}

// Read and return all documents from the volunteers Firebase collection
async function readAllVolunteersService(req, res) {
  try {
    const result = await volunteersController.readAllVolunteers();
    res.status(result.status).json({ data: result.data });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
}

// Read and return a document with the matching id from the volunteers Firebase collection
async function readVolunteerService(req, res) {
  const id = req.params.id;
  try {
    const result = await volunteersController.readVolunteer(id);
    res.status(result.status).json({ data: result.data });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
}

// Update a document with the matching id in the volunteers Firebase collection
async function updateVolunteerService(req, res) {
  const id = req.params.id;
  const data = req.body;
  try {
    const result = await volunteersController.updateVolunteer(id, data);
    res.status(result.status).json({ message: result.message });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
}

// Delete a document with the matching id from the volunteer Firebase collection
async function deleteVolunteerService(req, res) {
  const id = req.params.id;
  try {
    const result = await volunteersController.deleteVolunteer(id);
    res.status(result.status).json({ message: result.message });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
}

export default {
  createVolunteerService,
  readAllVolunteersService,
  readVolunteerService,
  updateVolunteerService,
  deleteVolunteerService,
};
