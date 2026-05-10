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


// Ensure a user can only have one entry per tracker per date

trackingEntrySchema.index({ tracker: 1, date: 1 }, { unique: true });


const TrackingEntry = mongoose.model(
  'TrackingEntry',
  trackingEntrySchema
);

export default TrackingEntry;