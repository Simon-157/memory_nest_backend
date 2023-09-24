const admin = require('firebase-admin');

const serviceAccount = require('../memorynest-config.json'); 

const firebaseConfig = {
  credential: admin.credential.cert(serviceAccount),
};

admin.initializeApp(firebaseConfig);

const db = admin.firestore();

module.exports = { admin, db };
