const UserService = require("../services/userService")

const UserController = {

    async register(req,res){
        try{
            const {email} = req.body
            const existsUser = await UserService.userExists(email)    

            if (existsUser){
                return res.status(400).json("E-mail já cadastrado!")
            }

            const newUser = await UserService.register(req.body)
            return res.status(201).json(newUser)
        } catch (error) {
            console.log(error)
            res.status(500).json("Ocorreu um erro")
        }
    },

    async findUser (req,res){
        try{
            
            const findUser = await UserService.findUser(req.params)
            const isAuthorized = UserService.isAuthorized(findUser.adm, findUser.id_user, req.auth.id_user)

            if(!findUser){
                return res.status(404).json("Usuário não encontrado")
            }

            if(isAuthorized == false) {
                return res.status(401).json("Ocorreu um erro. Você não possui esse acesso!")
            }
            
            return res.status(200).json(findUser)
            
        } catch (error){
            res.status(500).json("Ocorreu um erro")
        }
    },

    async update (req,res){
        try{
            const loggedUser = req.auth.id_user
            const { id } = req.params
            const adm = req.auth.adm
            const { name, email, appartment, status } = req.body
            const isAuthorized = UserService.isAuthorized(adm, loggedUser, id)
            const existsUser = UserService.findUser(id)
            
            if(!existsUser) {
                return res.status(404).json("Usuário não encontrado")
            }
            
            if(isAuthorized == false) {
                return res.status(401).json("Você não pode alterar este usuário")
            }

            const updatedUser = await UserService.updateUser(id, name, email, appartment, status)
            return res.status(200).json(updatedUser)
            
        } catch (error){
            res.status(500).json("Ocorreu um erro")
        }
    },

    async delete (req,res){
        try{
            const loggedUser = req.auth.id_user
            const { id } = req.params
            const adm = req.auth.adm
            const { status } = req.body
            const isAuthorized = await UserService.isAuthorized(adm, loggedUser, id)
            const existsUser = UserService.findUser(id)
            
            if(!existsUser) {
                return res.status(404).json("Usuário não encontrado")
            }
            
            if(isAuthorized == false) {
                return res.status(401).json("Você não pode deletar este usuário")
            }
            
            const deletedUser = await UserService.deleteUser(id,status)
            return res.status(204).json(deletedUser)
                   
        } catch (error){
            res.status(500).json("Ocorreu um erro")
        }
    }
}

module.exports = UserController