import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { toast } from "react-toastify";
const Register = ({ setUsers }) => {
  const [formState, setFormState] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });
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
    if (formState.password === formState.confirmPassword) {
      const userData = {
        username: formState.email,
        password: formState.password,
        type: "candidate",
      };
      const userResponse = await fetch("http://localhost:8081/api/users", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(userData),
      });
      if (userResponse.ok) {
        const user = await userResponse.json();
        //console.log(user);
        const candidateData = {
          email: formState.email,
          address: formState.address,
          phone: formState.phone,
          fullName: formState.full_name,
          userId: user.id,
        };
        const candidateResponse = await fetch(
          "http://localhost:8081/api/candidates",
          {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify(candidateData),
          }
        );
        if (candidateResponse.ok) {
          const data = await candidateResponse.json();
          //console.log(data);
          nav("/login");
        }
      }
    } else {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="login-div">
      <div
        style={{
          border: "2px solid black",
          padding: "20px",
          borderRadius: 6,
          boxShadow: "0px 14px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              name="full_name"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="Email"
              className="form-control"
              id="exampleInputPassword1"
              name="email"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              type="tel"
              className="form-control"
              id="exampleInputPassword1"
              name="phone"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Address</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              name="address"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="confirmPassword"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-check form-switch"></div>
          <button
            type="submit"
            disabled={
              formState.password === "" ||
              formState.email === "" ||
              formState.full_name === "" ||
              formState.confirmPassword === ""
            }
            className="btn btn-primary"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};
export default Register;
