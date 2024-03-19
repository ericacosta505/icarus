const DateDisplay = ({ isDarkMode }) => {
  // Create a new Date object from the current timestamp
  const currentDate = new Date(Date.now());

  // Format the date to display only the month and day
  const formattedMonth = currentDate.toLocaleDateString(undefined, {
    month: "long",
  });
  const formattedDay = currentDate.toLocaleDateString(undefined, {
    day: "numeric",
  });

  return (
    <div
      className={`${isDarkMode ? "darkContainer displayDate" : "dateDisplayContainer displayDate"}`}
    >
      <div>{formattedMonth}</div>
      <div>{formattedDay}</div>
    </div>
  );
};

export default DateDisplay;
