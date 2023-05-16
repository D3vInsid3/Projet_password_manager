import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import '../styles/styles.css';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [controlePassword, setControlePassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault()

    const terms = document.getElementById("terms")
    const emailError = document.querySelector(".emailError")
    const passwordError = document.querySelector(".passwordError")
    const passwordConfirmError = document.querySelector(".passwordConfirmError")
    const termsError = document.querySelector(".termsError")

    passwordConfirmError.innerHTML = ""
    termsError.innerHTML = ""

    if (password !== controlePassword || !terms.checked) {
      if (password !== controlePassword) {
        passwordConfirmError.innerHTML = "Passwords do not match"
      }
      if (!terms.checked) {
        termsError.innerHTML = "Please accept the terms and conditions"
      }} else {        
        await axios({
          method: "post",
          url: `${process.env.REACT_APP_API_URL}api/user/register`,
          withCredentials: true,
          data: {
            email,
            password
          }
        }).then((res) => {
          if (res.data.errors) {
            emailError.innerHTML = res.data.errors.email
            passwordError.innerHTML = res.data.errors.password
          } else {           
            window.location = "/login";
          }
        }).catch((err) => { console.log(err) })
      }
    }



    return (
      <div className="wrapper bg-dark d-flex align-items-center justify-content-center">
        <div className="loginWrapper rounded">
          <h2 className="mb-3">Sigup Form</h2>
          <form className="needs-validation" id="sign-up-form" onSubmit={handleSubmit}>
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
            <div className="form-group was-validated mb-2">
              <label htmlFor="password" className="form-label"> Confirm Password :</label>
              <input type="password" className="form-control" id="conctrolPassword" onChange={(e) => setControlePassword(e.target.value)} value={controlePassword} required></input>
              <div className="passwordConfirmError text-danger"></div>
            </div>

            <div className="form-group mb-2">
              <input type="checkbox" id="terms" />
              <label htmlFor="terms" className="ms-2">Accept terms and conditions</label>
              <div className="termsError text-danger"></div>
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
