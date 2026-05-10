import mongoose from 'mongoose';

const trackerSchema = new mongoose.Schema(
  {
    // TRACKER OWNER
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    // TRACKER TITLE
    title: {
      type: String,
      required: true,
      trim: true,
    },

    // OPTIONAL DESCRIPTION
    description: {
      type: String,
      trim: true,
    },

    // MODULE TYPE
    type: {
      type: String,
      enum: ['annual', 'monthly', 'custom'],
      required: true,
    },

    // FOR CUSTOM TRACKERS
    startDate: {
      type: Date,
    },

    endDate: {
      type: Date,
    },

    // UI PURPOSES
    color: {
      type: String,
      default: '#22c55e',
    },

    icon: {
      type: String,
      default: 'check',
    },

    // STREAK DATA
    currentStreak: {
      type: Number,
      default: 0,
    },

    bestStreak: {
      type: Number,
      default: 0,
    },

    totalCompletions: {
      type: Number,
      default: 0,
    },

    // SOFT ARCHIVE
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Tracker = mongoose.model('Tracker', trackerSchema);


//
// INDEXES
//
trackerSchema.index({
  user: 1,
  type: 1,
});

trackerSchema.index({
  user: 1,
  isArchived: 1,
});

trackerSchema.index({
  user: 1,
  createdAt: -1,
});


export default Tracker;