const {Users} = require("../models")
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