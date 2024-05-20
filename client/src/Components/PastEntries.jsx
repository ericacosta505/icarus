import React from "react";

const PastEntries = ({ isDarkMode, pastEntries }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date
      .getDate()
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
  };

  // Sort entries in descending order by date
  const sortedEntries = pastEntries.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className={isDarkMode ? "darkContainerFull" : "containerFull"}>
      <div className="containerTitle">Past Entries</div>
      <div className="entriesList">
        {sortedEntries.map((entry, index) => (
          <div key={index} className="entryItem">
            {formatDate(entry.createdAt)} - {entry.mealName} -{" "}
            {entry.proteinAmount}g
          </div>
        ))}
      </div>
    </div>
  );
};

export default PastEntries;
