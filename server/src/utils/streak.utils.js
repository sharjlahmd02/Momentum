export const validateStreak = (tracker) => {

  // NO ACTIVITY YET
  if (!tracker.updatedAt) {
    return tracker;
  }

  // TODAY
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  // LAST UPDATE DATE
  const lastUpdate = new Date(tracker.updatedAt);
  lastUpdate.setUTCHours(0, 0, 0, 0);

  // DIFFERENCE IN DAYS
  const diffTime = today - lastUpdate;

  const diffDays =
    diffTime / (1000 * 60 * 60 * 24);

  // IF MISSED MORE THAN 1 DAY
  if (diffDays > 1) {
    tracker.currentStreak = 0;
  }

  return tracker;
};