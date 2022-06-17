const {validate, Joi} = require('express-validation')

const deleteValidation = validate({
    params:Joi.object({
        id: Joi.number().required(),
    })
})

module.exports = deleteValidation