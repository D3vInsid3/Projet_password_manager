module.exports.signUpErrors = (err) => {
    let errors = { pseudo: '', email: '', password: '' }

    if (err.message.includes('pseudo')) {
        errors.pseudo = "Incorrect pseudo or already taken"
    }

    if (err.message.includes('email')) {
        errors.email = "Incorrect email"
    }

    if (err.message.includes('password')) {
        errors.password = "Your password must be at least 6 characters"
    }

    if (err.code == 11000 && Object.keys(err.keyValue)[0].includes('pseudo')) {
        errors.pseudo = "This pseudo is already taken"
    }

    if (err.code == 11000 && Object.keys(err.keyValue)[0].includes('email')) {
        errors.email = "This email is already taken"
    }

    return errors
}

module.exports.signInErrors = (err) => {
    let errors = { email: '', password: '' }    

    if (err.message.includes('email')) {
        errors.email = "Email not found"
    }

    if (err.message.includes('password')) {
        errors.password = "Incorrect password"
    }

    return errors
}