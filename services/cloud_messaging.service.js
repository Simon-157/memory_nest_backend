const { fcm } = require("../config/firebase.config");

// Send a push notification to a specific topic
async function sendTopicMessage(topic, body) {
  try {
    const message = {
      notification: {
        title: 'MemoryNest',
        body: `${topic} requires your assistance!`,
      },
      topic,
    };

    const response = await fcm.send(message);
    console.log('Push notification sent:', response);
  } catch (error) {
    console.error('Something went wrong while sending push notification:', error);
    throw error;
  }
}

module.exports = {
  sendTopicMessage,
};
