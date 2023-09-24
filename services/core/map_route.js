const { sendTopicMessage } = require('../cloud_messaging.service');
const { retrieveDirections } = require('../google_map.service');

// PlanRoute handles the HTTP request for an optimal route home.
// It returns a route geom of the optimal route by leveraging
// Google Maps API.
async function planRoute(req, res) {
  try {
    const { Start, End } = req.body;

    // Call handler function to retrieve directions
    const result = await retrieveDirections(Start, End);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Help handles the HTTP request to send a push notification to CareGivers,
// via Firebase Cloud Messaging, when their CareReceivers call for help.
async function help(req, res) {
  try {
    const CrId = req.params.id;
    const requestData = req.body;

    // Convert values to map of string values
    const strMap = {};
    for (const key in requestData) {
      if (requestData.hasOwnProperty(key)) {
        const value = requestData[key];
        strMap[key] = String(value);
      }
    }

    // Call handler function to retrieve directions
    const result = await retrieveDirections(requestData.Start, requestData.End);

    // Assuming you have an FCM function for topic send in your fcm module
    await sendTopicMessage(strMap, CrId);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  planRoute,
  help,
};
