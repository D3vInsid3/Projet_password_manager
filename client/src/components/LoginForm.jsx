import React, { useState } from "react";
import { Link, useActionData } from "react-router-dom";
import axios from 'axios';
import '../styles/styles.css';

function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e) => {
    e.preventDefault()

    const emailError = document.querySelector(".emailError")
    const passwordError = document.querySelector(".passwordError")
    
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/login`,
      withCredentials: true,
      data: {
        email,
        password
      },
    }).then((res) => {     
      if (res.data.errors) {
        emailError.innerHTML = res.data.errors.email
        passwordError.innerHTML = res.data.errors.password
      } else {               
        window.location = "/main";
      }      
    }).catch((err) => {
      console.log(err);
    })
  }

  return (
    <div className="wrapper bg-dark d-flex align-items-center justify-content-center">
      <div className="loginWrapper rounded">
        <h2 className="mb-3">Login Form</h2>
        <form className="needs-validation" id="sign-in-form" onSubmit={handleLogin}>
          <div className="form-group was-validated mb-2">
            <label htmlFor="email" className="form-label">Email address :</label>
            <input type="email" className="form-control" id="email" onChange={(e) => setEmail(e.target.value)} value={email} required></input>
            <div className="emailError text-danger">
              
            </div>
          </div>
          <div className="form-group was-validated mb-2">
            <label htmlFor="password" className="form-label"> Password :</label>
            <input type="password" className="form-control" id="password" onChange={(e) => setPassword(e.target.value)} value={password} required></input>
            <div className="passwordError text-danger">
              
            </div>
          </div>          
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-success mt-2">Log in</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
