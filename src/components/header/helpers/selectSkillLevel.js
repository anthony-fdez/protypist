export const selectSkillLevel = ({ wpmAverage }) => {
  if (wpmAverage !== undefined) {
    if (wpmAverage <= 20) {
      return `Beginer: ${Math.round(wpmAverage * 100) / 100}wpm`;
    } else if (wpmAverage <= 40) {
      return `Average: ${Math.round(wpmAverage * 100) / 100}wpm`;
    } else if (wpmAverage <= 60) {
      return `Intermidiate: ${Math.round(wpmAverage * 100) / 100}wpm`;
    } else if (wpmAverage <= 80) {
      return `Pro: ${Math.round(wpmAverage * 100) / 100}wpm`;
    } else {
      return `Master: ${Math.round(wpmAverage * 100) / 100}wpm`;
    }
  }
};
