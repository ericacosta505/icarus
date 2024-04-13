import Loader from "./Loader";

const EntryList = ({ isDarkMode, todaysEntries, isEntryLoading }) => {
  return (
    <div className={`${isDarkMode ? "darkContainer" : "entryListContainer"}`}>
      Today's Entries

      {isEntryLoading ?(<Loader /> ): (todaysEntries.length === 0 ? (
        <div>No Entries Found</div>
      ) : (
        <ul>
          {todaysEntries.map((entry) => (
            <li key={entry._id}>
              {entry.mealName} - Protein: {entry.proteinAmount}g
            </li>
          ))}
        </ul>
      ))}


      
    </div>
  );
};

export default EntryList;
