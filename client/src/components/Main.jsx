import React, { Component } from "react";
import { Link, redirect } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import '../styles/styles.css';
import axios from "axios";
import { UidContext } from "../components/AppContext.js";
import { set } from "mongoose";
import { Button, Modal } from 'react-bootstrap';


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

function CreateNewCompte() {
    const uid = useContext(UidContext);
    const [showModal, setShowModal] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [link, setLink] = useState("");
    const [categorie, setCategorie] = useState("");
    const [autre, setAutre] = useState("");
    const [pseudo, setPseudo] = useState("");

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const handleSend = async () => {

        await axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/compte`,
            withCredentials: true,
            data: {
                "compte": name,
                "email": email,
                "password": password,
                "adresse": link,
                "categorie": categorie,
                "autre": autre,
                "pseudo": pseudo
            },
        }).then((res) => {
            axios({
                method: "patch",
                url: `${process.env.REACT_APP_API_URL}api/user/compte/${uid}/${res.data._id}`,
                withCredentials: true,
                data: {
                    "idCompte": res.data._id,
                },
            }).then((res) => {
                handleClose()
            }).then((res) => {
                window.location.href = "/main";
            }).catch((err) => {
                console.log(err);
            })
        }).catch((err) => {
            console.log(err);
        })
    }





    return (
        <>
            <br />
            <label htmlFor="disabledSelect" className="form-label">Création d'un nouveau compte</label>
            <Button className="d-grid gap-2 col-6 mx-auto" variant="primary" onClick={handleShow}>
                Ajouter
            </Button>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Ajouter un compte</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className=" bg-dark d-flex align-items-center justify-content-center">
                        <div className="loginWrapper rounded">
                            <form className="" id="sign-in-form">
                                <div className="form-group mb-2">
                                    <label className="form-label">Nom du compte :</label>
                                    <input className="form-control" id="name" onChange={(e) => setName(e.target.value)} value={name} required></input>
                                </div>
                                <div className="form-group mb-2">
                                    <label htmlFor="email" className="form-label">Email du compte :</label>
                                    <input type="email" className="form-control" id="email" onChange={(e) => setEmail(e.target.value)} value={email} required></input>
                                </div>
                                <div className="form-group mb-2">
                                    <label htmlFor="password" className="form-label">Passeword :</label>
                                    <input type="password" className="form-control" id="password" onChange={(e) => setPassword(e.target.value)} value={password} required></input>
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">Site du compte :</label>
                                    <input className="form-control" id="link" onChange={(e) => setLink(e.target.value)} value={link} required></input>
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">Pseudo :</label>
                                    <input className="form-control" id="pseudo" onChange={(e) => setPseudo(e.target.value)} value={pseudo}></input>
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">Autre :</label>
                                    <input className="form-control" id="autre" onChange={(e) => setAutre(e.target.value)} value={autre}></input>
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">Catégorie du compte :</label>
                                    <input className="form-control" id="categorie" onChange={(e) => setCategorie(e.target.value)} value={categorie} required></input>
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fermer
                    </Button>
                    <Button variant="primary" onClick={handleSend}>
                        Sauvegarder
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};


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

    //const [detailsCompte, setDetailsCompte] = useState(false);
    const [detailsCompteIndex, setDetailsCompteIndex] = useState(null)



    const showDetailsCompte = (index) => {
        //setDetailsCompte(!detailsCompte)
        setDetailsCompteIndex(index === detailsCompteIndex ? null : index)
    }

    useEffect(() => {

        const fetchComptes = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}api/user/${uid}`);
                setListeComptes(res.data.comptes);

                const infoComptePromises = res.data.comptes.map(async (c) => {
                    const infoCompte = await axios.get(`${process.env.REACT_APP_API_URL}api/compte/${c}`);
                    return infoCompte.data;
                });

                Promise.all(infoComptePromises).then((infos) => {
                    setInfoCompte(infos);
                });
            } catch (err) {
                console.log("Error during connection with DB", err);
            }
        };
        fetchComptes();
    }, [uid]);




    return (
        <div className="container">
            {listeComptes.map((compte, index) => (
                <div key={compte.id || compte} className="m-2 bg-light row">
                    <div className="col">
                        <h2>Compte : {infoCompte[index]?.compte.toUpperCase()}</h2>
                        <h2>Link : {infoCompte[index]?.adresse}</h2>
                        {index === detailsCompteIndex && <DetailsCompte infosCompte={infoCompte[index]} />}
                    </div>
                    <div className="col d-flex align-items-center justify-content-end">
                        <button variant="primary" onClick={() => showDetailsCompte(index)}>...</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

function DetailsCompte(props) {
    const uid = useContext(UidContext);

    
    const [email, setEmail] = useState(props.infosCompte.email);
    const [password, setPassword] = useState(props.infosCompte.password);    
    const [categorie, setCategorie] = useState(props.infosCompte.categorie);
    const [autre, setAutre] = useState(props.infosCompte.autre);
    const [pseudo, setPseudo] = useState(props.infosCompte.pseudo);

    async function deleteCompte(idCompte) {
        await axios({
            method: "Patch",
            url: `${process.env.REACT_APP_API_URL}api/user/compte/${uid}/${idCompte}/remove`,
            withCredentials: true,
            data: {
                "idCompte": idCompte,
            },
        }).then(() => {
            axios.delete(`${process.env.REACT_APP_API_URL}api/compte/${idCompte}`);
        }).then(() => {
            window.location.href = "/main";
        })

    }

    async function updateCompte(idCompte) {
        await axios({
            method: "Put",
            url: `${process.env.REACT_APP_API_URL}api/compte/${idCompte}`,
            withCredentials: true,
            data: {                
                "email": email,
                "password": password,
                "categorie": categorie,
                "autre": autre,
                "pseudo": pseudo,
            },
        }).then(() => {
            window.location.href = "/main";
        })
    }

    return (
        <div>
            <h3 className="text-center">Détails du compte</h3>
            <p>Email : <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></p>
            <p>Mot de passe : <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} /></p>
            <p>Autres : <input type="text" value={autre} onChange={(e) => setAutre(e.target.value)} /></p>
            <p>Pseudo : <input type="text" value={pseudo} onChange={(e) => setPseudo(e.target.value)} /></p>
            <p>Catégorie : <input type="text" value={categorie} onChange={(e) => setCategorie(e.target.value)} /></p>
            <div className="">
                <button className="d-grid gap-2 col-6 mx-auto mt-2 mb-2" variant="primary" onClick={() => updateCompte(props.infosCompte._id)}>Modifier compte</button>
                <button className="d-grid gap-2 col-6 mx-auto mt-2 mb-2" variant="primary" onClick={() => deleteCompte(props.infosCompte._id)}>Supprimer compte</button>
            </div>
        </div>
    );
}

function Main() {
    const uid = useContext(UidContext);

    const logout = (e) => {
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
                <button onClick={logout}>Se déconnecter</button>
                <div className="d-flex">
                    <div className="leftpane">
                        <h1>Partie 1</h1>
                        <SelecteurFiltreCompte />
                        <FiltreOrdreAlph />
                        <CreateNewCompte />
                    </div>
                    <div className="middlepane">
                        <h1>Partie 2</h1>
                        <EnteteCompteListe />
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
