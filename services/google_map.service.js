const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const GOOGLE_MAPS_API_KEY = process.env.MAPS_API_KEY;

// Define data structures
class Location {
  constructor(lat, lng) {
    this.lat = lat;
    this.lng = lng;
  }
}

class Polyline {
  constructor(points) {
    this.points = points;
  }
}

class NewNode {
  constructor(node) {
    this.Distance = node.Distance.Value;
    this.Duration = node.Duration.Value;
    this.StartLocation = node.StartLocation;
    this.EndLocation = node.EndLocation;
    this.HTMLInstructions = node.HTMLInstructions;
    this.Maneuver = node.Maneuver;
    this.Polyline = node.Polyline.Points;
    this.TravelMode = node.TravelMode;
  }
}

class DirectionsResult {
  constructor(polyline, route) {
    this.OverallPolyline = polyline;
    this.Route = route;
  }
}

// Map a JSON object to a Node object
const mapToNode = (data) => {
  try {
    const jsonBytes = JSON.stringify(data);
    const node = JSON.parse(jsonBytes);
    return node;
  } catch (error) {
    throw new Error('Nodes retrieved are in the incorrect format');
  }
}

// Retrieve directions from Google Maps API
const retrieveDirections = async (start, end) => {
  try {
    start = start.replace(/ /g, '+');
    end = end.replace(/ /g, '+');

    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${start}&destination=${end}&mode=walking&key=${GOOGLE_MAPS_API_KEY}`;
    const response = await axios.get(url);

    const { data } = response;
    const { routes } = data;
    const firstRoute = routes[0];

    const polyline = new Polyline(firstRoute.overview_polyline.points);
    const nodes = firstRoute.legs[0].steps.map(mapToNode);
    const newNodeSlice = nodes.map((node) => new NewNode(node));

    const result = new DirectionsResult(polyline.points, newNodeSlice);
    return result;
  } catch (error) {
    throw new Error('Error retrieving directions');
  }
}

module.exports = {
  retrieveDirections,
};
