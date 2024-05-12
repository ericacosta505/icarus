import React from "react";
import Loader from "./Loader";
import axios from "axios";
import { useCookies } from 'react-cookie'; // Import useCookies

const EntryList = ({
  isDarkMode,
  todaysEntries,
  isEntryLoading,
  onEntryDelete,
  handleEntryDelete,
}) => {

  const [cookies] = useCookies(['token']); // Access the cookies

  const handleDeleteEntry = async (entryId) => {
    // let userEmail = "acosta.eric505@icloud.com";
    try {
      const response = await axios.delete(
        `http://localhost:4000/user/deleteEntry/${entryId}`, {
          headers: {
            'Authorization': `Bearer ${cookies.token}` // Use the token from cookies
          },
          withCredentials: true
        }
      );
      // Assuming you have a method to refresh the entries after deletion, you can call it here
      onEntryDelete();
      handleEntryDelete();
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
