const express = require('express')
const AuthController = require('../domain/users/controllers/authController')
const UserController = require('../domain/users/controllers/userController')
const UserValidation = require('../domain/users/validations')
const PostController = require('../domain/posts/controllers/postController')
const PostValidation = require('../domain/posts/validations')
const auth = require("../middleware/auth")

const routes = express.Router()

routes.post("/user", UserValidation.registerValidation, UserController.register)
routes.get("/user/:id", UserValidation.editValidation, UserController.findUser)

routes.post("/login", UserValidation.loginValidation, AuthController.login)

routes.post("/post", auth, PostValidation.postbodyValidation, PostController.createPost)
routes.get("/post/:id", PostValidation.idValidation, PostController.getPostByUserId)
routes.get("/feed", PostController.getAll)
routes.delete("/post/:idPost", PostController.delete)
routes.put("/post/:idPost", PostController.update)

module.exports = routes