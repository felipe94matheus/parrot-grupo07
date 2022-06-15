const AuthService = require("../services/authService")


const AuthController = {

    async login (req,res){
        try{
            const {password} = req.body
            const userLogin = await AuthService.login(req.body)

            if(!userLogin){
                return res.status(401).json("E-mail ou senha inválida, verifique e tente novamente")
            }

            if(!AuthService.uncripPass(password,userLogin.password)){
                return res.status(401).json("E-mail ou senha inválida, verifique e tente novamente")
            }

            if(userLogin.status==false){
                return res.status(401).json("Usuário não é mais morador")
            }

            const token = AuthService.generateToken(userLogin.id_user,userLogin.email,userLogin.adm)

            return res.status(200).json(token)

        } catch (error){
            res.status(500).json("Ocorreu um erro")
        }
    }

}

module.exports = AuthController