import Tracker from "../models/tracker.model.js";
import TrackingEntry from "../models/trackingEntry.model.js";

import asyncHandler from "express-async-handler";

import { successResponse } from "../utils/response.utils.js";

// CREATE TRACKER
export const createTracker = asyncHandler(async (req, res) => {
  const { title, description, type, startDate, endDate, color, icon } =
    req.body;

  // VALIDATION
  if (!title || !type) {
    res.status(400);
    throw new Error("Title and type are required");
  }

  // VALID TYPES
  const validTypes = ["annual", "monthly", "custom"];

  if (!validTypes.includes(type)) {
    res.status(400);
    throw new Error("Invalid tracker type");
  }

  // CREATE TRACKER
  const tracker = await Tracker.create({
    user: req.user._id,

    title,
    description,
    type,

    startDate,
    endDate,

    color,
    icon,
  });

  return successResponse(
    res,
    "Tracker created successfully",
    {
      tracker,
    },
    201,
  );
});

// GET USER TRACKERS
export const getUserTrackers = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // PAGINATION
  const page = Number(req.query.page) || 1;

  const limit = Number(req.query.limit) || 10;

  const skip = (page - 1) * limit;

  // FILTERS
  const filter = {
    user: userId,
    isArchived: false,
  };

  // TYPE FILTER
  if (req.query.type) {
    filter.type = req.query.type;
  }

  // SEARCH FILTER
  if (req.query.search) {
    filter.title = {
      $regex: req.query.search,
      $options: "i",
    };
  }

  // SORTING
  let sortOption = { createdAt: -1 };

  if (req.query.sort === "oldest") {
    sortOption = { createdAt: 1 };
  }

  if (req.query.sort === "streak") {
    sortOption = { currentStreak: -1 };
  }

  // TOTAL ITEMS
  const totalItems = await Tracker.countDocuments(filter);

  // FETCH TRACKERS
  const trackers = await Tracker.find(filter)
    .sort(sortOption)
    .skip(skip)
    .limit(limit);

  // TOTAL PAGES
  const totalPages = Math.ceil(totalItems / limit);

  return successResponse(res, "Trackers fetched successfully", {
    trackers,

    pagination: {
      currentPage: page,
      totalPages,
      totalItems,
      limit,
    },
  });
});

// CHECK-IN TRACKER
export const checkInTracker = asyncHandler(async (req, res) => {
  const { trackerId } = req.body;

  const userId = req.user._id;

  // FIND TRACKER
  const tracker = await Tracker.findOne({
    _id: trackerId,
    user: userId,
    isArchived: false,
  });

  if (!tracker) {
    res.status(404);
    throw new Error("Tracker not found");
  }

  // TODAY
  const today = new Date();

  today.setUTCHours(0, 0, 0, 0);

  // CHECK EXISTING ENTRY
  const existingEntry = await TrackingEntry.findOne({
    user: userId,
    tracker: trackerId,
    date: today,
  });

  if (existingEntry) {
    res.status(400);
    throw new Error("Already checked in today");
  }

  // CREATE ENTRY
  const entry = await TrackingEntry.create({
    user: userId,
    tracker: trackerId,
    date: today,
    completed: true,
  });

  // YESTERDAY
  const yesterday = new Date();

  yesterday.setUTCDate(yesterday.getUTCDate() - 1);

  yesterday.setUTCHours(0, 0, 0, 0);

  // CHECK YESTERDAY ENTRY
  const yesterdayEntry = await TrackingEntry.findOne({
    user: userId,
    tracker: trackerId,
    date: yesterday,
  });

  // UPDATE STREAK
  if (yesterdayEntry) {
    tracker.currentStreak += 1;
  } else {
    tracker.currentStreak = 1;
  }

  // UPDATE BEST STREAK
  if (tracker.currentStreak > tracker.bestStreak) {
    tracker.bestStreak = tracker.currentStreak;
  }

  // TOTAL COMPLETIONS
  tracker.totalCompletions += 1;

  await tracker.save();

  return successResponse(
    res,
    "Check-in successful",
    {
      entry,

      currentStreak: tracker.currentStreak,

      bestStreak: tracker.bestStreak,

      totalCompletions: tracker.totalCompletions,
    },
    201,
  );
});

