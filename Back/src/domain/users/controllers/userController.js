const { Users } = require("../../../infrastructure/database/models")
const Sequelize = require("sequelize")

const UserController = {

    async register(req,res){
        try{
            console.log("ola!")
            const newUser = await Users.create({
                ...req.body
            })

            const existsUser = await Users.count({where:{email}})

            if (existsUser){
                return res.status(400).json("E-mail já cadastrado!")
            }

            return res.status(201).json(newUser)
        } catch (error) {
            console.log(error)
        }
    },

    async findUser (req,res){
        try{
            const idUser = req.params['id'];
            const findUser = await Users.findByPk(idUser)

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