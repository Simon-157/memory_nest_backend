import { db } from "../config/firebase.config";

const volunteerRef = db.collection('volunteers');


// Create a new document in the volunteers Firebase collection
async function createVolunteer(data) {
  try {
    await volunteerRef.doc(data.VId).set(data);
    return { status: 201, message: 'Volunteer created successfully' };
  } catch (error) {
    console.error(error);
    throw { status: 500, message: 'Internal Server Error' };
  }
}

// Read and return all documents from the volunteers Firebase collection
async function readAllVolunteers() {
  try {
    const snapshot = await volunteerRef.get();
    const volunteers = [];
    snapshot.forEach((doc) => {
      const volunteer = doc.data();
      volunteers.push(volunteer);
    });
    return { status: 200, data: volunteers };
  } catch (error) {
    console.error(error);
    throw { status: 500, message: 'Internal Server Error' };
  }
}

// Read and return the document with the matching id from the volunteers Firebase collection
async function readVolunteer(id) {
  try {
    const doc = await volunteerRef.doc(id).get();
    if (doc.exists) {
      const volunteer = doc.data();
      return { status: 200, data: volunteer };
    } else {
      throw { status: 404, message: 'Volunteer not found' };
    }
  } catch (error) {
    console.error(error);
    throw { status: 500, message: 'Internal Server Error' };
  }
}

// Update the document with the matching id in the volunteers Firebase collection
async function updateVolunteer(id, data) {
  try {
    const updates = {};
    for (const key in data) {
      if (data[key] !== undefined && data[key] !== null) {
        updates[key] = data[key];
      }
    }
    await volunteerRef.doc(id).update(updates);
    return { status: 200, message: 'Volunteer updated successfully' };
  } catch (error) {
    console.error(error);
    throw { status: 500, message: 'Internal Server Error' };
  }
}

// Delete the document with the matching id from the volunteer Firebase collection
async function deleteVolunteer(id) {
  try {
    await volunteerRef.doc(id).delete();
    return { status: 204, message: 'Volunteer deleted successfully' };
  } catch (error) {
    console.error(error);
    throw { status: 500, message: 'Internal Server Error' };
  }
}

export default {
  initVolunteers,
  createVolunteer,
  readAllVolunteers,
  readVolunteer,
  updateVolunteer,
  deleteVolunteer,
};
