import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

import Header from "./Header";
import ProteinGoal from "./ProteinGoal";
import ProteinConsumed from "./ProteinConsumed";
import AddEntryForm from "./AddEntryForm";
import DateDisplay from "./DateDisplay";
import EntryList from "./EntryList";
import PastEntries from "./PastEntries";

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
  const [pastEntries, setPastEntries] = useState([]);

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch("http://localhost:4000", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const data = await response.json();

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

  useEffect(() => {
    setIsLoading(true);
    const fetchProteinGoal = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/user/getProteinGoal",
          {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
            credentials: "include",
          }
        );

        const data = await response.json();

        if (data.proteinGoal) {
          setProteinGoal(data.proteinGoal);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching protein goal:", error);
        setIsLoading(false);
      }
    };

    fetchProteinGoal();
  }, []);

  const fetchTodaysEntries = async () => {
    try {
      setisEntryLoading(true);
      const response = await fetch(
        "http://localhost:4000/user/getTodaysEntries",
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
          credentials: "include",
        }
      );

      const data = await response.json();

      if (data.todaysEntries) {
        setTodaysEntries(data.todaysEntries);
        setisEntryLoading(false);
      }
    } catch (error) {
      console.error("Error fetching today's entries:", error);
      setisEntryLoading(false);
    }
  };

  const fetchSumTodaysEntries = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/user/sumTodaysEntries",
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
          credentials: "include",
        }
      );

      const data = await response.json();

      if (data.totalProteinToday !== undefined) {
        setProteinConsumed(data.totalProteinToday);
      } else {
        setProteinConsumed(0);
      }
    } catch (error) {
      console.error("Error fetching sum of today's entries:", error);
      setProteinConsumed(0);
    }
  };

  const fetchPastEntries = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/user/getAllPastEntries",
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
          credentials: "include",
        }
      );

      const data = await response.json();
      if (data && data.pastEntries) {
        setPastEntries(data.pastEntries); // Set the past entries state
      }
    } catch (error) {
      console.error("There was an error loading past entries:", error);
    }
  };

  useEffect(() => {
    fetchPastEntries();
  }, []);

  useEffect(() => {
    fetchTodaysEntries();
  }, [entryDeleted]);

  useEffect(() => {
    fetchSumTodaysEntries();
  }, [entryDeleted]);

  const handleEntryDelete = () => {
    setEntryDeleted(!entryDeleted);
    fetchSumTodaysEntries();
  };

  const logout = () => {
    removeCookie("token");
    document.body.classList.remove("showSidebar");
    navigate("/login");
  };

  const updateProteinGoal = (newGoal) => {
    setProteinGoal(newGoal);
  };

  Chart.register(ArcElement, Tooltip, Legend);

  const toggleDropdown = () => {
    const shouldShowDropdown = !showDropdown;
    setShowDropdown(shouldShowDropdown);

    if (shouldShowDropdown) {
      document.body.classList.add("showSidebar");
    } else {
      document.body.classList.remove("showSidebar");
    }
  };

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
  };

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(savedMode);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("darkBody");
    } else {
      document.body.classList.remove("darkBody");
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  useEffect(() => {
    return () => {
      document.body.classList.remove("showSidebar");
    };
  }, []);

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
      <div className="pastEntryContainer">
        <PastEntries isDarkMode={isDarkMode} pastEntries={pastEntries} />
      </div>
    </>
  );
};

export default Home;
