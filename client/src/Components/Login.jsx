import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({ email: "", password: "" });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prevState) => ({ ...prevState, [name]: value }));
  };

  const displayToast = (message, type = "error") => {
    toast[type](message, { position: "bottom-left" });
  };

  const login = async (credentials) => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/login",
        credentials,
        { withCredentials: true }
      );
      if (data.success) {
        displayToast(data.message, "success");
        setTimeout(() => navigate("/home"), 1000);
      } else {
        displayToast(data.message || "Login failed");
      }
    } catch (error) {
      displayToast(error.response?.data.message || error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(inputValue);
    setInputValue({ email: "", password: "" });
  };

  return (
    <div className="form_container">
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
      <ToastContainer />
    </div>
  );
};

export default Login;
