const { Users } = require("../../../infrastructure/database/models")
const AuthService = require("../services/authService")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const secret = require('../../../infrastructure/database/config/secret')

const AuthController = {

    async login (req,res){
        try{
            const {password} = req.body
            const userLogin = await AuthService.login(req.body)

            if(!userLogin){
                return res.status(401).json("E-mail ou senha inválida, verifique e tente novamente")
            }

            if(!bcrypt.compareSync(password,userLogin.password)){
                return res.status(401).json("E-mail ou senha inválida, verifique e tente novamente")
            }

            const token = jwt.sign(
                {
                id_user:userLogin.id_user,
                email:userLogin.email,
                name:userLogin.name,
                },
                secret.key
            )

            return res.status(200).json(token)

        } catch (error){
            res.status(500).json("Ocorreu um erro")
        }
    }

}

module.exports = AuthController