const {validate, Joi} = require('express-validation')

const loginValidation = validate({
    body:Joi.object({
        email:Joi.string().email().required(),
        password:Joi.string().required(),
    })
})

module.exports = loginValidation