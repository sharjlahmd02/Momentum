import express from "express";

import protect from "../middleware/auth.middleware.js";

import {
  createTracker,
  getUserTrackers,
  checkInTracker,
  updateTracker,
  archiveTracker,
  restoreTracker,
  getArchivedTrackers,
  deleteTracker,
  getTrackerConsistency,
  getTrackerHeatmap,
  getModuleHeatmap,
} from "../controllers/trackercontroller.js";

import {
  createTrackerValidation,
  updateTrackerValidation,
  checkInValidation,
  validate,
} from "../validators/tracker.validator.js";

const router = express.Router();

// CREATE TRACKER
router.post("/", protect, createTrackerValidation, validate, createTracker);

// GET ALL TRACKERS
router.get("/", protect, getUserTrackers);

// GET TRACKER HEATMAP (MODULE)
router.get("/heatmap/module", protect, getModuleHeatmap);

// GET TRACKER HEATMAP (ANNUAL)

router.get("/:trackerId/heatmap", protect, getTrackerHeatmap);

// CHECK-IN TRACKER
router.post("/check-in", protect, checkInValidation, validate, checkInTracker);

// GET ARCHIVED TRACKERS
router.get("/archived/all", protect, getArchivedTrackers);

// GET TRACKER CONSISTENCY
router.get("/:trackerId/consistency", protect, getTrackerConsistency);

// UPDATE TRACKER
router.put(
  "/:trackerId",
  protect,
  updateTrackerValidation,
  validate,
  updateTracker,
);

// ARCHIVE TRACKER
router.patch("/:trackerId/archive", protect, archiveTracker);

// RESTORE TRACKER
router.patch("/:trackerId/restore", protect, restoreTracker);

// DELETE TRACKER
router.delete("/:trackerId", protect, deleteTracker);

export default router;
