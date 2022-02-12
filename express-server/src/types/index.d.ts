declare module "express-server-types" {
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
}
