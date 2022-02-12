import axios from "axios";
import { INearbyPlacesParameters, INearbyPlacesResponse } from "express-server-nearby-places";

const expressServerAPI = axios.create({
	baseURL: `http://localhost:${process.env.EXPRESS_SERVER_PORT || "8081"}/api`,
});

export const searchNearbyPlacesAPI = async ({
	latitude,
	longitude,
	keyword,
}: INearbyPlacesParameters) => {
	console.log(latitude, longitude, keyword);
	const { data } = await expressServerAPI.get<INearbyPlacesResponse>("/places", {
		params: {
			latitude,
			longitude,
			keyword,
		},
	});

	return data;
};
