const {validate, Joi} = require('express-validation')

const registerValidation = validate({
    body:Joi.object({
        name:Joi.string().required(),
        email:Joi.string().email().required(),
        appartment:Joi.number().required(),
        password:Joi.string().required(),
        status:Joi.boolean(),
        adm:Joi.boolean(),
    })
})

module.exports = registerValidation