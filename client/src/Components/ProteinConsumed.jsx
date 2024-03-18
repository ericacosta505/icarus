import { Pie } from "react-chartjs-2";

const ProteinConsumed = ({ isDarkMode, pieChartData, proteinGoalValue }) => {
  return (
    <div
      className={`${isDarkMode ? "darkContainer" : "proteinConsumedContainer"}`}
    >
      {proteinGoalValue == 0 ? (
        <div>No goal set</div>
      ) : (
        <Pie data={pieChartData} />
      )}
    </div>
  );
};

export default ProteinConsumed;
