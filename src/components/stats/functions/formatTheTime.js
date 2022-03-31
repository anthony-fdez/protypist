export const formatTheTime = (time) => {
  let hours;
  let minutes;
  let seconds;

  if (time !== undefined) {
    hours = Math.floor(time / 3600);
    time = time % 3600;
    minutes = Math.floor(time / 60);
    seconds = time % 60;
  }

  const formtatedTimeString = `${
    hours === 0 ? "00" : hours < 10 ? "0" + hours : hours
  }:${minutes === 0 ? "00" : minutes < 10 ? "0" + minutes : minutes}:${
    seconds === 0 ? "00" : seconds < 10 ? "0" + seconds : seconds
  }`;

  return formtatedTimeString;
};
