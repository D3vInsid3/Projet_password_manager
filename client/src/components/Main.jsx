import React, { Component } from "react";
import { Link, redirect } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import '../styles/styles.css';
import axios from "axios";
import { UidContext } from "../components/AppContext.js";
import { Button, Modal } from 'react-bootstrap';


/* Section 1 */
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

/* Section 2 */
function EnteteCompteListe({ triSelection, orderCategorie, reset }) {
    const uid = useContext(UidContext);
    const [listeComptes, setListeComptes] = useState([]);
    const [infoCompte, setInfoCompte] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    //const [detailsCompteIndex, setDetailsCompteIndex] = useState(null);
    const [detailsCompteIndex, setDetailsCompteIndex] = useState(false);

    const showDetailsCompte = (index) => {
        setDetailsCompteIndex(index === detailsCompteIndex ? null : index)
    }

    const showDetailsCompte2 = () => {
        setDetailsCompteIndex(!detailsCompteIndex)
    }
    const fetchComptes = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}api/user/${uid}`);            
            const comptes = res.data.comptes.sort((a, b) => (a.compte || "").localeCompare(b.compte));

            const infoComptePromises = comptes.map(async (c) => {
                const infoCompte = await axios.get(`${process.env.REACT_APP_API_URL}api/compte/${c}`);
                return infoCompte.data;
            })

            const infos = await Promise.all(infoComptePromises);
            let updatedInfoCompte = infos.slice();
                        

            if (orderCategorie === "magasin") {
                const magasinComptes = infos.filter((item) => item.categorie.toLowerCase() === "magasin")
                const magasinComptesIds = magasinComptes.map((item) => item._id);
                updatedInfoCompte = magasinComptes.slice().sort((a, b) => (a.compte || "").localeCompare(b.compte));
                setListeComptes(magasinComptesIds.sort((a, b) => (a.compte || "").localeCompare(b.compte)));
            } else if (orderCategorie === "jeux") {
                const jeuxComptes = infos.filter((item) => item.categorie.toLowerCase() === "jeux");
                const jeuxComptesIds = jeuxComptes.map((item) => item._id);
                updatedInfoCompte = jeuxComptes.slice().sort((a, b) => (a.compte || "").localeCompare(b.compte));
                setListeComptes(jeuxComptesIds.sort((a, b) => (a.compte || "").localeCompare(b.compte)));
            } else {
                setListeComptes(comptes);
            }

            if (triSelection === "asc") {
                updatedInfoCompte = updatedInfoCompte.sort((a, b) => (a.compte || "").localeCompare(b.compte));
            } else if (triSelection === "desc") {
                updatedInfoCompte = updatedInfoCompte.sort((a, b) => (b.compte || "").localeCompare(a.compte));
            }

            setInfoCompte(updatedInfoCompte);
            setIsLoading(false);

            

        } catch (err) {
            console.log("Error during connection with DB", err);
            setIsLoading(false)
        }
    };

    // Appeler fetchComptes à chaque changement de uid ou triSelection
    useEffect(() => {
        fetchComptes();
        setIsLoading(true)
    }, [uid, triSelection, orderCategorie, reset]);


    return (
        <div className="container">
            {isLoading ? (
                <div>Loading...</div> // Affiche l'indicateur de chargement lorsque isLoading est true
            ) : (
                listeComptes.map((c, index) => (
                    <div key={c} className="m-2 bg-light row">
                        <div className="col">
                            <h2>Compte : {infoCompte[index]?.compte.toUpperCase()}</h2>
                            <h2>Link : {infoCompte[index]?.adresse}</h2>
                            {index === detailsCompteIndex && <DetailsCompte infosCompte={infoCompte[index]} />}
                        </div>
                        <div className="col d-flex align-items-center justify-content-end">
                            <button variant="primary" onClick={() => showDetailsCompte(index)}>
                                ...
                            </button>
                        </div>
                    </div>
                ))
            )}
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
        <div key={props.infosCompte._id}>
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
    const [triSelection, setTriSelection] = useState("");
    const [orderCategorie, setOrderCategorie] = useState("");

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

    function FiltreOrdreAlph() {
        const [orderTri, setOrderTri] = useState("");

        const handleChange = (e) => {
            const triSelection = e.target.value;
            setOrderTri(triSelection);
            setTriSelection(triSelection);
        }

        return <form>
            <label htmlFor="disabledSelect" className="form-label">Filtre comptes</label>
            <select className="form-select" value={orderTri} onChange={handleChange}>
                <option value="">Choisissez un tri</option>
                <option value="asc">De A à Z</option>
                <option value="desc">De Z à A</option>
            </select>
        </form>
    }

    function SelecteurFiltreCompte() {
        //Axios des comptes d'un user
        //puis axios des comptes pour récupe les catégories
        //lister les catégorie pour les ajouter en filtre
        //renvoyer à la partie 2 la catégorie choisi pour le filtre

        const handleChangeCategorie = (e) => {
            const categorieSelection = e.target.value;
            setOrderCategorie(categorieSelection)
        }

        return <form>
            <label htmlFor="disabledSelect" className="form-label">Filtre comptes</label>
            <select className="form-select" value={orderCategorie} onChange={handleChangeCategorie}>
                <option selected value="global">Choisissez une categorie</option>
                <option value="banque">Banque</option>
                <option value="jeux">Jeux</option>
                <option value="magasin">Magasin</option>
            </select>
        </form>
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
                        <EnteteCompteListe triSelection={triSelection} orderCategorie={orderCategorie} />
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
