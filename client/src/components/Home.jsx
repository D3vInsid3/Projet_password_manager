import React, { useContext } from "react";
import { Link } from "react-router-dom"
import '../styles/styles.css';
import { UidContext } from "../components/AppContext.js";
import axios from "axios";
import cookie from "js-cookie"

function Home() {
  const uid = useContext(UidContext);

  const handleClick = (e) => {
    e.preventDefault()

    //Logout solution with deleting cookie frontend and backend
    const removeCookie = (key) => {
      if (window !== "undefined") {
        cookie.remove(key, { expires: 0.1 })
      }
    }

    const logout = async () => {
      await axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL}api/user/logout`,
        withCredentials: true
      }).then(() => {
        removeCookie("jwt")
        window.location = "/"
      }).catch((err) => {
        console.log(err);
      })
    }

    logout()


  }

  return (
    <div className="wrapper bg-dark d-flex align-items-center justify-content-center">
      <div className="loginApp rounded">
        <img className="img-fluid" src="./img/logo_password.svg" alt="img illustration" />
        <h2 className="m-3 text-center">Password Manager</h2>
        <form className="needs-validation">
          <div className="d-grid gap-2">
            {uid ? <button className="" onClick={handleClick}>Logout</button> : <button className=""><Link className="clear" to="/Login">Login</Link></button>}
            <button className=""><Link className="clear" to="/signup">Signup</Link></button>
          </div>
          <div className="mt-3">
            <ul>
              <p>Todo list</p>
              <li>ajouter l'id du user pour chacun de ces comptes</li>
              <li>ajouter un panel admin</li>
              <li>ajouter un outil pour fabriquer de mdp</li>
              <li>faire l'ui</li>
            </ul>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Home;

