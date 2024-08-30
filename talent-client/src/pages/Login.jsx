import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = (props) => {
  const [formState, setFormState] = useState({ username: "", password: "" });
  const nav = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8081/api/login", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(formState),
    });
    if (response.ok) {
      nav("/userdashboard");
    }
  };

  return (
    <>
      <h1>Login</h1>
      <div style={{ border: "2px solid black", padding: "20px" }}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Username
            </label>
            <input
              type="username"
              className="form-control"
              id="exampleInputEmail1"
              name="username"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
            />
            <label
              className="form-check-label"
              htmlFor="flexSwitchCheckDefault"
            >
              Show password
            </label>
          </div>
          <button
            type="submit"
            disabled={formState.password === "" || formState.username === ""}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};
export default Login;
