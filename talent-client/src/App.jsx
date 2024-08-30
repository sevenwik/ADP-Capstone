import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import logo from "./assets/hire-vibes-logo.jpg";
import { useState } from "react";

function App() {
  const [users, setUsers] = useState();
  return (
    <>
      <header style={{ marginBottom: "70px" }}>
        <div
          style={{
            alignItems: "left",
            border: "2px solid black",
            padding: "20px",
          }}
        >
          <img
            src={logo}
            alt="hire-vibes-logo"
            style={{ width: "200px", height: "150px" }}
          />
        </div>
      </header>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login setUsers={setUsers} />} />
          <Route
            path="/userdashboard"
            element={<UserDashboard users={users} />}
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
      <footer style={{ marginTop: "50px" }}>&copy; HireVibes 2024</footer>
    </>
  );
}

export default App;
