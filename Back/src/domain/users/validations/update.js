const {validate, Joi} = require('express-validation')

const updateValidation = validate({
    body:Joi.object({
        name:Joi.string().required(),
        appartment:Joi.number().required(),
        status:Joi.boolean().required(),
    })
})

module.exports = updateValidation