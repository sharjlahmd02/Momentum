import Tracker from "../models/tracker.model.js";
import TrackingEntry from "../models/trackingEntry.model.js";
import { validateStreak } from "../utils/streak.utils.js";

// DASHBOARD STATS
export const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user._id;

    // ALL ACTIVE TRACKERS
    let trackers = await Tracker.find({
      user: userId,
      isArchived: false,
    });

    // VALIDATE STREAKS
    trackers = trackers.map((tracker) => validateStreak(tracker));

    // TOTAL COMPLETIONS (ALL TIME)
    const totalCompletions = await TrackingEntry.countDocuments({
      user: userId,
      completed: true,
    });

    // BEST STREAK OVERALL
    let bestStreak = 0;
    trackers.forEach((t) => {
      if (t.bestStreak > bestStreak) {
        bestStreak = t.bestStreak;
      }
    });

    // CURRENT STREAK TOTAL (SUM VIEW)
    let totalCurrentStreak = 0;
    trackers.forEach((t) => {
      totalCurrentStreak += t.currentStreak;
    });

    // TYPE BREAKDOWN
    const breakdown = {
      annual: 0,
      monthly: 0,
      custom: 0,
    };

    trackers.forEach((t) => {
      breakdown[t.type]++;
    });

    res.status(200).json({
      totalActiveTrackers: trackers.length,
      totalCompletions,
      bestStreak,
      totalCurrentStreak,
      breakdown,
      trackers,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET TRACKER HEATMAP
export const getTrackerHeatmap = async (req, res) => {
  try {
    const { trackerId } = req.params;
    const userId = req.user._id;

    // GET ALL TRACKER ENTRIES
    const entries = await TrackingEntry.find({
      user: userId,
      tracker: trackerId,
      completed: true,
    });

    // MAP COMPLETED DATES
    const completedMap = {};

    entries.forEach((entry) => {
      const date = entry.date.toISOString().split("T")[0];

      completedMap[date] = (completedMap[date] || 0) + 1;
    });

    // LAST 365 DAYS
    const heatmap = [];

    const today = new Date();

    for (let i = 364; i >= 0; i--) {
      const currentDate = new Date(today);

      currentDate.setDate(today.getDate() - i);

      currentDate.setUTCHours(0, 0, 0, 0);

      const formattedDate = currentDate.toISOString().split("T")[0];

      const count = completedMap[formattedDate] || 0;

      // INTENSITY LEVELS
      let level = 0;

      if (count >= 1) level = 1;
      if (count >= 2) level = 2;
      if (count >= 3) level = 3;
      if (count >= 4) level = 4;

      heatmap.push({
        date: formattedDate,
        count,
        level,
      });
    }

    res.status(200).json({
      trackerId,
      heatmap,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
