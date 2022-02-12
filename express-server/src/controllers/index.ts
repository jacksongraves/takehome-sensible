import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { Client, PlacesNearbyResponse } from "@googlemaps/google-maps-services-js";
import { INearbyPlacesParameters } from "express-server-types";

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
	async (req: Request<{}, {}, {}, INearbyPlacesParameters>, res: Response): Promise<void> => {
		try {
			// Destructure the request body
			const { keyword, latitude, longitude, radius } = req.query;

			// Interrogate the API using the Google NodeJS Client
			const { data } = await googleAPIClient.placesNearby({
				params: {
					location: `${latitude},${longitude}`,
					keyword: keyword || "",
					radius: Number(radius || 50000),
					key: process.env.GOOGLE_MAPS_API_KEY || "",
				},
			});

			// Send the data back to the client; they only need the list of results
			res.status(200).json(data.results || []);
		} catch (error) {
			throw error;
		}
	}
);
