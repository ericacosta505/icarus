import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({ email: "", password: "" });
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prevState) => ({ ...prevState, [name]: value }));
  };

  const login = async (credentials) => {
    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
        credentials: "include",
      });

      const data = await response.json();

      if (data.success) {
        setTimeout(() => navigate("/home"), 1000);
      } else {
        alert("Login Failed");
      }
    } catch (error) {
      alert("Something went wrong");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(inputValue);
    setInputValue({ email: "", password: "" });
  };

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(savedMode);
  }, []);

  return (
    <div className={isDarkMode ? "darkModeFormContainer" : "form_container"}>
      <h2>Login Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={inputValue.email}
            placeholder="Enter your email"
            onChange={handleOnChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={inputValue.password}
            placeholder="Enter your password"
            onChange={handleOnChange}
          />
        </div>
        <button type="submit">Submit</button>
        <span>
          Don't have an account? <Link to="/signup">Signup</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
