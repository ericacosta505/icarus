import React from "react";
import Loader from "./Loader";
import { useCookies } from "react-cookie";

const EntryList = ({
  isDarkMode,
  todaysEntries,
  isEntryLoading,
  onEntryDelete,
  handleEntryDelete,
}) => {
  const [cookies] = useCookies(["token"]);

  const handleDeleteEntry = async (entryId) => {
    try {
      const response = await fetch(
        `http://localhost:4000/user/deleteEntry/${entryId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.token}`,
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        console.log("Entry deleted successfully.");
        onEntryDelete();
        handleEntryDelete();
      } else {
        console.error("Failed to delete entry.");
      }
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

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
              <div className="entryContent">
                {entry.mealName} - Protein: {entry.proteinAmount}g
              </div>
              <p
                className="deleteEntry"
                onClick={() => handleDeleteEntry(entry._id)}
              >
                X
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EntryList;
