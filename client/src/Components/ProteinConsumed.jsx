import React from "react";
import { Pie } from "react-chartjs-2";

const ProteinConsumed = ({ isDarkMode, proteinGoalValue, proteinConsumed }) => {
  // Convert string props to numbers to ensure correct arithmetic operations
  const goalValue = Number(proteinGoalValue);
  const consumedValue = Number(proteinConsumed);

  console.log(goalValue);
  console.log(consumedValue);

  // Calculate remaining goal
  const remainingGoal =
    goalValue - consumedValue > 0 ? goalValue - consumedValue : 0;

  console.log(remainingGoal);

  // Setup pie chart data dynamically
  const pieChartData = {
    labels: ["Protein Consumed", "Remaining Goal"],
    datasets: [
      {
        label: "Protein Consumption",
        data: [consumedValue, remainingGoal], // Use converted numbers here
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div
      className={`${isDarkMode ? "darkContainer" : "proteinConsumedContainer"}`}
    >
      {goalValue === 0 ? <div>No goal set</div> : <Pie data={pieChartData} />}
    </div>
  );
};

export default ProteinConsumed;
