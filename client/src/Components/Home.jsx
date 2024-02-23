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
        <div className="header">
          <p className="username">{username}</p>
        </div>

        <div className="goalContainer">
          <div className="proteinGoalContainer">
            <div className="containerTitle">Protein Goal</div>
            <button>edit</button>
            <div className="proteinGoalAmount">
              999 <span>g</span>
            </div>
          </div>

          <div className="proteinConsumedContainer">
            <div className="containerTitle">Protein Consumed</div>
          </div>
        </div>

        <div className="entryContainer">
          <div className="addEntryContainer">
            <div className="containerTitle">Add Entry</div>
          </div>
        </div>

        <button onClick={logout}>LOGOUT</button>
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;
