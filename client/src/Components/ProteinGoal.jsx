const ProteinGoal = ({ isDarkMode }) => {
  return (
    <div className={`${isDarkMode ? "darkContainer" : "proteinGoalContainer"}`}>
      <div className="proteinGoalContainerHeader">
        <div className="containerTitle">Protein Goal</div>
        <button>edit</button>
      </div>
      <div className="proteinGoalAmount">
        999 <span>g</span>
      </div>
    </div>
  );
};

export default ProteinGoal;
