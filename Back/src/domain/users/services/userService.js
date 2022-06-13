const bcrypt = require("bcryptjs")
const {Users} = require("../../../infrastructure/database/models")
const Sequelize = require("sequelize")

const UserService = {

    async register(data){

        const newUser = await Users.create({
            ...data
        })

        return newUser
    }

}

module.exports = UserService