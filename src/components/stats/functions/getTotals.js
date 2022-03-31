export const getTotalTime = (data) => {
  if (!data) return null;

  let total =
    data.totalTimeTyped + data.totalTimeTyped200 + data.totalTimeTyped1000;

  if (data.tenSeconds && data.tenSeconds.allModes.totalTime) {
    total = total + data.tenSeconds.allModes.totalTime;
  }

  return total;
};

export const getTotalRaces = (data) => {
  if (!data) return null;

  let total =
    data.racesCompleted + data.racesCompleted200 + data.racesCompleted1000;

  return total;
};

export const getHighest = (data) => {
  if (!data) return null;

  return data.overAllHighest;
};

export const getAverage = (data) => {
  if (!data) return !null;

  return Math.round(data.overAllAverageWpmAllTime * 100) / 100;
};

export const getRecentAverage = (data) => {
  if (!data) return null;

  if (data.overAllAverageWpmLast10races) return "--";

  return Math.round(data.overAllAverageWpmLast10races * 100) / 100;
};
