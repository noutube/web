const formatTime = (time: number): string => {
  const seconds = `00${time % 60}`.slice(-2);
  const minutes = `00${Math.floor(time / 60) % 60}`.slice(-2);
  if (time >= 60 * 60) {
    return `${Math.floor(time / 60 / 60)}:${minutes}:${seconds}`;
  } else {
    return `${minutes}:${seconds}`;
  }
};

export default formatTime;
