const { db } = require('../config/firebase.config');

const careGiverRef = db.collection('care_giver');

// Create a new document in the care_giver Firebase collection
async function createCareGiver(data) {
  try {
    await careGiverRef.doc(data.CgId).set(data);
    return { status: 201, message: 'CareGiver created successfully' };
  } catch (error) {
    console.error(error);
    throw { status: 500, message: 'Internal Server Error' };
  }
}

// Read and return all documents from the care_giver Firebase collection
async function readAllCareGivers() {
  try {
    const snapshot = await careGiverRef.get();
    const careGivers = [];
    snapshot.forEach((doc) => {
      const careGiver = doc.data();
      careGivers.push(careGiver);
    });
    return { status: 200, data: careGivers };
  } catch (error) {
    console.error(error);
    throw { status: 500, message: 'Internal Server Error' };
  }
}

// Read and return a document with the matching id from the care_giver Firebase collection
async function readCareGiver(id) {
  try {
    const doc = await careGiverRef.doc(id).get();
    if (doc.exists) {
      const careGiver = doc.data();
      return { status: 200, data: careGiver };
    } else {
      throw { status: 404, message: 'CareGiver not found' };
    }
  } catch (error) {
    console.error(error);
    throw { status: 500, message: 'Internal Server Error' };
  }
}

// Update a document with the matching id in the care_giver Firebase collection
async function updateCareGiver(id, data) {
  try {
    await careGiverRef.doc(id).update(data);
    return { status: 200, message: 'CareGiver updated successfully' };
  } catch (error) {
    console.error(error);
    throw { status: 500, message: 'Internal Server Error' };
  }
}

// Add a new care receiver to the care receiver list of the document with the matching id
async function newCareReceiver(id, newCareReceiver) {
  try {
    await careGiverRef.doc(id).update({
      care_receiver: admin.firestore.FieldValue.arrayUnion(newCareReceiver),
    });
    return { status: 200, message: 'CareReceiver added successfully' };
  } catch (error) {
    console.error(error);
    throw { status: 500, message: 'Internal Server Error' };
  }
}

// Remove a care receiver from the care receiver list of the document with the matching id
async function removeCareReceiver(id, crId) {
  try {
    await careGiverRef.doc(id).update({
      care_receiver: admin.firestore.FieldValue.arrayRemove({ Id: crId }),
    });
    return { status: 200, message: 'CareReceiver removed successfully' };
  } catch (error) {
    console.error(error);
    throw { status: 500, message: 'Internal Server Error' };
  }
}

// Delete the document with the matching id from the care_giver Firebase collection
async function deleteCareGiver(id) {
  try {
    await careGiverRef.doc(id).delete();
    return { status: 204, message: 'CareGiver deleted successfully' };
  } catch (error) {
    console.error(error);
    throw { status: 500, message: 'Internal Server Error' };
  }
}

module.exports = {
  createCareGiver,
  readAllCareGivers,
  readCareGiver,
  updateCareGiver,
  newCareReceiver,
  removeCareReceiver,
  deleteCareGiver,
};
