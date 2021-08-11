import React from "react";
import "../App.css";
// import "../Register.css";
import { NavLink } from "react-router-dom";
const Register = () => {
  return (
    <section className="signup">
      <div className="container mt-4 register_div w-25 p-4">
        <form class="register_form">
          <h4>Register</h4>

          <div className="form-group">
            <label>First name</label>
            <input
              type="text"
              className="form-control"
              placeholder="First name"
            />
          </div>

          <div className="form-group">
            <label>Last name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Last name"
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
            />
          </div>
          <div className="register_btn">
            <button
              type="submit"
              className="btn btn-dark btn-block btn-md mb-2"
            >
              Register
            </button>
          </div>
          <p className="forgot-password text-right">
            Already registered <NavLink to="/login">log in?</NavLink>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Register;
