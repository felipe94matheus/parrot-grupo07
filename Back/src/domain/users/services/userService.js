const bcrypt = require("bcryptjs")
const {Users} = require("../../../infrastructure/database/models")
const Sequelize = require("sequelize")

const UserService = {

    async register(data){
        const{password}=data
        const newUser = await Users.create({
            ...data,
            password:this.cripPass(password)
        })

        return newUser
    },

    cripPass(senha){
        const newPass=bcrypt.hashSync(senha,10)
        return newPass
    }

}

module.exports = UserService