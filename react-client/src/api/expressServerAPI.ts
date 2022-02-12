import axios from "axios";
import { INearbyPlacesParameters, INearbyPlacesResponse } from "express-server-nearby-places";

/** Our server is simply run on localhost */
const expressServerAPI = axios.create({
	baseURL: `http://localhost:${process.env.EXPRESS_SERVER_PORT || "8081"}/api`,
});

/** Helper method to interrogate the API */
export const searchNearbyPlacesAPI = async ({
	latitude,
	longitude,
	keyword,
}: INearbyPlacesParameters) => {
	const { data } = await expressServerAPI.get<INearbyPlacesResponse>("/places", {
		params: {
			latitude,
			longitude,
			keyword,
		},
	});

	return data;
};
