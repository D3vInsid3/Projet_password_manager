const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://' + process.env.DB_USER_PASS + '@cluster0.qoqzj4v.mongodb.net/base_app', {

    useNewUrlParser: true,

    useUnifiedTopology: true

})
    .then(() => console.log('Connexion à la base de donnée faite'))
    .catch((err) => console.log('Erreure lors de la connexion à la base de donnée', err))