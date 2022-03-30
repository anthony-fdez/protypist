export const calculateWordsPerMinute = ({ charactersTyped, timeSeconds }) => {
  let charactersPerSecond = charactersTyped / timeSeconds;
  let wordsPerMinute = (charactersPerSecond * 60) / 5;
  wordsPerMinute = Math.round(wordsPerMinute * 100) / 100;

  return wordsPerMinute;
};
