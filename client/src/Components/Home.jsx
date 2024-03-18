import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

import Header from "./Header";
import ProteinGoal from "./ProteinGoal";
import ProteinConsumed from "./ProteinConsumed";
import AddEntryForm from "./AddEntryForm";

const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies(["token"]);
  const [username, setUsername] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [proteinGoal, setProteinGoal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

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

  const userEmail = "acosta.eric505@icloud.com";
  useEffect(() => {
    if (userEmail) {
      setIsLoading(true);
      const fetchProteinGoal = async () => {
        try {
          const response = await axios.get(
            `http://localhost:4000/user/getProteinGoal/${userEmail}`,
          );
          if (response.data.proteinGoal) {
            console.log(response.data);
            setProteinGoal(response.data.proteinGoal);
          }
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching protein goal:", error);
          setIsLoading(false);
        }
      };

      fetchProteinGoal();
    }
  }, [userEmail]);

  const logout = () => {
    removeCookie("token");
    navigate("/login");
  };

  const updateProteinGoal = (newGoal) => {
    console.log("Updating protein goal to:", newGoal); // Add logging to debug
    setProteinGoal(newGoal);
  };

  Chart.register(ArcElement, Tooltip, Legend);

  const proteinConsumed = "30";

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
      <Header
        toggleDropdown={toggleDropdown}
        showDropdown={showDropdown}
        toggleDarkMode={toggleDarkMode}
        isDarkMode={isDarkMode}
        logout={logout}
        username={username}
      />

      <div className="goalContainer">
        <ProteinGoal
          isDarkMode={isDarkMode}
          proteinGoalValue={proteinGoal}
          isLoading={isLoading}
          onUpdate={updateProteinGoal}
        />
        <ProteinConsumed
          isDarkMode={isDarkMode}
          // pieChartData={pieChartData}
          proteinGoalValue={proteinGoal}
          proteinConsumed={proteinConsumed}
        />
      </div>

      <div className="entryContainer">
        <AddEntryForm isDarkMode={isDarkMode} />
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;
