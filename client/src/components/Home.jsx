import React, { useContext } from "react";
import { Link } from "react-router-dom"
import '../styles/styles.css';
import { UidContext } from "../components/AppContext.js";
import axios from "axios";

function Home() {
  const uid = useContext(UidContext);

  const handleClick = (e) => {
    e.preventDefault()
    try {
        axios.get(`${process.env.REACT_APP_API_URL}api/user/logout`);
        window.location.href = process.env.BACK_URL; 
    } catch (error) {
        console.log(error);
    }       
}

  return (
    <div className="wrapper bg-dark d-flex align-items-center justify-content-center">
      <div className="loginApp rounded">
        <img className="img-fluid" src="./img/logo_password.svg" alt="img illustration" />
        <h2 className="m-3 text-center">Password Manager</h2>
        <form className="needs-validation">
          <div className="d-grid gap-2">
            {uid ? <button className="" onClick={handleClick}><Link className="clear" to="/">Logout</Link></button> : <button className=""><Link className="clear" to="/Login">Login</Link></button>}
            <button className=""><Link className="clear" to="/signup">Signup</Link></button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Home;

