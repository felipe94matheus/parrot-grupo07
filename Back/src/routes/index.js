const express = require('express')
const AuthController = require('../domain/users/controllers/authController')
const UserController = require('../domain/users/controllers/userController')
const UserValidation = require('../domain/users/validations')
const PostController = require('../domain/posts/controllers/postController')
const PostValidation = require('../domain/posts/validations')
const auth = require("../middleware/auth")

const routes = express.Router()

routes.post("/user", UserValidation.registerValidation, UserController.register)
routes.get("/user/:id", auth, UserValidation.editValidation, UserController.findUser)
routes.put("/user/:id", auth, UserValidation.updateValidation, UserController.update)
routes.put("/delete/:id", auth, UserValidation.deleteValidation, UserController.delete)

routes.post("/login", UserValidation.loginValidation, AuthController.login)

routes.post("/post", auth, PostValidation.postbodyValidation, PostController.createPost)
routes.get("/post/:id", auth, PostValidation.idValidation, PostController.getPostByUserId)
routes.get("/feed", auth, PostController.getAll)
routes.delete("/post/:idPost", auth, PostValidation.idValidation, PostController.delete)
routes.put("/post/:idPost", auth, PostValidation.idValidation, PostController.update)

module.exports = routes