import { db } from "../config/firebase.config";

const careReceiverRef = db.collection('care_receiver');

// Create a document in the care_receiver Firebase collection
async function createCareReceiver(data) {
  try {
    await careReceiverRef.doc(data.CrId).set(data);
    return { status: 201, message: 'CareReceiver created successfully' };
  } catch (error) {
    console.error(error);
    throw { status: 500, message: 'Internal Server Error' };
  }
}

// Read and return all documents from the care_receiver Firebase collection
async function readAllCareReceivers() {
  try {
    const snapshot = await careReceiverRef.get();
    const careReceivers = [];
    snapshot.forEach((doc) => {
      const careReceiver = doc.data();
      careReceivers.push(careReceiver);
    });
    return { status: 200, data: careReceivers };
  } catch (error) {
    console.error(error);
    throw { status: 500, message: 'Internal Server Error' };
  }
}

// Read and return the document with the matching id from the care_receiver Firebase collection
async function readCareReceiver(id) {
  try {
    const doc = await careReceiverRef.doc(id).get();
    if (doc.exists) {
      const careReceiver = doc.data();
      return { status: 200, data: careReceiver };
    } else {
      throw { status: 404, message: 'CareReceiver not found' };
    }
  } catch (error) {
    console.error(error);
    throw { status: 500, message: 'Internal Server Error' };
  }
}

// Update the document with the matching id in the care_receiver Firebase collection
async function updateCareReceiver(id, data) {
  try {
    // Remove care giver modification during normal update
    data.CareGiver = [];
    const updates = {};
    for (const key in data) {
      if (data[key] !== undefined && data[key] !== null) {
        updates[key] = data[key];
      }
    }

    await careReceiverRef.doc(id).update(updates);
    return { status: 200, message: 'CareReceiver updated successfully' };
  } catch (error) {
    console.error(error);
    throw { status: 500, message: 'Internal Server Error' };
  }
}

// Change the care giver for a document with the matching id in the care_receiver Firebase collection
async function changeCareGiver(newCg, id) {
  try {
    await careReceiverRef.doc(id).update({ care_giver: newCg });
    return { status: 200, message: 'CareGiver changed successfully' };
  } catch (error) {
    console.error(error);
    throw { status: 500, message: 'Internal Server Error' };
  }
}

// Delete a document with the matching id in the care_receiver Firebase collection
async function deleteCareReceiver(id) {
  try {
    await careReceiverRef.doc(id).delete();
    return { status: 204, message: 'CareReceiver deleted successfully' };
  } catch (error) {
    console.error(error);
    throw { status: 500, message: 'Internal Server Error' };
  }
}

export default {
  createCareReceiver,
  readAllCareReceivers,
  readCareReceiver,
  updateCareReceiver,
  changeCareGiver,
  deleteCareReceiver,
};
