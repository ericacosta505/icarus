import React from "react";

const DateDisplay = ({ isDarkMode }) => {
  const currentDate = new Date(Date.now());
  const formattedMonth = currentDate.toLocaleDateString(undefined, {
    month: "long",
  });
  const formattedDay = currentDate.toLocaleDateString(undefined, {
    day: "numeric",
  });

  return (
    <div
      className={`${
        isDarkMode
          ? "darkContainer displayDate"
          : "dateDisplayContainer displayDate"
      }`}
    >
      <div>{formattedMonth}</div>
      <div>{formattedDay}</div>
    </div>
  );
};

export default DateDisplay;
