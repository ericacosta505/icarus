// Importing necessary modules and components from React, React Router, and other libraries
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
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
  const [entryDeleted, setEntryDeleted] = useState(false);

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
    setIsLoading(true);
    const fetchProteinGoal = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/user/getProteinGoal",
          { headers: { Authorization: `Bearer ${cookies.token}` }, withCredentials: true }
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
  }, []);
  

  // Ensuring fetchTodaysEntries can be easily called
  const fetchTodaysEntries = async () => {
    try {
      setisEntryLoading(true);
      const response = await axios.get(
        "http://localhost:4000/user/getTodaysEntries",
        { headers: { Authorization: `Bearer ${cookies.token}` }, withCredentials: true }
      );
      if (response.data.todaysEntries) {
        setTodaysEntries(response.data.todaysEntries);
        setisEntryLoading(false);
      }
    } catch (error) {
      console.error("Error fetching today's entries:", error);
      setisEntryLoading(false);
    }
  };
  

  const fetchSumTodaysEntries = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/user/sumTodaysEntries",
        { headers: { Authorization: `Bearer ${cookies.token}` }, withCredentials: true }
      );
      if (response.data.totalProteinToday !== undefined) {
        setProteinConsumed(response.data.totalProteinToday);
      } else {
        setProteinConsumed(0);  // Reset to 0 if undefined
      }
    } catch (error) {
      console.error("Error fetching sum of today's entries:", error);
      setProteinConsumed(0);
    }
  };
  
  // Use this function in useEffect to initially load entries
  useEffect(() => {
    fetchTodaysEntries();
  }, [entryDeleted]);

  useEffect(() => {
    fetchSumTodaysEntries();
  }, [entryDeleted]);

  // Function to handle entry deletion
  const handleEntryDelete = () => {
    setEntryDeleted(!entryDeleted); // Toggle the state to trigger re-render
    fetchSumTodaysEntries();
  };

  // Logout function to clear session and navigate to login
  const logout = () => {
    removeCookie("token");
    document.body.classList.remove("showSidebar"); // Hide sidebar on logout
    navigate("/login");
  };

  // Update protein goal function
  const updateProteinGoal = (newGoal) => {
    setProteinGoal(newGoal);
  };

  // Registering components for Chart.js
  Chart.register(ArcElement, Tooltip, Legend);

  // State and handlers for UI features
  const toggleDropdown = () => {
    const shouldShowDropdown = !showDropdown;
    setShowDropdown(shouldShowDropdown);

    // Toggling the 'showSidebar' class on the body
    if (shouldShowDropdown) {
      document.body.classList.add("showSidebar");
    } else {
      document.body.classList.remove("showSidebar");
    }
  };

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  // Apply dark mode to the body element
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("darkBody");
    } else {
      document.body.classList.remove("darkBody");
    }
  }, [isDarkMode]);

  // Clean up sidebar class when component unmounts
  useEffect(() => {
    return () => {
      document.body.classList.remove("showSidebar");
    };
  }, []);

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
          entryDeleted={entryDeleted}
        />
        <DateDisplay isDarkMode={isDarkMode} />
      </div>

      <div className="entryContainer">
        <AddEntryForm
          isDarkMode={isDarkMode}
          onEntryAdded={() => {
            fetchTodaysEntries();
            fetchSumTodaysEntries();
          }}
        />
        <EntryList
          isDarkMode={isDarkMode}
          todaysEntries={todaysEntries}
          isEntryLoading={isEntryLoading}
          onEntryDelete={fetchTodaysEntries}
          handleEntryDelete={handleEntryDelete}
        />
      </div>
    </>
  );
};

export default Home;
