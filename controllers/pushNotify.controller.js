const { db } = require('../config/firebase.config');

const pushNotifyLogRef = db.collection('pushNotify');

// Create a new document in the pushNotify_log Firebase collection
async function createPushNotifyLog(data) {
  try {
    // Unmarshal data
    const pushNotifyLog = JSON.parse(data);

    // Create document with composite id
    const pushNotifyLogId = `${pushNotifyLog.CrId}${pushNotifyLog.Datetime}`;
    pushNotifyLog.PushNotifyId = pushNotifyLogId;
    await pushNotifyLogRef.doc(pushNotifyLogId).set(pushNotifyLog);

    return pushNotifyLogId;
  } catch (error) {
    console.error(error);
    throw { status: 500, message: 'Internal Server Error' };
  }
}

// Read all documents from the pushNotify_log Firebase collection
async function readAllPushNotifyLogs() {
  try {
    const snapshot = await pushNotifyLogRef.get();
    const pushNotifyLogs = [];
    snapshot.forEach((doc) => {
      const pushNotifyLog = doc.data();
      pushNotifyLogs.push(pushNotifyLog);
    });
    return pushNotifyLogs;
  } catch (error) {
    console.error(error);
    throw { status: 500, message: 'Internal Server Error' };
  }
}

// Read all documents with cr_id matching the specified id from the pushNotify_log Firebase collection
async function readPushNotifyLog(id) {
  try {
    const q = pushNotifyLogRef
      .where('cr_id', '==', id)
      .orderBy('datetime', 'desc');

    const querySnapshot = await q.get();
    const pushNotifyLogs = [];
    querySnapshot.forEach((doc) => {
      const pushNotifyLog = doc.data();
      pushNotifyLogs.push(pushNotifyLog);
    });
    return pushNotifyLogs;
  } catch (error) {
    console.error(error);
    throw { status: 500, message: 'Internal Server Error' };
  }
}

// Read the last created document with cr_id matching the specified id from the pushNotify_log Firebase collection
async function readLatestPushNotifyLog(id) {
  try {
    const q = pushNotifyLogRef
      .where('cr_id', '==', id)
      .orderBy('datetime', 'desc')
      .limit(1);

    const querySnapshot = await q.get();
    if (querySnapshot.empty) {
      throw { status: 404, message: `No Push Notify Logs found for ${id}` };
    }

    const doc = querySnapshot.docs[0];
    const pushNotifyLog = doc.data();
    return pushNotifyLog;
  } catch (error) {
    console.error(error);
    throw { status: 500, message: 'Internal Server Error' };
  }
}

// Find a document with the matching PushNotifyId in the pushNotify_log Firebase collection
async function findPushNotifyLog(PushNotifyId) {
  try {
    const doc = await pushNotifyLogRef.doc(PushNotifyId).get();
    if (!doc.exists) {
      throw { status: 404, message: `Push Notify Log not found` };
    }

    const pushNotifyLog = doc.data();
    return pushNotifyLog;
  } catch (error) {
    console.error(error);
    throw { status: 500, message: 'Internal Server Error' };
  }
}

// Update the document with matching id in the pushNotify_log Firebase collection
async function updatePushNotifyLog(data, id) {
  try {
    const pushNotifyLog = JSON.parse(data);
    const updates = {};

    for (const key in pushNotifyLog) {
      if (pushNotifyLog.hasOwnProperty(key)) {
        const value = pushNotifyLog[key];
        if (value !== undefined && value !== null) {
          updates[key] = value;
        }
      }
    }

    await pushNotifyLogRef.doc(id).update(updates);
  } catch (error) {
    console.error(error);
    throw { status: 500, message: 'Internal Server Error' };
  }
}

module.exports = {
  createPushNotifyLog,
  readAllPushNotifyLogs,
  readPushNotifyLog,
  readLatestPushNotifyLog,
  findPushNotifyLog,
  updatePushNotifyLog,
};
