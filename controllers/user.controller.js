const UserModel = require('../models/user.model.js');
const ObjectID = require('mongoose').Types.ObjectId;

//Get all users
module.exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find().select('-password');
    res.status(200).json(users);
};

//Get user by id
module.exports.userInfo = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send("Cette ID n'est pas dans la base de donnée, ID " + req.params.id)
    }

    const user = await UserModel.findById(req.params.id).select('-password');
    if (user) {
        res.send(user)
    } else {
        return res.status(400).send("L'ID existe bien mais erreur lors du chargement de l'utilisateur")
    }
}

//Update user by id
module.exports.updateUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send("Cette ID n'est pas dans la base de donnée, ID " + req.params.id)
    }

    try {
        const user = await UserModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    pseudo: req.body.pseudo,
                    email: req.body.email
                }
            },
            { new: true, upsert: true, setDefaultsOnInsert: true })
        if (user) {
            return res.send(user)
        } else {
            return res.status(500).send("Utilisateur non trouvé")
        }
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}

//Delete user by id
module.exports.deleteUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send("Cette ID n'est pas dans la base de donnée, ID " + req.params.id)
    }

    try {
        await UserModel.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: 'Utilisateur supprimé' })

    } catch (error) {
        return res.status(500).json({ message: error })
    }
}

//Add compte to user
module.exports.addCompte = async (req, res) => {
    if (!ObjectID.isValid(req.params.idUser)) {
        return res.status(400).send("Cette ID n'est pas dans la base de donnée, ID " + req.params.idUser)
    }

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            req.params.idUser,
            { $addToSet: { comptes: req.params.idCompte } },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        ).exec();

        if (updatedUser) {
            res.status(201).json(updatedUser);
        } else {
            res.status(404).json({ error: 'Utilisateur non trouvé' });
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

