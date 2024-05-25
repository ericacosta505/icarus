import React, { useState, useEffect, useMemo } from "react";
import Calendar from "react-calendar";

const PastEntries = ({ isDarkMode, pastEntries }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [proteinSum, setProteinSum] = useState(0);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
  };

  const sortedEntries = useMemo(
    () =>
      pastEntries.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    [pastEntries]
  );

  const filteredEntries = useMemo(
    () =>
      sortedEntries.filter(
        (entry) => formatDate(entry.createdAt) === formatDate(selectedDate)
      ),
    [sortedEntries, selectedDate]
  );

  useEffect(() => {
    const totalProtein = filteredEntries.reduce(
      (sum, entry) => sum + Number(entry.proteinAmount),
      0
    );
    setProteinSum(totalProtein);
  }, [filteredEntries]);

  return (
    <div className={isDarkMode ? "darkContainerFull" : "containerFull"}>
      <div className="containerTitle">Past Entries</div>
      <div className="calendarAndEntries">
        <Calendar onChange={setSelectedDate} value={selectedDate} />
        <div className="entriesList">
          {filteredEntries.length > 0 ? (
            filteredEntries.map((entry, index) => (
              <div key={index} className="entryItem">
                 - {entry.mealName}: 
                {entry.proteinAmount}g
              </div>
            ))
          ) : (
            <div>No entries on this date.</div>
          )}
        </div>
        <div className="pastEntrySum">{proteinSum}g</div>
      </div>
    </div>
  );
};

export default PastEntries;
