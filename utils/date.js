function padValue(value) {
  return String(value).padStart(2, '0');
}

module.exports = function getDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = padValue(date.getMonth() + 1);
  const day = padValue(date.getDate());
  const hours = padValue(date.getHours());
  const minutes = padValue(date.getMinutes());
  const seconds = padValue(date.getSeconds());

  return `${year}.${month}.${day}.${hours}.${minutes}.${seconds}`;
};
