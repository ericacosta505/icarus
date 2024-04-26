import { useState } from "react";

const AddEntryForm = ({ isDarkMode, onEntryAdded }) => {
  const [mealName, setMealName] = useState("");
  const [proteinAmount, setProteinAmount] = useState("");

  const handleAddEntry = async () => {
    if (!mealName || !proteinAmount) {
      alert("Please fill in all fields.");
      return;
    } else if (proteinAmount < 0) {
      alert("Protein Amount must be greater than 0");
      return;
    }

    let userEmail = "acosta.eric505@icloud.com";

    try {
      const response = await fetch(
        `http://localhost:4000/user/addEntry/${userEmail}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mealName,
            proteinAmount: Number(proteinAmount),
          }),
        }
      );

      if (response.ok) {
        // Handle the successful entry addition here
        console.log("Entry added successfully");
        setMealName("");
        setProteinAmount("");
        onEntryAdded();
      } else {
        // Handle errors here
        console.error("Failed to add entry");
      }
    } catch (error) {
      // Handle network errors here
      console.error("There was an error adding the entry", error);
    }
  };

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
