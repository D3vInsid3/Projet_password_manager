const UserModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const { signUpErrors, signInErrors } = require('../utils/errors.utils.js')



// S'enregistrer
module.exports.signUp = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await UserModel.create({ email, password })
        res.status(201).json({ user: user._id })
    } catch (err) {
        const errors = signUpErrors(err)
        res.status(200).send({ errors })
    }
}

// Function for creating a token
// Define the duration (in milliseconds)
const maxAge = 3 * 24 * 60 * 60 * 1000
const createToken = (id) => {    
    return jwt.sign({ id }, process.env.TOKEN_SECRET, {        
        expiresIn: maxAge
    })
}

// Se connecter
module.exports.signIn = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await UserModel.login(email, password)
        const token = createToken(user._id)        
        res.cookie('jwt', token, { httpOnly: true, maxAge, sameSite: "None", secure: true  })              
        res.status(200).json({ user: user._id })
    } catch (err) {        
        const errors = signInErrors(err)        
        res.status(200).json({ errors }) 
    }
}

// Logout
module.exports.logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 0.1 });   
    res.status(200).json({ message: 'You are logged out' })
}