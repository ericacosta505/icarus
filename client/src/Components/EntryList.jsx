import Loader from "./Loader";

const EntryList = ({ isDarkMode, todaysEntries, isEntryLoading }) => {
  return (
    <div className={`${isDarkMode ? "darkContainer" : "entryListContainer"}`}>
      Today's Entries
      {isEntryLoading ? (
        <Loader />
      ) : todaysEntries.length === 0 ? (
        <div>No Entries Found</div>
      ) : (
        <ul>
          {todaysEntries.map((entry) => (
            <li key={entry._id} className="todayEntryItems">
              {entry.mealName} - Protein: {entry.proteinAmount}g
              <p className="deleteEntry">X</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EntryList;
