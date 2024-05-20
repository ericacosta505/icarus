import React, { useState } from "react";
import Calendar from "react-calendar";

const PastEntries = ({ isDarkMode, pastEntries }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date
      .getDate()
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
  };

  const sortedEntries = pastEntries.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const filteredEntries = sortedEntries.filter(
    (entry) => formatDate(entry.createdAt) === formatDate(selectedDate)
  );

  return (
    <div className={isDarkMode ? "darkContainerFull" : "containerFull"}>
      <div className="containerTitle">Past Entries</div>
      <div className="calendarAndEntries">
        <Calendar onChange={setSelectedDate} value={selectedDate} />
        <div className="entriesList">
          {filteredEntries.length > 0 ? (
            filteredEntries.map((entry, index) => (
              <div key={index} className="entryItem">
                {formatDate(entry.createdAt)} - {entry.mealName} -{" "}
                {entry.proteinAmount}g
              </div>
            ))
          ) : (
            <div>No entries on this date.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PastEntries;
