declare module "global" {}

declare module "nearbyplaces" {
	/**
	 * Query parameters for the Nearby Places API.
	 * Note, this is neither a wholly accurate nor exhaustive interface; there are certain
	 * combinations of parameters, value / enum restrictions, etc which apply, but are not
	 * relevant for the scope of this take home assessment, as we are only leveraging the
	 * location and keyword fields.
	 * @see {@link https://developers.google.com/maps/documentation/places/web-service/search-nearby#optional-parameters}
	 */
	interface INearbyPlacesParameters {
		/** specified as latitude,longtitude (e.g., location=-33.8670522%2C151.1957362) */
		location: string;
		/** the keyword term will be used in our implementation */
		keyword?: string;
		// Other parameters are not relevant to this exercise
		language?: string;
		maxprice?: number;
		minprice?: number;
		name?: string;
		opennow?: boolean;
		pagetoken?: string;
		radius?: number;
		rankby?: "prominence" | "distance";
		type?: string;
	}

	/** Method interface to expose only key parameters being used for the API call */
	interface INearbyPlacesMethod {
		/** output type, json or xml, default json */
		output: "json" | "xml";
		/** Numerical latitude, -90 to 90 */
		latitude: number;
		/** Numerical longitude, -180 to 180 */
		longitude: number;
		/** Search keyword, which we treat as required */
		keyword: string;
	}
}
