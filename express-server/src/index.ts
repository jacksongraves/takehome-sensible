// Node.js modules for server setup
import express from "express";
import cors from "cors";
import { config } from "dotenv";

// Route & middleware imports
import routes from "./routes";
import { errorMiddleware, notFoundMiddleware } from "./middlewares";

// Set up the API and environment variables
config();

// Disable logging in production
if (process.env.NODE_ENV === "production") {
	const noOp = () => {};
	console.log = noOp;
	console.warn = noOp;
	console.error = noOp;
}

const app = express();

// CORS is required to allow localhost to interrogate Google's API
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Get root endpoint
app.get("/", (req, res) => {
	res.send("API is running...");
});

// Initialize Route Families
app.use("/api", routes);

// Specify middleware for global not found (404) and other error handling
app.use(notFoundMiddleware);
app.use(errorMiddleware);

// Grab the port
const PORT: number = parseInt(process.env.PORT || "5000") || 5000;

// Create a one-time listener message for starting the server
const listener = (): void =>
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);

// Launch the server and listen on target port
app.listen(PORT, listener);

export default app;
