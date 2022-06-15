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

    async findUser(data){
        const idUser = data['id']
        const findUser = await Users.findByPk(idUser)

        return findUser

    },

    cripPass(senha){
        const newPass=bcrypt.hashSync(senha,10)
        return newPass
    },

    isAllowedToEdit(adm, loggedUser, id){
        if(adm == true || loggedUser == id) {
            return true
        }

        return false
    },

    async updateUser(id, name, email, appartment, status) {
        await Users.update(
            {
                name,
                email,
                appartment,
                status
            },
            {
                where: {
                    id_user: id
                },
            }
        )

        const updatedUser = await Users.findByPk(id)

        return updatedUser
    },

    async deleteUser(id, status) {
        const deletedUser = await Users.update(
            {
                status
            },
            {
                where: {
                    id_user: id
                },
            }
        );

        return deletedUser
    }

}

module.exports = UserService