const router = require('express').Router()
const authController = require('../controllers/auth.controller.js')
const userController = require('../controllers/user.controller.js')

// auth
router.post('/register', authController.signUp)
router.post('/login', authController.signIn)
router.get('/logout', authController.logout)

// users DB
router.get('/', userController.getAllUsers)

// user DB by id
router.get('/:id', userController.userInfo)

// modify user by id
router.put('/:id', userController.updateUser)

// delete user by id
router.delete('/:id', userController.deleteUser)

// add compte to user by double ids
router.patch('/compte/:idUser/:idCompte', userController.addCompte)


module.exports = router