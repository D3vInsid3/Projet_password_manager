const express = require('express')
const userRoutes = require('./routes/user.routes.js')
const compteRoutes = require('./routes/compte.routes.js')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
require('dotenv').config({path: './config/.env'})
require('./config/db.js')
const {checkUser, requireAuth} = require('./middleware/auth.middleware.js')


const app = express()


//Permet d'ouvrir l'acces au back au front
//option de cors
const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    allowedHeaders: ['sessionId', 'Content-type'],
    exposedHeaders: ['sessionId'],
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    preflightContinue: false
}
app.use(cors(corsOptions))


//Définition du port du backend
const port = process.env.PORT

//Body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//Cookie-parser
app.use(cookieParser())

//Jwt
app.get('*', checkUser)
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id)
})

// routes
// user
app.use('/api/user', userRoutes)
// compte
app.use('/api/compte', compteRoutes)

// server
app.listen(port, () => {
    console.log(`Localhost ouvert sur le port ${port}`);
})


