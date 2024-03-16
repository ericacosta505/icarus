import React, { useState, useEffect } from "react";

const ProteinGoal = ({ isDarkMode, proteinGoalValue }) => {
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
        {!isEditing && <button onClick={handleEditClick}>edit</button>}
      </div>
      <div className="proteinGoalAmount">
        {isEditing ? (
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
