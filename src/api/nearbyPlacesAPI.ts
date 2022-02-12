import axios from "axios";
import { INearbyPlacesMethod } from "nearbyplaces";

const nearbyPlacesAPI = axios.create({
	baseURL: "https://maps.googleapis.com/maps/api/place/nearbysearch",
});

const searchNearbyPlacesAPI = ({ output, latitude, longitude, keyword }: INearbyPlacesMethod) => {};
