import { useState } from "react";

const AddEntryForm = ({ isDarkMode }) => {
  const [mealName, setMealName] = useState("");
  const [proteinAmount, setProteinAmount] = useState("");

  const handleAddEntry = () => {};

  return (
    <div
      className={`${isDarkMode ? "darkContainerLong" : "addEntryContainer"}`}
    >
      <div className="containerTitle">Add Entry</div>
      <div className="entryRow">
        <input
          placeholder="Meal Name"
          onChange={(e) => {
            setMealName(e.target.value);
          }}
          value={mealName}
        ></input>
        <input
          placeholder="Protein Amount"
          onChange={(e) => {
            setProteinAmount(e.target.value);
          }}
          value={proteinAmount}
        ></input>
        <button onClick={handleAddEntry}>Add</button>
      </div>
    </div>
  );
};

export default AddEntryForm;
