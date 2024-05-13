import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import { useCookies } from "react-cookie";

const ProteinGoal = ({ isDarkMode, proteinGoalValue, isLoading, onUpdate }) => {
  const [cookies] = useCookies(["token"]);
  const [isEditing, setIsEditing] = useState(false);
  const [proteinGoal, setProteinGoal] = useState(proteinGoalValue);

  useEffect(() => {
    setProteinGoal(proteinGoalValue);
  }, [proteinGoalValue]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleProteinGoalChange = (event) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      setProteinGoal(value);
    }
  };

  const handleUpdateClick = () => {
    fetch(`http://localhost:4000/user/updateProteinGoal`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.token}`,
      },
      body: JSON.stringify({ proteinGoal }),
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setIsEditing(false);
        onUpdate(data.user.proteinGoal);
      })
      .catch((error) => {
        alert("There was an error with your goal change. Please try again.");
        console.error("Error:", error);
        setIsEditing(false);
        window.location.reload();
      });
  };

  return (
    <div className={`${isDarkMode ? "darkContainer" : "proteinGoalContainer"}`}>
      <div className="proteinGoalContainerHeader">
        <div className="containerTitle">Protein Goal</div>
        {!isEditing && !isLoading && (
          <button className="pencilButton" onClick={handleEditClick}>
            <i className="fa-solid fa-pencil"></i>
          </button>
        )}
      </div>
      <div className="proteinGoalAmount">
        {isLoading ? (
          <Loader />
        ) : isEditing ? (
          <>
            <input
              type="number"
              value={proteinGoal}
              onChange={handleProteinGoalChange}
              autoFocus
            />
            <button onClick={handleUpdateClick}>Update</button>
          </>
        ) : (
          <>
            {proteinGoal} <span>g</span>
          </>
        )}
      </div>
    </div>
  );
};

export default ProteinGoal;
