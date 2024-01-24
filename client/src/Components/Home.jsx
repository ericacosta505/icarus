import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies(["token"]);
  const [username, setUsername] = useState("");

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

  const logout = () => {
    removeCookie("token");
    navigate("/login");
  };

  return (
    <>
      <div className="home_page">
        <h4>
          Welcome <span>{username}</span>
        </h4>
        <button onClick={logout}>LOGOUT</button>
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;
