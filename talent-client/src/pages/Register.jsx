import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
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
    console.log(formState);
  };

  return (
    <div className="login-div">
      <h1 style={{ textAlign: "center" }}>Register</h1>
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
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              name="full_name"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Email
            </label>
            <input
              type="Email"
              className="form-control"
              id="exampleInputPassword1"
              name="email"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Phone
            </label>
            <input
              type="tel"
              className="form-control"
              id="exampleInputPassword1"
              name="phone"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              name="address"
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
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Confirm Password
            </label>
            <input
              type="text"
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
