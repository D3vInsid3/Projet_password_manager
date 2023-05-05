const jwt = require('jsonwebtoken')
const UserModel = require('../models/user.model.js')

//Middleware pour controler si le user est toujours/bien connecté
module.exports.checkUser = (req, res, next) => {
    //Récupération du cookie
    const token = req.cookies.jwt
    //Si j'ai bien un cookie en retour
    if (token) {
        //Je check si le token et bien identique à mon token secret
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            //Colback
            //Si la comparaison retourne une erreur
            if (err) {
                res.locals.user = null
                //Je supprime le cookie HS
                res.cookies('jwt', '', { maxAge: 0.1 })
                next()
            } else {
                let user = await UserModel.findById(decodedToken.id)
                res.locals.user = user
                next()
            }
        })
        // Si le token n'est pas bon
    } else {
        res.locals.user = null
        next()
    }
}

//Middleware pour le controle à la connection
module.exports.requireAuth = (req, res, next) => {
    //Récuperation du cookie
    const token = req.cookies.jwt
    //Si j'ai bien un cookie en retour
    if (token) {
        //Je check si le token et bien identique à mon token secret
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                //Colback
                //Si la comparaison retourne une erreur
                console.log(err);
            } else {
                console.log("L'utilisateur", decodedToken.id);
                next()
            }
        })
    } else {
        console.log("Pas de token");
    }
}