import express from "express";
import {
  deleteThumbnail,
  generateThumbnail,
  updateThumbnailFeedback,
} from "../controllers/ThumbnailController.js";
import protect from "../middlewares/auth.js";

const ThumbnailRoutes = express.Router();

/* ===============================
   🎯 GENERATE / IMPROVE THUMBNAIL
================================ */
ThumbnailRoutes.post("/generate", protect, generateThumbnail);

/* ===============================
   👍 👎 FEEDBACK (LIKE / DISLIKE)
================================ */
ThumbnailRoutes.post("/feedback", protect, updateThumbnailFeedback);

/* ===============================
   🗑️ DELETE THUMBNAIL
================================ */
ThumbnailRoutes.delete("/delete/:id", protect, deleteThumbnail);

export default ThumbnailRoutes;