// UPDATE TRACKER
export const updateTracker = asyncHandler(async (req, res) => {
  const { trackerId } = req.params;

  const { title, description, color, icon } = req.body;

  // FIND TRACKER
  const tracker = await Tracker.findOne({
    _id: trackerId,
    user: req.user._id,
  });

  if (!tracker) {
    res.status(404);
    throw new Error("Tracker not found");
  }

  // UPDATE FIELDS
  if (title !== undefined) {
    tracker.title = title;
  }

  if (description !== undefined) {
    tracker.description = description;
  }

  if (color !== undefined) {
    tracker.color = color;
  }

  if (icon !== undefined) {
    tracker.icon = icon;
  }

  await tracker.save();

  return successResponse(res, "Tracker updated successfully", {
    tracker,
  });
});

// ARCHIVE TRACKER
export const archiveTracker = asyncHandler(async (req, res) => {
  const { trackerId } = req.params;

  // FIND TRACKER
  const tracker = await Tracker.findOne({
    _id: trackerId,
    user: req.user._id,
  });

  if (!tracker) {
    res.status(404);
    throw new Error("Tracker not found");
  }

  // ARCHIVE TRACKER
  tracker.isArchived = true;

  await tracker.save();

  return successResponse(res, "Tracker archived successfully");
});

// RESTORE TRACKER
export const restoreTracker = asyncHandler(async (req, res) => {
  const { trackerId } = req.params;

  // FIND TRACKER
  const tracker = await Tracker.findOne({
    _id: trackerId,
    user: req.user._id,
  });

  if (!tracker) {
    res.status(404);
    throw new Error("Tracker not found");
  }

  // RESTORE TRACKER
  tracker.isArchived = false;

  await tracker.save();

  return successResponse(res, "Tracker restored successfully");
});

// GET ARCHIVED TRACKERS
export const getArchivedTrackers = asyncHandler(async (req, res) => {
  const trackers = await Tracker.find({
    user: req.user._id,
    isArchived: true,
  }).sort({
    updatedAt: -1,
  });

  return successResponse(res, "Archived trackers fetched successfully", {
    count: trackers.length,
    trackers,
  });
});

// DELETE TRACKER
export const deleteTracker = asyncHandler(async (req, res) => {
  const { trackerId } = req.params;

  // FIND TRACKER
  const tracker = await Tracker.findOne({
    _id: trackerId,
    user: req.user._id,
  });

  if (!tracker) {
    res.status(404);
    throw new Error("Tracker not found");
  }

  // ALLOW DELETE ONLY IF ARCHIVED
  if (!tracker.isArchived) {
    res.status(400);
    throw new Error("Archive tracker before deleting permanently");
  }

  // DELETE TRACKING ENTRIES
  await TrackingEntry.deleteMany({
    tracker: trackerId,
  });

  // DELETE TRACKER
  await tracker.deleteOne();

  return successResponse(res, "Tracker deleted permanently");
});

