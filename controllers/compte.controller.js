const CompteModel = require('../models/compte.model.js');
const ObjectID = require('mongoose').Types.ObjectId;

//Lecture de tous les comptes
module.exports.readAllCompte = async (req, res) => {
    const comptes = await CompteModel.find().select('-password');
    res.status(200).json(comptes);
};

//Lecture d'un compte via son id
module.exports.readCompte = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send("Cette ID n'est pas dans la base de donnée, ID " + req.params.id)
    }

    const compte = await CompteModel.findById(req.params.id).select('-password');
    if (compte) {
        res.send(compte)
    } else {
        return res.status(400).send("L'ID existe bien mais erreur lors du chargement du compte")
    }
};

// création d'un nouveau compte
module.exports.createCompte = async (req, res) => {
    const newCompte = new CompteModel({
        compte: req.body.compte,
        email: req.body.email,
        password: req.body.password,
        categorie: req.body.categorie,
        autre: req.body.autre,
        pseudo: req.body.pseudo
    })

    try {
        const compte = await newCompte.save()
        return res.status(201).json(compte)
    } catch (error) {
        return res.status(400).send(error)
    }
};

//Mise à jour d'un compte via id
module.exports.updateCompte = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send("Cette ID n'est pas dans la base de donnée, ID " + req.params.id)
    }

    try {
        const compte = await CompteModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    compte: req.body.compte,
                    email: req.body.email,
                    password: req.body.password,
                    categorie: req.body.categorie,
                    autre: req.body.autre,
                    pseudo: req.body.pseudo
                }
            },
            { new: true, upsert: true, setDefaultsOnInsert: true })
        if (compte) {
            return res.send(compte)
        } else {
            return res.status(500).send("Compte non trouvé")
        }
    } catch (error) {
        return res.status(500).json({ message: error })
    }
};

// supprimer un compte via son id
module.exports.deleteCompte = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send("Cette ID n'est pas dans la base de donnée, ID " + req.params.id)
    }

    try {
        await CompteModel.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: 'Compte supprimé' })

    } catch (error) {
        return res.status(500).json({ message: error })
    }
};

