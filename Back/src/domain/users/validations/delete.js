const {validate, Joi} = require('express-validation')

const deleteValidation = validate({
    body:Joi.object({
        status:Joi.boolean().required(),
    })
})

module.exports = deleteValidation