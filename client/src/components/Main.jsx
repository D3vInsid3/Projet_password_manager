import React, { Component } from "react";
import { Link, redirect } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import '../styles/styles.css';
import axios from "axios";
import { UidContext } from "../components/AppContext.js";
import { set } from "mongoose";


const data = [
    {
        "id": 0,
        "name": "Caisse d'Epargne",
        "AdresseReferenceCompte": "david@hotmail.com",
        "AdresseConnexion": "https://facebook.com",
        "passeword": "12324",
        "Pseudo": "DavidD",
        "Nom": "David",
        "Prenom": "Dufour",
        "Birthday": "23-10-85",
        "Categorie": "Banque"
    },
    {
        "id": 1,
        "name": "Entreprise 2",
        "AdresseReferenceCompte": "d_dufour@hotmail.com",
        "AdresseConnexion": "https://instagram.com",
        "passeword": "12324",
        "Pseudo": "DavidD",
        "Nom": "David",
        "Prenom": "Dufour",
        "Birthday": "23-10-85",
        "Categorie": "Banque"
    },
    {
        "id": 2,
        "name": "Entreprise 3",
        "AdresseReferenceCompte": "d_dufour@hotmail.com",
        "AdresseConnexion": "https://twitter.com",
        "passeword": "4321",
        "Pseudo": "DavidD",
        "Nom": "David",
        "Prenom": "Dufour",
        "Birthday": "23-10-85",
        "Categorie": "Jeux"
    },
    {
        "id": 3,
        "name": "Entreprise 4",
        "AdresseReferenceCompte": "d_dufour@hotmail.com",
        "AdresseConnexion": "https://grafikart.com",
        "passeword": "12324",
        "Pseudo": "DavidD",
        "Nom": "David",
        "Prenom": "Dufour",
        "Birthday": "23-10-85",
        "Categorie": "Jeux"
    },
    {
        "id": 4,
        "name": "Entreprise 5",
        "AdresseReferenceCompte": "d_dufour@hotmail.com",
        "AdresseConnexion": "https://grafikart.com",
        "passeword": "toto123",
        "Pseudo": "DavidD",
        "Nom": "David",
        "Prenom": "Dufour",
        "Birthday": "23-10-85",
        "Categorie": "Magasin"
    }
]

/* Moongose DB */


/* GLOBAL */
function BoutonCompte(props) {
    const [comptes, setComptes] = useState([]);
    useEffect(() => {
        setComptes(data)
    }, []);

    const handleClick = (id) => {
        console.log('sup')
        const nouveauxComptes = comptes.filter((compte) => compte.id !== id);
        setComptes(nouveauxComptes);
        /* Reste ici à faire la gestion des nouvelles donneés, soit via JSON soir via DB */
    }

    return <button className="m-1" onClick={() => handleClick(props.id)}>{props.children}</button>
}

/* Section 1 */
function SelecteurFiltreCompte() {

    const uniqueCategorie = [...new Set(data.map((c) => c.Categorie))];

    return <form>
        <label htmlFor="disabledSelect" className="form-label">Filtre comptes</label>
        <select className="form-select">
            {uniqueCategorie.map(c => <option key={c}> {c} </option>)}
        </select>
    </form>
}

function BoutonCreationCompte() {
    return <form>
        <label htmlFor="addCompte" className="form-label mt-2">Ajouter un compte :</label><br />
        <button type="submit" className="btn btn-success mt-2">Nouveau</button>
    </form>
}

function FiltreOrdreAlph() {
    return <form>
        <label htmlFor="disabledSelect" className="form-label">Filtre comptes</label>
        <select className="form-select">
            <option>De A à Z</option>
            <option>De Z à A</option>
        </select>
    </form>
}

/* Section 2 */
function EnteteCompteListe() {
    const uid = useContext(UidContext);
    const [listeComptes, setListeComptes] = useState([]);
    const [infoCompte, setInfoCompte] = useState([]);

    useEffect(() => {
        const fetchComptes = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}api/user/${uid}`);
                setListeComptes(res.data.comptes);

                const infoComptePromises = listeComptes.map(async (c) => {
                    const infoCompte = await axios.get(`${process.env.REACT_APP_API_URL}api/compte/${c}`);
                    return infoCompte.data;
                });

                Promise.all(infoComptePromises).then((infos) => {
                    setInfoCompte(infos);
                });
            } catch (err) {
                console.log("No token");
            }
        };
        fetchComptes();
    }, [uid]);

    return (
        <div className="container">
            {listeComptes.map((c, index) => (
                <div key={c.id} className="m-2 bg-light">
                    <h2>Compte : {infoCompte[index]?.compte}</h2>
                    <h2>Link : {infoCompte[index]?.adresse}</h2>
                </div>
            ))}
        </div>
    );
}

/* Section 3 */

function Main() {
    const uid = useContext(UidContext);
    const [selectedAccountId, setSelectedAccountId] = useState(null);

    const handleClick = (e) => {
        //Logout solution without deleting cookies in frontend (backend only)
        e.preventDefault()
        try {
            axios.get(`${process.env.REACT_APP_API_URL}api/user/logout`);
            window.location = '/';
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container">
            {uid ? <div>
                <button onClick={handleClick}>Se déconnecter</button>
                <div className="d-flex">
                    <div className="leftpane">
                        <h1>Partie 1</h1>
                        <SelecteurFiltreCompte />
                        <FiltreOrdreAlph />
                        <BoutonCreationCompte />
                    </div>
                    <div className="middlepane">
                        <h1>Partie 2</h1>
                        <EnteteCompteListe />
                    </div>
                    <div className="rightpane">
                        <h1>Partie 3</h1>
                    </div>
                </div>
            </div> : <div>
                <h1>Vous n'êtes pas connecté</h1>
                <button className=""><Link className="clear" to="/Login">Login</Link></button>
            </div>}
        </div>
    );
}

export default Main;
