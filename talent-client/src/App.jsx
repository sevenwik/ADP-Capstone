import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import ManagerJobs from "./pages/ManagerJobs";
import Register from "./pages/Register";
import CandidateJobs from "./pages/CandidateJobs";
import logo from "./assets/hire-vibes-logo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
function App() {
  const nav = useNavigate();
  const [users, setUsers] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [jobs, setJobs] = useState();
  const [pageState, setPageState] = useState("Login");

  const handleRegister = (e) => {
    e.preventDefault();
    if (pageState === "Login") {
      setPageState("Register");
      nav("/signUp");
    } else {
      setPageState("Login");
      nav("/login");
    }
  };
  return (
    <div>
      <div className="header">
        <div className="header-title">
          <img
            src={logo}
            alt="hire-vibes-logo"
            style={{ width: "200px", height: "80px" }}
          />
        </div>
        <button className="btn btn-primary" onClick={handleRegister}>
          {pageState === "Login" ? "Sign Up" : "Sign In"}
        </button>
      </div>
      <div
        className="App"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Routes>
          <Route
            path="/login"
            element={
              <Login
                setUsers={setUsers}
                setCurrentUser={setCurrentUser}
                setJobs={setJobs}
              />
            }
          />
          {currentUser ? (
            <>
              <Route
                path="/userDashboard"
                element={<CandidateJobs jobs={jobs} user={currentUser} />}
              />
              <Route
                path="/managerDashboard"
                element={
                  <ManagerJobs
                    jobs={jobs}
                    setJobs={setJobs}
                    user={currentUser}
                  />
                }
              />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" />} />
          )}
          <Route path="/signUp" element={<Register />} />
        </Routes>
      </div>

      <ToastContainer />
    </div>
  );
}

export default App;
