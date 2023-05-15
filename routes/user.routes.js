const router = require('express').Router()
const authController = require('../controllers/auth.controller.js')
const userController = require('../controllers/user.controller.js')

// auth
router.post('/register', authController.signUp)
router.post('/login', authController.signIn)
router.get('/logout', authController.logout)

// users DB
router.get('/', userController.getAllUsers)

// user DB par id
router.get('/:id', userController.userInfo)

// modification d'un user par son id
router.put('/:id', userController.updateUser)

// delete d'un user par son id
router.delete('/:id', userController.deleteUser)


module.exports = router