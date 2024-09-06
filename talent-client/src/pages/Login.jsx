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
      if (user.type === "manager") {
        const jobs = await fetch(
          `http://localhost:8081/api/jobs/manager/${user.id}`
        );
        jobs.json().then((data) => {
          setJobs(data);
          nav("/managerDashboard");
        });
      } else if (user.type === "candidate") {
        const users = await fetch(
          `http://localhost:8081/api/jobs/pagination?page=${0}&size=${6}`
        );
        users.json().then((data) => {
          setJobs(data);
          nav("/userDashboard");
        });
      }
    } else {
      toast.error("Sign-in failed!");
    }
  };

  return (
    <div className="login-div">
      <div
        style={{
          border: "1px solid #ccc",
          padding: "20px",
          borderRadius: 10,
          boxShadow: "0px 0px 12px 8px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#E4EBF7",
        }}
      >
        <h2 style={{ textAlign: "center", fontWeight: "bold" }}>Log In</h2>
        <form onSubmit={handleSubmit} className="was-validated">
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              name="username"
              placeholder="Enter your e-mail"
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
              placeholder="Enter your password"
              onChange={handleInputChange}
              required
            />
          </div>
          <button
            type="submit"
            disabled={formState.password === "" || formState.username === ""}
            className="btn btn-primary"
            style={{ width: "100%", marginTop: "20px" }}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};
export default Login;
