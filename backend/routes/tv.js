import express from "express";
import {
  getSimilarTv,
  getTrendingTv,
  getTvDetails,
  getTvTrailers,
  getTvByCategory,
} from "../controllers/tv.controller.js";

const router = express.Router();

// Import the TV model

router.get("/trending", getTrendingTv);
router.get("/:id/trailers", getTvTrailers);
router.get("/:id/details", getTvDetails);
router.get("/:id/similar", getSimilarTv);
router.get("/:category", getTvByCategory);
export default router;
