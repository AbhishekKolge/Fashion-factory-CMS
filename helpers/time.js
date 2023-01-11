const checkTimeIsExpired = (timeArg) => {
  const currentTime = Date.now();
  const time = new Date(timeArg).getTime() - 300000;
  return time < currentTime;
};

const calculateRemainingTime = (timeArg) => {
  const currentTime = Date.now();
  const time = new Date(timeArg).getTime() - 300000;
  const remainingTime = time - currentTime;
  return remainingTime;
};

const formatDate = (time) => {
  const date = new Date(time);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let dt = date.getDate();

  if (dt < 10) {
    dt = `0${dt}`;
  }
  if (month < 10) {
    month = `0${month}`;
  }

  return `${dt}/${month}/${year}`;
};

const formatDateTime = (time) => {
  const date = new Date(time);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let dt = date.getDate();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let amOrPm = "am";

  if (dt < 10) {
    dt = `0${dt}`;
  }
  if (month < 10) {
    month = `0${month}`;
  }

  if (hour > 12) {
    amOrPm = "pm";
  }

  hour = hour % 12 || 12;

  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${dt}/${month}/${year} ${hour}:${minutes} ${amOrPm}`;
};

const formatDateTimeInput = (time) => {
  const date = new Date(time);
  return (
    date.getFullYear().toString() +
    "-" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + date.getDate()).slice(-2) +
    "T" +
    date.toTimeString().slice(0, 5)
  );
};

export {
  checkTimeIsExpired,
  calculateRemainingTime,
  formatDate,
  formatDateTime,
  formatDateTimeInput,
};
