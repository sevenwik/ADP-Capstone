import { useState } from "react";
import "./App.css";
import { Login } from "./pages/Login";

function App() {
  return (
    <>
      <header style={{ marginBottom: '70px' }}>
        <div>
          <h1>HireVibes</h1>
          <img src="talent-client/src/assets/hire-vibes-logo.jpg" alt="hire-vibes-logo" />
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
