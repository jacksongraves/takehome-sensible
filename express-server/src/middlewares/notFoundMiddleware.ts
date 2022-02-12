import { NextFunction, Request, Response } from "express";

// Specify middleware for global not found (404) handling
export const notFoundMiddleware = (req: Request, res: Response, next: NextFunction) => {
	// Because we didn't find a resource, throw an error
	const error = new Error(`Not Found - ${req.originalUrl}`);

	// Assign a 404 not found
	res.status(404);

	// Step into the next step of the request
	next(error);
};
