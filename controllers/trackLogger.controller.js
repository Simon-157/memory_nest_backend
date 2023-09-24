const { db } = require("../config/firebase.config");

const travelLogRef = db.collection('track_log');


// Create a new document in the track_log Firebase collection
async function createTravelLog(data) {
  try {
    // Unmarshal data
    const travelLog = JSON.parse(data);

    // Create document with composite id
    const travelLogId = `${travelLog.CrId}${travelLog.Datetime}`;
    travelLog.TravelLogId = travelLogId;
    await travelLogRef.doc(travelLogId).set(travelLog);

    // Check last at home
    const q = travelLogRef
      .where('cr_id', '==', travelLog.CrId)
      .where('status', '==', 'home')
      .orderBy('datetime', 'desc')
      .limit(1);

    const querySnapshot = await q.get();
    if (querySnapshot.empty) {
      return `${travelLog.CrId} have not been home`;
    }

    return travelLog.Datetime.toString();
  } catch (error) {
    console.error(error);
    throw { status: 500, message: 'Internal Server Error' };
  }
}

// Read all documents from the travel_log Firebase collection
async function readAllTravelLogs() {
  try {
    const snapshot = await travelLogRef.get();
    const travelLogs = [];
    snapshot.forEach((doc) => {
      const travelLog = doc.data();
      travelLogs.push(travelLog);
    });
    return travelLogs;
  } catch (error) {
    console.error(error);
    throw { status: 500, message: 'Internal Server Error' };
  }
}

// Read all documents with cr_id matching the specified id from the travel_log Firebase collection
async function readTravelLog(id) {
  try {
    const q = travelLogRef
      .where('cr_id', '==', id)
      .orderBy('datetime', 'desc');

    const querySnapshot = await q.get();
    const travelLogs = [];
    querySnapshot.forEach((doc) => {
      const travelLog = doc.data();
      travelLogs.push(travelLog);
    });
    return travelLogs;
  } catch (error) {
    console.error(error);
    throw { status: 500, message: 'Internal Server Error' };
  }
}

// Read the last created document with cr_id matching the specified id from the travel_log Firebase collection
async function readLatestTravelLog(id) {
  try {
    const q = travelLogRef
      .where('cr_id', '==', id)
      .orderBy('datetime', 'desc')
      .limit(1);

    const querySnapshot = await q.get();
    if (querySnapshot.empty) {
      throw { status: 404, message: `No SOS Log found for ${id}` };
    }

    const doc = querySnapshot.docs[0];
    const travelLog = doc.data();
    return travelLog;
  } catch (error) {
    console.error(error);
    throw { status: 500, message: 'Internal Server Error' };
  }
}

// Update the document with matching id in the travel_log Firebase collection
async function updateTravelLog(data, id) {
  try {
    const travelLog = JSON.parse(data);
    const updates = {};

    for (const key in travelLog) {
      if (travelLog.hasOwnProperty(key)) {
        const value = travelLog[key];
        if (value !== undefined && value !== null) {
          updates[key] = value;
        }
      }
    }

    await travelLogRef.doc(id).update(updates);
  } catch (error) {
    console.error(error);
    throw { status: 500, message: 'Internal Server Error' };
  }
}

module.exports = {
  createTravelLog,
  readAllTravelLogs,
  readTravelLog,
  readLatestTravelLog,
  updateTravelLog,
};
