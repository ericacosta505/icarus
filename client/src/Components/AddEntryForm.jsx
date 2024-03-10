const AddEntryForm = ({ isDarkMode }) => {
  return (
    <div
      className={`${isDarkMode ? "darkContainerLong" : "addEntryContainer"}`}
    >
      <div className="containerTitle">Add Entry</div>
      <div className="entryRow">
        <input placeholder="Meal Name"></input>
        <input placeholder="Protein Amount"></input>
        <button>Add</button>
      </div>
    </div>
  );
};

export default AddEntryForm;
