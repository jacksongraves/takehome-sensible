import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { Client, PlacesNearbyResponse } from "@googlemaps/google-maps-services-js";

/**
 * Set up the Google NodeJS API Client
 * We'd likely set up this config elsewhere if it was more widely used across other endpoints,
 * however, for this lightweight application, this should be fine
 */
const googleAPIClient = new Client({});

/**
 * GET /places
 * @throws {Error}
 * @return {Promise}
 */
export const searchNearbyPlacesAPI = expressAsyncHandler(
	async (
		req: Request<{}, {}, {}, { keyword: string; latitude: string; longitude: string }>,
		res: Response
	): Promise<void> => {
		// Log the requested resource
		console.log("GET /places", req.query, process.env.GOOGLE_MAPS_API_KEY);

		try {
			// Destructure the request body
			const { keyword, latitude, longitude } = req.query;

			// Interrogate the API using the Google NodeJS Client
			const data = await googleAPIClient.placesNearby({
				params: {
					location: `${latitude},${longitude}`,
					keyword: keyword || "",
					key: process.env.GOOGLE_MAPS_API_KEY || "",
				},
			});

			console.log(data);

			// Send the data back to the client
			res.status(200).json(data);
		} catch (error) {
			// @ts-ignore
			console.log(error);
			// TODO add any custom error handling
			throw error;
		}
	}
);
