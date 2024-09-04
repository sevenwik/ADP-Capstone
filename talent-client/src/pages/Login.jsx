import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { toast } from "react-toastify";

const Login = ({ setUsers, setCurrentUser, setJobs }) => {
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
      toast.success("Log in success!");
      const user = await response.json();
      setCurrentUser(user);
      if (user.type) {
        const jobs = await fetch("http://localhost:8081/api/jobs");
        jobs.json().then((data) => {
          setJobs(data);
          nav("/managerDashboard");
        });
      } else {
        const users = await fetch("http://localhost:8081/api/users");
        users.json().then((data) => {
          setUsers(data);
          nav("/userDashboard");
        });
      }
    } else {
      toast.error("Sign-in failed!");
    }
  };

  return (
    <div className="login-div">
      <h1 style={{ textAlign: "center" }}>Login</h1>
      <div
        style={{
          border: "2px solid black",
          padding: "20px",
          borderRadius: 6,
          boxShadow: "0px 14px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <form onSubmit={handleSubmit} className="was-validated">
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
              required
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
              required
            />
          </div>
          <div className="form-check form-switch"></div>
          <button
            type="submit"
            disabled={formState.password === "" || formState.username === ""}
            className="btn btn-primary"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};
export default Login;
