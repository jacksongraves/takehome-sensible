declare module "global" {
	/** a preset location that the user can select from */
	interface ILocation {
		name: string;
		latitude: number;
		longitude: number;
	}
}

declare module "express-server-nearby-places" {
	/**
	 * Query parameters for the Express API GET /api/places endpoint.
	 * Note, this is neither an accurate nor an exhaustive interface; there are certain
	 * combinations of parameters, value / enum restrictions, etc which apply, but are not
	 * relevant for the scope of this take home assessment, as we are only leveraging the
	 * location and keyword fields.
	 * @see {@link https://developers.google.com/maps/documentation/places/web-service/search-nearby#optional-parameters}
	 */
	interface INearbyPlacesParameters {
		/** specified as latitude,longtitude (e.g., location=-33.8670522%2C151.1957362) */
		latitude: number;
		/** specified as latitude,longtitude (e.g., location=-33.8670522%2C151.1957362) */
		longitude: number;
		/** the keyword term will be used in our implementation */
		keyword: string;
		/** Max 50000meters, this is specified as optional by the docs but is actually required */
		radius: number;
	}

	/**
	 * Per Google API, this is not exhaustive; only the required types for rendering are listed.
	 * @see {@link https://developers.google.com/maps/documentation/places/web-service/search-nearby#Place}
	 */
	interface IPlace {
		formatted_address?: string;
		name?: string;
		rating?: number;
	}

	/**
	 * Response structure for NearbyPlaces, not an exhaustive typing; only the required types for rendering are listed.
	 * @see {@link https://developers.google.com/maps/documentation/places/web-service/search-nearby#PlacesNearbySearchResponse}
	 */
	interface INearbyPlacesResponse {
		html_attributions: string[];
		results: IPlace[];
		status:
			| "OK"
			| "ZERO_RESULTS"
			| "INVALID_REQUEST"
			| "OVER_QUERY_LIMIT"
			| "REQUEST_DENIED"
			| "UNKNOWN_ERROR";
		error_message?: string;
		info_messages?: string[];
		next_page_token?: string;
	}
}
