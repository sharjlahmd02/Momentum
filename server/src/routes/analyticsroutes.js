import express from 'express';
import protect from '../middleware/auth.middleware.js';
import { getDashboardStats, getTrackerHeatmap } from '../controllers/analyticscontroller.js';

const router = express.Router();

router.get('/dashboard', protect, getDashboardStats);
router.get('/heatmap/:trackerId', protect, getTrackerHeatmap);

export default router;