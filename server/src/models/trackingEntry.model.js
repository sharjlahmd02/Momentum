import mongoose from "mongoose";

const trackingEntrySchema = new mongoose.Schema(
  {
    // TRACKER OWNER
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // RELATED TRACKER
    tracker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tracker",
      required: true,
    },

    // COMPLETION DATE
    date: {
      type: Date,
      required: true,
    },

    // COMPLETED OR NOT
    completed: {
      type: Boolean,
      default: true,
    },

    // OPTIONAL NOTE
    note: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);


//
// INDEXES
//

// ONLY ONE ENTRY PER DAY
trackingEntrySchema.index(
  {
    user: 1,
    tracker: 1,
    date: 1,
  },
  {
    unique: true,
  },
);

// HEATMAP & ANALYTICS
trackingEntrySchema.index({
  tracker: 1,
  date: 1,
});

// USER HISTORY
trackingEntrySchema.index({
  user: 1,
  createdAt: -1,
});

const TrackingEntry = mongoose.model(
  "TrackingEntry",
  trackingEntrySchema,
);

export default TrackingEntry;