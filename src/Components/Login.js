import React, { useState } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = "https://to-do-list-users.onrender.com/user/login";
    const obj = { name, email, password };
    axios
      .post(url, obj)
      .then((res) => {
        alert(res.data);
        if (res.data === "Login successfull") {
          navigate("/main");
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
      <div className=" justify-content-center align-items-center "style={{ background: '#721CC8 ' }}>
      <br />
      <h2 align="center"> just DO it!</h2>
      <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: 'linear-gradient(180deg, #721CC8 2.64%, #D11AFF 100%)' }}>
        <div className=" p-3 rounded w-25"style={{ background: '#D9D9D9' }} >
        <h2 align="center">Login</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit" className="btn  w-100 rounded-2 "style={{background: '#0967F3'}}>
            Login
          </button>
        </form>
      </div>
    </div>
    </div>
  );
}

export default Login;
