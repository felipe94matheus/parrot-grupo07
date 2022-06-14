const {Users} = require("../models")
const Sequelize = require("sequelize")
const UserService = require("../services/userService")

const UserController = {

    async register(req,res){
        try{
            const {email} = req.body
            const existsUser = await Users.count({where:{email}})
    
            if (existsUser){
                    return res.status(400).json("E-mail já cadastrado!")
            }
            const newUser = await UserService.register(req.body)
            return res.status(201).json(newUser)
        } catch (error) {
            res.status(500).json("Ocorreu um erro")
        }
    },

    async findUser (req,res){
        try{
            
            const findUser = await UserService.edit(req.params)

            if(!findUser){
                return res.status(404).json("Usuário não encontrado")
            }
            
            return res.status(200).json(findUser)
            
        } catch (error){
            res.status(500).json("Ocorreu um erro")
        }
    }


}

module.exports = UserController