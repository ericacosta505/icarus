import React, { useState, useEffect } from "react";
import Loader from "./Loader";

const ProteinGoal = ({ isDarkMode, proteinGoalValue, isLoading, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [proteinGoal, setProteinGoal] = useState(proteinGoalValue);

  useEffect(() => {
    setProteinGoal(proteinGoalValue);
  }, [proteinGoalValue]); // Update state when prop changes

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleProteinGoalChange = (e) => {
    setProteinGoal(e.target.value);
  };

  const handleUpdateClick = () => {
    const userEmail = "acosta.eric505@icloud.com"; // Replace with actual email retrieval logic

    fetch(`http://localhost:4000/user/updateProteinGoal/${userEmail}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ proteinGoal }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        setIsEditing(false);
        // Make sure data.proteinGoal is the updated value you expect
        console.log(data.user.proteinGoal);
        console.log(typeof data.user.proteinGoal);
        onUpdate(data.user.proteinGoal);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setIsEditing(false);
  };

  return (
    <div className={`${isDarkMode ? "darkContainer" : "proteinGoalContainer"}`}>
      <div className="proteinGoalContainerHeader">
        <div className="containerTitle">Protein Goal</div>
        {!isEditing && !isLoading && (
          <button className="pencilButton" onClick={handleEditClick}><i class="fa-solid fa-pencil"></i></button>
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
            <button onClick={handleUpdateClick}>update</button>
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
