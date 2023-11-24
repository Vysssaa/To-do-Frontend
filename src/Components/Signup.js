import React, { useState } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  let handleSubmit = (event) => {
    let obj = { name, email, password };
    const url = "https://to-do-list-users.onrender.com/user/create-user";
    axios
      .post(url, obj)
      .then((res) => {
        if (res.status === 200) {
          alert("Registraion successful!");
          navigate("/sign-in");
        } else {
          alert("error");
          Promise.reject();
        }
      })
      .catch((err) => {
        alert(err);
      });
    event.preventDefault();
  };

  return (
    <div className="bg-info justify-content-center align-items-center">
      <br />
      <h2>Welcome to Task Manager!</h2>
      <div className="d-flex justify-content-center align-items-center bg-info vh-100">
        <div className="bg-warning p-3 rounded w-25">
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label for="name">
                <strong>Name</strong>
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter Name"
                autoComplete="on"
                className="form-control rounded-0"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <div className="mb-3">
                <label for="email">
                  <strong>Email</strong>
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter Email"
                  autoComplete="on"
                  className="form-control rounded-0"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label for="pwd">
                  <strong>Password</strong>
                </label>
                <input
                  type="password"
                  id="pwd"
                  placeholder="Enter Password"
                  className="form-control rounded-0"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-success w-100 rounded-0">
              Register
            </button>
            <br />
            <br />
            <h6>Already Have an Account</h6>
            <Link
              to="/sign-in"
              className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
            >
              Login
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;