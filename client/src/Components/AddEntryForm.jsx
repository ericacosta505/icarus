import { useState } from "react";
import { useCookies } from "react-cookie";

const AddEntryForm = ({ isDarkMode, onEntryAdded }) => {
  const [cookies] = useCookies(["token"]);
  const [mealName, setMealName] = useState("");
  const [proteinAmount, setProteinAmount] = useState("");

  const handleProteinChange = (event) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      setProteinAmount(value);
    }
  };

  const handleAddEntry = async () => {
    if (!mealName || !proteinAmount) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/user/addEntry`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.token}`,
        },
        body: JSON.stringify({
          mealName,
          proteinAmount: Number(proteinAmount),
        }),
        credentials: "include",
      });

      if (response.ok) {
        setMealName("");
        setProteinAmount("");
        onEntryAdded();
      } else {
        console.error("Failed to add entry");
      }
    } catch (error) {
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
          onChange={(e) => setMealName(e.target.value)}
          value={mealName}
        />
        <input
          placeholder="Protein Amount"
          onChange={handleProteinChange}
          value={proteinAmount}
        />
        <button onClick={handleAddEntry}>
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>
    </div>
  );
};

export default AddEntryForm;
