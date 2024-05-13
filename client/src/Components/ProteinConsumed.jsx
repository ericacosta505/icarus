import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";

const ProteinConsumed = ({ isDarkMode, proteinGoalValue, proteinConsumed }) => {
  const goalValue = Number(proteinGoalValue);
  const consumedValue = Number(proteinConsumed);

  const [chartData, setChartData] = useState({
    labels: ["Protein Consumed", "Remaining Goal"],
    datasets: [
      {
        label: "Protein Consumption",
        data: [
          consumedValue,
          goalValue - consumedValue > 0 ? goalValue - consumedValue : 0,
        ],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  });

  const chartOptions = {
    plugins: {
      legend: {
        labels: {
          color: isDarkMode ? "white" : "black",
        },
      },
      tooltip: {
        titleFontColor: isDarkMode ? "white" : "black",
        bodyFontColor: isDarkMode ? "white" : "black",
      },
    },
  };

  useEffect(() => {
    setChartData({
      labels: ["Protein Consumed", "Remaining Goal"],
      datasets: [
        {
          label: "Protein Consumption",
          data: [
            consumedValue,
            goalValue - consumedValue > 0 ? goalValue - consumedValue : 0,
          ],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
          ],
          borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
          borderWidth: 1,
        },
      ],
    });
  }, [proteinConsumed, proteinGoalValue]);

  return (
    <div
      className={`${isDarkMode ? "darkContainer" : "proteinConsumedContainer"}`}
    >
      {goalValue === 0 ? (
        <div>No goal set</div>
      ) : (
        <Pie data={chartData} options={chartOptions} />
      )}
    </div>
  );
};

export default ProteinConsumed;
