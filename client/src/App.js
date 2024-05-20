import { Route, Routes, Navigate } from "react-router-dom";
import { Login, SignUp, Home } from "./Components";
import { useEffect, useState } from "react";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    const className = isDarkMode ? "dark-mode" : "light-mode";
    document.body.className = className;
    localStorage.setItem("darkMode", isDarkMode);

    return () => {
      document.body.classList.remove("dark-mode", "light-mode");
    };
  }, [isDarkMode]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
