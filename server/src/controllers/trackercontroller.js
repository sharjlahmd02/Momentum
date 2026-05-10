import Tracker from '../models/tracker.model.js';
import TrackingEntry from '../models/trackingEntry.model.js';


// CREATE TRACKER
export const createTracker = async (req, res) => {
  try {

    const {
      title,
      description,
      type,
      startDate,
      endDate,
      color,
      icon,
    } = req.body;

    // VALIDATION
    if (!title || !type) {
      return res.status(400).json({
        message: 'Title and type are required',
      });
    }

    // VALID TYPES
    const validTypes = ['annual', 'monthly', 'custom'];

    if (!validTypes.includes(type)) {
      return res.status(400).json({
        message: 'Invalid tracker type',
      });
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

    // RESPONSE
    res.status(201).json({
      message: 'Tracker created successfully',
      tracker,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};



// GET USER TRACKERS
export const getUserTrackers = async (req, res) => {
  try {

    // FILTERS
    const filter = {
      user: req.user._id,
      isArchived: false,
    };

    // OPTIONAL TYPE FILTER
    if (req.query.type) {
      filter.type = req.query.type;
    }

    // GET TRACKERS
    const trackers = await Tracker.find(filter).sort({
      createdAt: -1,
    });

    // RESPONSE
    res.status(200).json({
      count: trackers.length,
      trackers,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};



// CHECK-IN TRACKER
export const checkInTracker = async (req, res) => {
  try {
    const { trackerId } = req.body;
    const userId = req.user._id;

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    // CHECK EXISTING ENTRY
    const existingEntry = await TrackingEntry.findOne({
      user: userId,
      tracker: trackerId,
      date: today,
    });

    if (existingEntry) {
      return res.status(400).json({
        message: 'Already checked in today',
      });
    }

    // CREATE ENTRY
    await TrackingEntry.create({
      user: userId,
      tracker: trackerId,
      date: today,
      completed: true,
    });

    // GET TRACKER
    const tracker = await Tracker.findById(trackerId);

    // YESTERDAY DATE
    const yesterday = new Date();
    yesterday.setUTCDate(yesterday.getUTCDate() - 1);
    yesterday.setUTCHours(0, 0, 0, 0);

    // CHECK IF YESTERDAY EXISTS
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

    // UPDATE TOTAL COMPLETIONS
    tracker.totalCompletions += 1;

    await tracker.save();

    res.status(201).json({
      message: 'Check-in successful',
      currentStreak: tracker.currentStreak,
      bestStreak: tracker.bestStreak,
      totalCompletions: tracker.totalCompletions,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



// UPDATE TRACKER
export const updateTracker = async (req, res) => {
  try {

    const { trackerId } = req.params;

    const {
      title,
      description,
      color,
      icon,
    } = req.body;

    // FIND TRACKER
    const tracker = await Tracker.findOne({
      _id: trackerId,
      user: req.user._id,
    });

    if (!tracker) {
      return res.status(404).json({
        message: 'Tracker not found',
      });
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

    res.status(200).json({
      message: 'Tracker updated successfully',
      tracker,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};



// ARCHIVE TRACKER
export const archiveTracker = async (req, res) => {
  try {

    const { trackerId } = req.params;

    // FIND TRACKER
    const tracker = await Tracker.findOne({
      _id: trackerId,
      user: req.user._id,
    });

    if (!tracker) {
      return res.status(404).json({
        message: 'Tracker not found',
      });
    }

    // ARCHIVE TRACKER
    tracker.isArchived = true;

    await tracker.save();

    res.status(200).json({
      message: 'Tracker archived successfully',
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};



// RESTORE TRACKER 
export const restoreTracker = async (req, res) => {
  try {

    const { trackerId } = req.params;

    // FIND TRACKER
    const tracker = await Tracker.findOne({
      _id: trackerId,
      user: req.user._id,
    });

    if (!tracker) {
      return res.status(404).json({
        message: 'Tracker not found',
      });
    }

    // RESTORE TRACKER
    tracker.isArchived = false;

    await tracker.save();

    res.status(200).json({
      message: 'Tracker restored successfully',
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};



// GET ARCHIVED TRACKER
export const getArchivedTrackers = async (req, res) => {
  try {

    // GET ARCHIVED TRACKERS
    const trackers = await Tracker.find({
      user: req.user._id,
      isArchived: true,
    }).sort({
      updatedAt: -1,
    });

    res.status(200).json({
      count: trackers.length,
      trackers,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};




// DELETE TRACKER FROM ARCHIVE
export const deleteTracker = async (req, res) => {
  try {

    const { trackerId } = req.params;

    // FIND TRACKER
    const tracker = await Tracker.findOne({
      _id: trackerId,
      user: req.user._id,
    });

    if (!tracker) {
      return res.status(404).json({
        message: 'Tracker not found',
      });
    }

    // ALLOW DELETE ONLY IF ARCHIVED
    if (!tracker.isArchived) {
      return res.status(400).json({
        message:
          'Archive tracker before deleting permanently',
      });
    }

    // DELETE TRACKING ENTRIES
    await TrackingEntry.deleteMany({
      tracker: trackerId,
    });

    // DELETE TRACKER
    await tracker.deleteOne();

    res.status(200).json({
      message: 'Tracker deleted permanently',
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};