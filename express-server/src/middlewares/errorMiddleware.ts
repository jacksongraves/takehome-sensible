import { NextFunction, Request, Response } from "express";

// Specify middleware for global error handling
export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
	// Supply the error code if available, else override a good 200 request with an internal server error code of 500
	const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

	// Pass in the status code and relay the message to the client
	res.status(statusCode).json({
		message: err.message,
		stack: process.env.NODE_ENV === "production" ? null : err.stack,
	});
	// NOTE No need to specify next() because we are terminating the request via res.json()
};
