const express = require('express')
const UserController = require('../domain/users/controllers/userController')
const UserValidation = require('../domain/users/validations')

const routes = express.Router()

routes.post("/register", UserValidation.registerValidation, UserController.register)
routes.get("/edit/:id", UserValidation.editValidation, UserController.findUser)


module.exports = routes