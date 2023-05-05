const router = require('express').Router()
const compteController = require('../controllers/compte.controller')

//Lecture des comptes de la base de donnée
router.get('/', compteController.readAllCompte)

//Lecture d'un compte via son ID
router.get('/:id', compteController.readCompte)

//Ecriture d'un compte dans la base de donnée
router.post('/', compteController.createCompte)

//Mise à jour d'un compte dans la base de donnée
router.put('/:id', compteController.updateCompte)

//Supprimer un compte de la base de donnée
router.delete('/:id', compteController.deleteCompte)


module.exports = router

