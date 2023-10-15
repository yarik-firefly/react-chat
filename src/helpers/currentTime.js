export default (number) => {
  const mins = Math.floor(number / 60);
  const sec = (number % 60).toFixed();
  return `${mins < 10 ? "0" : ""}${mins}:${sec < 10 ? "0" : ""}${sec}`;
};
