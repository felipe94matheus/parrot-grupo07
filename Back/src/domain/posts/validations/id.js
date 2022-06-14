const {validate, Joi} = require('express-validation')

const idValidation = validate({
    params:Joi.object({
        id: Joi.number().required(),
    })
})

module.exports = idValidation