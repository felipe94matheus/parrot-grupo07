const bcrypt = require("bcryptjs")
const {Users} = require("../models")
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

    async edit(data){
        const idUser = data['id']
        const findUser = await Users.findByPk(idUser)
        return findUser

    },

    cripPass(senha){
        const newPass=bcrypt.hashSync(senha,10)
        return newPass
    },

    async userExists(email){
        const existsUser = await Users.count({
            where:{email}
        })
    }
}

module.exports = UserService