const {validate, Joi} = require('express-validation')

const editValidation = validate({
    params:Joi.object({
        id: Joi.number().required(),
    })
})

module.exports = editValidation