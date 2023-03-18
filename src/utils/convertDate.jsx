export const convertDate = (date, returnData) => {
  const dummyDate = new Date(String(date.split("T")[0]));
  var dt = new Date(date);
  var h = dt.getHours(),
    m = dt.getMinutes();
  var _time = h > 12 ? h - 12 + ":" + m + " PM" : h + ":" + m + "0" + " AM";
  const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
    dummyDate
  );
  const day = dummyDate.getDate();

  if (returnData === "day") {
    return String(day);
  }
  if (returnData === "month") {
    return String(month.slice(0, 3));
  }
  if (returnData === "fulldate") {
    return `${String(day)} ${String(month)}, ${dummyDate.getFullYear()}`;
    // return `${String(day)} ${String(month.slice(0,3))}, ${_time}`
  }
  if (returnData === "time") {
    return `${_time}`;
  }
  if (returnData === "ddmmyy") {
    var newMonth = dummyDate.getMonth();
    var newDay = day;
    var newYear = dummyDate.getFullYear();

    if (String(newMonth).length === 1) {
      newMonth = `0${newMonth}`;
    }
    if (String(newDay).length === 1) {
      newDay = `0${newDay}`;
    }
    return `${newYear}-${newMonth}-${newDay}`;
  }
};
