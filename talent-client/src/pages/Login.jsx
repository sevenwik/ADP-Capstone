import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
const Login = ({ setUsers }) => {
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
      const user = await response.json();
      console.log(user);
      const users = await fetch("http://localhost:8081/api/users");
      users.json().then((data) => {
        setUsers(data);
        nav("/userDashboard");
      });
    }
  };

  return (
    <div className="login-div">
      <h1 style={{ textAlign: "center" }}>Login</h1>
      <div
        style={{
          border: "2px solid black",
          padding: "20px",
          // width: "80%",
          borderRadius: 6,
        }}
      >
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
