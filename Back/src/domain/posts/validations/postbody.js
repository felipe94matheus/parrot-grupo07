const {validate, Joi} = require('express-validation')

const registerValidation = validate({
    body:Joi.object({
        content:Joi.string().required(),
        user_id:Joi.number().required(),
    })
})

module.exports = registerValidation;