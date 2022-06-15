const {Users} = require("../models")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const secret = require('../../../infrastructure/database/config/secret')

const AuthService = {

    async login (data){

        const {email} = data
        const userLogin = await Users.findOne({
            where:{
                email
            }
        })
        return userLogin
    },

    uncripPass (passwordLogin, passwordUser){
        const comparison = bcrypt.compareSync(passwordLogin, passwordUser)
        return comparison
    },

    generateToken(id_user, email, adm){
       const token = jwt.sign(
            {
            id_user,
            email,
            adm,
            },
            secret.key
        )
        return token
    }

   
}

module.exports = AuthService