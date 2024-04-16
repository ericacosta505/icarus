// Importing necessary modules and components from React, React Router, and other libraries
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

// Importing custom components
import Header from "./Header";
import ProteinGoal from "./ProteinGoal";
import ProteinConsumed from "./ProteinConsumed";
import AddEntryForm from "./AddEntryForm";
import DateDisplay from "./DateDisplay";
import EntryList from "./EntryList";

// Main Home component
const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies(["token"]);
  const [username, setUsername] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [proteinGoal, setProteinGoal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [todaysEntries, setTodaysEntries] = useState([]);
  const [isEntryLoading, setisEntryLoading] = useState(true);
  const [proteinConsumed, setProteinConsumed] = useState(0);

  // Verify cookie existence and validate user session
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
          { withCredentials: true }
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

  // Fetch the user's protein goal
  useEffect(() => {
    const userEmail = "acosta.eric505@icloud.com";
    if (userEmail) {
      setIsLoading(true);
      const fetchProteinGoal = async () => {
        try {
          const response = await axios.get(
            `http://localhost:4000/user/getProteinGoal/${userEmail}`
          );
          if (response.data.proteinGoal) {
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
  }, []);

  // Ensuring fetchTodaysEntries can be easily called
  const fetchTodaysEntries = async () => {
    const userEmail = "acosta.eric505@icloud.com";
    try {
      setisEntryLoading(true);
      const response = await axios.get(
        `http://localhost:4000/user/getTodaysEntries/${userEmail}`
      );
      if (response.data.todaysEntries) {
        setTodaysEntries(response.data.todaysEntries);
        setisEntryLoading(false);
      }
    } catch (error) {
      console.error("Error fetching todays entries:", error);
      setisEntryLoading(false);
    }
  };

  const fetchSumTodaysEntries = async () => {
    const userEmail = "acosta.eric505@icloud.com";
    try {
      const response = await axios.get(
        `http://localhost:4000/user/sumTodaysEntries/${userEmail}`
      );
      if (response.data.totalProteinToday) {
        setProteinConsumed(response.data.totalProteinToday);
      }
    } catch (error) {
      console.error("Error fetching sum of todays entries:", error);
    }
  };

  // Use this function in useEffect to initially load entries
  useEffect(() => {
    fetchTodaysEntries();
  }, []);

  useEffect(() => {
    fetchSumTodaysEntries();
  }, []);

  // Logout function to clear session and navigate to login
  const logout = () => {
    removeCookie("token");
    navigate("/login");
  };

  // Update protein goal function
  const updateProteinGoal = (newGoal) => {
    setProteinGoal(newGoal);
  };

  // Registering components for Chart.js
  Chart.register(ArcElement, Tooltip, Legend);

  // State and handlers for UI features
  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  // Apply dark mode to the body element
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("darkBody");
    } else {
      document.body.classList.remove("darkBody");
    }
  }, [isDarkMode]);

  // Component rendering
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
          proteinGoalValue={proteinGoal}
          proteinConsumed={proteinConsumed}
        />
        <DateDisplay isDarkMode={isDarkMode} />
      </div>

      <div className="entryContainer">
        <AddEntryForm
          isDarkMode={isDarkMode}
          onEntryAdded={fetchTodaysEntries}
        />
        <EntryList
          isDarkMode={isDarkMode}
          todaysEntries={todaysEntries}
          isEntryLoading={isEntryLoading}
        />
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;
