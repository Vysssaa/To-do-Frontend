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
<div className=" justify-content-center align-items-center "style={{ background: '#721CC8 ' }}>
      <br />
      <h2> just DO it!</h2>
      <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: 'linear-gradient(180deg, #721CC8 2.64%, #D11AFF 100%)' }}>
        <div className=" p-3 rounded w-25"style={{ background: '#D9D9D9' }} >
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
                className="form-control rounded-2"
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
                  className="form-control rounded-2"
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
                  className="form-control rounded-2"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <button type="submit" className="btn  w-100 rounded-2" style={{background: '#0967F3'}}>
              Register
            </button>
            <br />
            <br />
            <h6>Already Have an Account</h6>
            <Link
              to="/sign-in"
              className="btn btn-default border w-100 rounded-2 text-decoration-none"style={{background: '#0967F3'}}
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
