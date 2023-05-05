module.exports.signUpErrors = (err) => {
    let errors = { pseudo: '', email: '', password: '' }

    if (err.message.includes('pseudo')) {
        errors.pseudo = "Pseudo incorect ou déjà pris"
    }

    if (err.message.includes('email')) {
        errors.email = "Email incorect"
    }

    if (err.message.includes('password')) {
        errors.password = "Votre password doit faire plus de 6 caractères"
    }

    if (err.code == 11000 && Object.keys(err.keyValue)[0].includes('pseudo')) {
        errors.pseudo = "Ce pseudo est déjà pris"
    }

    if (err.code == 11000 && Object.keys(err.keyValue)[0].includes('email')) {
        errors.email = "Cet email est déjà enregistré"
    }

    return errors
}

module.exports.signInErrors = (err) => {
    let errors = { email: '', password: '' }    

    if (err.message.includes('email')) {
        errors.email = "Votre email est inconnu"
    }

    if (err.message.includes('password')) {
        errors.password = "Votre password est incorect"
    }

    return errors
}