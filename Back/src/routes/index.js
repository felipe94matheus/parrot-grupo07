const express = require('express')
const UserController = require('../domain/users/controllers/userController')
const UserValidation = require('../domain/users/validations')
const PostController = require('../domain/posts/controllers/postController')
const PostValidation = require('../domain/posts/validations')

const routes = express.Router()

routes.post("/register", UserValidation.registerValidation, UserController.register)
routes.get("/edit/:id", UserValidation.editValidation, UserController.findUser)

routes.post("/post", PostValidation.postbodyValidation, PostController.createPost)
routes.get("/post/:id", PostValidation.idValidation, PostController.getPostByUserId)
routes.get("/feed", PostController.getAll)
routes.delete("/post/:idPost", PostController.delete)
routes.put("/post/:idPost", PostController.update)

module.exports = routes