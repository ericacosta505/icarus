const EntryList = ({ isDarkMode }) => {
  return (
    <div className={`${isDarkMode ? "darkContainer" : "entryListContainer"}`}>
      Today's Entries
    </div>
  );
};

export default EntryList;
