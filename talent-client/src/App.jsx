import { useState } from "react";
import "./App.css";
import { Login } from "./pages/Login";
import logo from "./assets/hire-vibes-logo.jpg"

function App() {
  return (
    <>
      <header style={{ marginBottom: '70px' }}>
        <div style={{ alignItems: 'left', border: '2px solid black', padding: '20px' }}>
          <img src={logo} alt="hire-vibes-logo" style={{ width: '200px', height: '150px'}} />
        </div>
      </header>
      <Login />
      <footer style={{ marginTop: '50px' }}>
        &copy; HireVibes 2024
      </footer>
    </>
  );
}

export default App;