// GET TRACKER CONSISTENCY
export const getTrackerConsistency =
  asyncHandler(async (req, res) => {

    const { trackerId } = req.params;

    // FIND TRACKER
    const tracker = await Tracker.findOne({
      _id: trackerId,
      user: req.user._id,
    });

    if (!tracker) {
      res.status(404);
      throw new Error('Tracker not found');
    }

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    //
    // START DATE LOGIC (IMPORTANT FIX)
    //
    let startDate = tracker.startDate
      ? new Date(tracker.startDate)
      : null;

    // fallback → first entry if startDate not set
    if (!startDate) {
      const firstEntry =
        await TrackingEntry.findOne({
          tracker: tracker._id,
          user: req.user._id,
        }).sort({ date: 1 });

      if (firstEntry) {
        startDate = new Date(firstEntry.date);
      } else {
        return successResponse(
          res,
          'No tracking data found',
          {
            trackerTitle: tracker.title,
            completedDays: 0,
            totalDays: 0,
            consistencyPercentage: 0,
          }
        );
      }
    }

    startDate.setUTCHours(0, 0, 0, 0);

    //
    // END DATE LOGIC
    //
    let endDate = today;

    if (
      tracker.type === 'custom' &&
      tracker.endDate
    ) {
      const customEnd = new Date(
        tracker.endDate
      );

      endDate =
        customEnd < today
          ? customEnd
          : today;
    }

    //
    // TOTAL DAYS
    //
    const totalDays =
      Math.floor(
        (endDate - startDate) /
          (1000 * 60 * 60 * 24)
      ) + 1;

    //
    // COMPLETED DAYS
    //
    const completedDays =
      await TrackingEntry.countDocuments({
        tracker: tracker._id,
        user: req.user._id,
        completed: true,
        date: {
          $gte: startDate,
          $lte: endDate,
        },
      });

    //
    // CONSISTENCY %
    //
    const consistencyPercentage =
      totalDays > 0
        ? Math.round(
            (completedDays / totalDays) *
              100
          )
        : 0;

    return successResponse(
      res,
      'Consistency fetched successfully',
      {
        trackerTitle: tracker.title,
        trackerType: tracker.type,
        startDate,
        endDate,
        completedDays,
        totalDays,
        consistencyPercentage,
      }
    );

  });

// GET TRACKER HEATMAP (ANNUAL)
export const getTrackerHeatmap =
  asyncHandler(async (req, res) => {

    const { trackerId } = req.params;

    // FIND TRACKER
    const tracker = await Tracker.findOne({
      _id: trackerId,
      user: req.user._id,
    });

    if (!tracker) {
      res.status(404);
      throw new Error('Tracker not found');
    }

    // GET ENTRIES
    const entries =
      await TrackingEntry.find({
        tracker: tracker._id,
        user: req.user._id,
        completed: true,
      }).sort({
        date: 1,
      });

    // FORMAT HEATMAP
    const heatmap = entries.map((entry) => {

      const count = 1;

      let level = 0;

      if (count >= 5) {
        level = 4;
      }

      else if (count >= 3) {
        level = 3;
      }

      else if (count >= 2) {
        level = 2;
      }

      else if (count >= 1) {
        level = 1;
      }

      return {
        date: entry.date
          .toISOString()
          .split('T')[0],

        count,

        level,
      };

    });

    return successResponse(
      res,
      'Tracker heatmap fetched successfully',
      {
        trackerTitle: tracker.title,
        trackerType: tracker.type,
        heatmap,
      }
    );

  });


// GET TRACKER (MODULE) HEATMAP
export const getModuleHeatmap =
  asyncHandler(async (req, res) => {

    const { type } = req.query;

    const validTypes = [
      'annual',
      'monthly',
      'custom',
    ];

    if (!validTypes.includes(type)) {
      res.status(400);

      throw new Error(
        'Invalid module type'
      );
    }

    // GET TRACKERS
    const trackers = await Tracker.find({
      user: req.user._id,
      type,
      isArchived: false,
    });

    const trackerIds = trackers.map(
      (tracker) => tracker._id
    );

    // GET ENTRIES
    const entries =
      await TrackingEntry.find({
        user: req.user._id,

        tracker: {
          $in: trackerIds,
        },

        completed: true,
      });

    //
    // GROUP BY DATE
    //
    const grouped = {};

    entries.forEach((entry) => {

      const date = entry.date
        .toISOString()
        .split('T')[0];

      grouped[date] =
        (grouped[date] || 0) + 1;

    });

    //
    // FORMAT HEATMAP
    //
    const heatmap = Object.entries(
      grouped
    ).map(([date, count]) => {

      let level = 0;

      if (count >= 5) {
        level = 4;
      }

      else if (count >= 3) {
        level = 3;
      }

      else if (count >= 2) {
        level = 2;
      }

      else if (count >= 1) {
        level = 1;
      }

      return {
        date,
        count,
        level,
      };

    });

    return successResponse(
      res,
      'Module heatmap fetched successfully',
      {
        moduleType: type,
        totalTrackers: trackers.length,
        heatmap,
      }
    );

  });