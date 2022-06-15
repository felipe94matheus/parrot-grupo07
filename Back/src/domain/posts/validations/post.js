const {validate, Joi} = require('express-validation')

const registerValidation = validate({
    body:Joi.object({
        content:Joi.string().required(),
    })
})

module.exports = registerValidation;