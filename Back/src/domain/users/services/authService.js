const bcrypt = require("bcryptjs")
const {Users} = require("../../../infrastructure/database/models")
const Sequelize = require("sequelize")

const AuthService = {

    async login (data){

        const {email} = data

        const userLogin = await Users.findOne({
            where:{
                email
            }
        })

        return userLogin

    }

   
}

module.exports = AuthService