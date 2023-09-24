import { retrieveDirections } from '../google_map.service';

const pushNotifyLogController = require('../../controllers/pushNotify.controller');

const addPushNotifyLog = async (req, res) =>  {
    try {
      // Parse the request body
      const pushNotifyLog = JSON.parse(req.body);
  
      // Get the latest Push Notify log
      const latestPushNotifyLog = await pushNotifyLogController.readLatestPushNotifyLog(pushNotifyLog.CrId);
  
      // Convert the log to JSON
      const jsonData = JSON.stringify(pushNotifyLog);
  
      // Create the Push Notify log
      const pushNotifyLogId = await pushNotifyLogController.createPushNotifyLog(jsonData);
  
      // Create the home map
      const homeMap = { Status: 'home' };
      const homeJson = JSON.stringify(homeMap);
      const homeBytes = Buffer.from(homeJson);
  
      // Update the Push Notify log
      await pushNotifyLogController.updatePushNotifyLog(homeBytes, latestPushNotifyLog.PushNotifyId);
  
      res.status(202).json({ PushNotifyId: pushNotifyLogId });
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }


const getAllPushNotifyLogs = async (req, res) =>{
    try {
      // Get all Push Notify logs
      const pushNotifyLogs = await pushNotifyLogController.readAllPushNotifyLogs();
  
      res.status(200).json(pushNotifyLogs);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }

  
const getLatestPushNotifyLog = async (req, res)=> {
    try {
      const id = req.params.id;
  
      // Get the latest Push Notify log by ID
      const latestPushNotifyLog = await pushNotifyLogController.readLatestPushNotifyLog(id);
  
      if (!latestPushNotifyLog) {
        res.status(404).json({ message: 'No Push Notify Logs found for this ID' });
      } else {
        res.status(200).json(latestPushNotifyLog);
      }
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }
  

const acceptPushNotifyRequest = async (req, res) =>{
    try {
      const requestBody = req.body;
  
      // Retrieve existing Push Notify log
      const pushNotifyLog = await pushNotifyLogController.findPushNotifyLog(requestBody.PushNotifyId);
      if (!pushNotifyLog) {
        res.status(404).json({ message: 'Push Notify Log not found' });
        return;
      }
      
      // Retrieve care receiver involved (if needed)
      const careReceiver = await database.ReadCareReceiver(pushNotifyLog.CrId);
      if (!careReceiver) {
        res.status(404).json({ message: 'Care receiver not found' });
        return;
      }
  
      // Retrieve requesting volunteer
      const volunteer = await database.ReadVolunteer(requestBody.VId);
      if (!volunteer) {
        res.status(404).json({ message: 'Volunteer not found' });
        return;
      }
  
      // Authenticate volunteer and verify volunteer certification validity
      const currentTime = Date.now() / 1000; // Current time in seconds
      if (volunteer.CertificationStart >= currentTime || volunteer.CertificationEnd <= currentTime) {
        res.status(400).json({ message: 'Volunteer not certified' });
        return;
      } else if (requestBody.AuthID !== careReceiver.AuthID) {
        res.status(400).json({ message: 'Authentication failed' });
        return;
      } else if (pushNotifyLog.Status !== 'pending') {
        res.status(400).json({ message: 'Push Notify Log has already been processed' });
        return;
      } else {
        // Update Push Notify Log with new status and volunteer information
        const data = {
          VId: requestBody.VId,
          Volunteer: volunteer.Name,
          VolunteerContactNum: volunteer.ContactNum,
          Status: 'processed',
        };
        const dataJson = JSON.stringify(data);
  
        await pushNotifyLogController.updatePushNotifyLog(dataJson, requestBody.PushNotifyId);
  
        // Send instructions or perform additional actions as needed
        const careGiver = await database.ReadCareGiver(careReceiver.CareGiver[0].Id);
        if (!careGiver) {
          res.status(404).json({ message: 'No care giver found' });
          return;
        }
  
        const directions = await retrieveDirections(
          `${pushNotifyLog.StartLocation.Lat},${pushNotifyLog.StartLocation.Lng}`,
          careGiver.Address
        );
  
        // Send response
        const resMsg = {
          CrId: careReceiver.CrId,
          Name: careReceiver.Name,
          Address: careReceiver.Address,
          ContactNum: careReceiver.ContactNum,
          CgName: careGiver.Name,
          CgContactNum: careGiver.ContactNum,
          RouteGeom: directions.OverallPolyline,
        };
        res.status(200).json({ message: resMsg });
      } 
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }
  


  const updatePushNotifyStatus = async (req, res) => {
    try {
      const id = req.params.id;
      const reqBod = await getRequestBody(req);
  
      // Retrieve latest Push Notify log based on the provided ID
      const latestPushNotifyLog = await pushNotifyLogController.readLatestPushNotifyLog(id);
      if (!latestPushNotifyLog) {
        res.status(404).json({ message: 'Push Notify Log not found' });
        return;
      }
  
      // Convert the request body to a byte array
      const bytesData = Buffer.from(reqBod);
  
      // Update the Push Notify Log
      await pushNotifyLogController.updatePushNotifyLog(bytesData, latestPushNotifyLog.PushNotifyId);
  
      res.status(200).json({ message: 'Push Notify Log updated successfully' });
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }


  export default {
    updatePushNotifyStatus,
    acceptPushNotifyRequest,
    getAllPushNotifyLogs,
    getLatestPushNotifyLog,
    addPushNotifyLog
  }