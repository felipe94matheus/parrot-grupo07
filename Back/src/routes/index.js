const express = require('express')
const UserController = require('../domain/users/controllers/userController')

const routes = express.Router()

routes.post("/registration", UserController.register)
routes.get("/user/:id", UserController.findUser)


module.exports = routes