import express from 'express';

import protect from '../middleware/auth.middleware.js';

import {
  createTracker,
  getUserTrackers,
  checkInTracker,
  updateTracker,
  archiveTracker,
  restoreTracker,
  getArchivedTrackers,
  deleteTracker
} from '../controllers/trackercontroller.js';

const router = express.Router();


// CREATE TRACKER
router.post('/', protect, createTracker);

// GET ALL TRACKERS
router.get('/', protect, getUserTrackers);

// CHECK-IN TRACKER
router.post('/check-in', protect, checkInTracker);

// GET ARCHIVED TRACKERS
router.get('/archived/all', protect, getArchivedTrackers);

// UPDATE TRACKER
router.put('/:trackerId', protect, updateTracker);

// ARCHIVE TRACKER
router.patch('/:trackerId/archive', protect, archiveTracker);

// RESTORE TRACKER
router.patch('/:trackerId/restore', protect, restoreTracker);

// DELETE TRACKER
router.delete('/:trackerId', protect, deleteTracker);

export default router;