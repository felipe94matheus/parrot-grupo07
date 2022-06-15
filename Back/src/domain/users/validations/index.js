const registerValidation =  require('./register')
const editValidation = require('./edit')
const loginValidation = require('./login')
const updateValidation = require('./update')
const deleteValidation = require('./delete')

module.exports = {
    registerValidation,
    editValidation,
    loginValidation,
    updateValidation,
    deleteValidation
}