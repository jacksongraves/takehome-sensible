import { Router } from "express";
import { searchNearbyPlacesAPI } from "../controllers";

// Configure a router
const router = Router();

// GET /places
router.route("/places").get(searchNearbyPlacesAPI);

export default router;
