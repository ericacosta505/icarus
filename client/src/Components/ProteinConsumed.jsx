import { Pie } from "react-chartjs-2";

const ProteinConsumed = ({ isDarkMode, pieChartData }) => {
  return (
    <div
      className={`${isDarkMode ? "darkContainer" : "proteinConsumedContainer"}`}
    >
      <Pie data={pieChartData} />
    </div>
  );
};

export default ProteinConsumed;
