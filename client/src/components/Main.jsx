import React, { Component } from "react";
import { Link, redirect } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import '../styles/styles.css';
import axios from "axios";
import { UidContext } from "../components/AppContext.js";


import image1 from './facebook.svg'

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

/* PARTIE 1 */
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

/* PARTIE 2 */
function EnteteCompteListe(props) {
    return <div id={props.id}>
        <img src={image1} />
        <h2>{props.name}</h2>
        <p>{props.lien}</p>
    </div>
}

function SupCompteListe(props) {
    return <button className="m-1" id={props.id}>Supprimer</button>
}

function ImportListeCompte({ onSelectAccount }) {

    return <div>
        {data.map(c => <div key={c.id} className="m-2">
            <EnteteCompteListe id={c.id} name={c.name} lien={c.AdresseConnexion} />
            <SupCompteListe />
            <button className="m-1" onClick={() => onSelectAccount(c.id)}>Ouvrir</button>
        </div>)}
    </div>
}

/* PARTIE 3 */
function AfficheDetailsCompte(props) {

    return <div className="wrapper d-flex align-items-center justify-content-center">
        <div className="loginWrapper rounded">
            <h2 className="mb-3">{data[props.id].name}</h2>
            <p>{data[props.id].AdresseConnexion}</p>
            <form>
                <div className="form-group mb-2">
                    <label htmlFor="text" className="form-label">Mot de passe :</label>
                    <input type="password" className="form-control" value={data[props.id].passeword}></input>
                    <label htmlFor="text" className="form-label">Mail de reference :</label>
                    <input type="password" className="form-control" value={data[props.id].AdresseReferenceCompte}></input>
                    <label htmlFor="disabledSelect" className="form-label">Catégorie compte :</label>
                    <select className="form-select">
                        <option selected>{data[props.id].Categorie}</option>
                        <option>Banque</option>
                        <option>Jeux</option>
                        <option>Admin</option>
                        <option>Autres</option>
                    </select>
                </div>
                <button className="m-1">Modifier</button>
                <button className="m-1">Save</button>
            </form>
        </div>
    </div>
}

function Main() {
    const uid = useContext(UidContext);
    const [selectedAccountId, setSelectedAccountId] = useState(null);

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
                        <ImportListeCompte onSelectAccount={setSelectedAccountId} />
                    </div>
                    <div className="rightpane">
                        <h1>Partie 3</h1>
                        {selectedAccountId !== null && (
                            <AfficheDetailsCompte id={selectedAccountId} />)}
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
