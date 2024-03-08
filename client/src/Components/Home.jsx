import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

import Header from "./Header";

const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies(["token"]);
  const [username, setUsername] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
        return;
      }

      try {
        const { data } = await axios.post(
          "http://localhost:4000",
          {},
          { withCredentials: true },
        );

        if (data.status) {
          setUsername(data.user);
          toast(`Hello ${data.user}`, { position: "top-right" });
        } else {
          removeCookie("token");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error verifying cookie", error);
        removeCookie("token");
        navigate("/login");
      }
    };

    verifyCookie();
  }, [cookies.token, navigate, removeCookie]);

  const logout = () => {
    removeCookie("token");
    navigate("/login");
  };

  Chart.register(ArcElement, Tooltip, Legend);

  const pieChartData = {
    labels: ["Protein Consumed", "Remaining Goal"],
    datasets: [
      {
        label: "Protein Consumption",
        data: [300, 700],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("darkBody");
    } else {
      document.body.classList.remove("darkBody");
    }
  }, [isDarkMode]);

  return (
    <>
      <div className={`home_page ${isDarkMode ? "dark-mode" : ""}`}>
        <Header
          toggleDropdown={toggleDropdown}
          showDropdown={showDropdown}
          toggleDarkMode={toggleDarkMode}
          isDarkMode={isDarkMode}
          logout={logout}
          username={username}
        />

        <div className="goalContainer">
          <div
            className={`${
              isDarkMode ? "darkContainer" : "proteinGoalContainer"
            }`}
          >
            <div className="proteinGoalContainerHeader">
              <div className="containerTitle">Protein Goal</div>
              <button>edit</button>
            </div>
            <div className="proteinGoalAmount">
              999 <span>g</span>
            </div>
          </div>

          <div
            className={`${
              isDarkMode ? "darkContainer" : "proteinConsumedContainer"
            }`}
          >
            <Pie data={pieChartData} />
          </div>
        </div>

        <div className="entryContainer">
          <div
            className={`${
              isDarkMode ? "darkContainerLong" : "addEntryContainer"
            }`}
          >
            <div className="containerTitle">Add Entry</div>
            <div className="entryRow">
              <input placeholder="Meal Name"></input>
              <input placeholder="Protein Amount"></input>
              <button>Add</button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;
