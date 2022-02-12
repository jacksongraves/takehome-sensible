import axios from "axios";
import { INearbyPlacesMethod, INearbyPlacesResponse } from "nearbyplaces";

const nearbyPlacesAPI = axios.create({
	baseURL: "https://maps.googleapis.com/maps/api/place/nearbysearch",
});

export const searchNearbyPlacesAPI = async ({
	output = "json",
	latitude,
	longitude,
	keyword,
}: INearbyPlacesMethod) => {
	const { data } = await nearbyPlacesAPI.get<INearbyPlacesResponse>(output, {
		params: {
			location: `${latitude},${longitude}`,
			keyword,
			key: process.env.REACT_APP_GOOGLE_API_TOKEN,
		},
	});

	return data;
};
