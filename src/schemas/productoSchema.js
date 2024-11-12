const Joi = require("joi")

const productoSchema = Joi.object().keys({

    nombre: Joi.string().required().messages({
        "any.required": "El campo nombre es obligatorio",
        "string.empty": "El campo nombre no puede estar vacio"  

    }),

    descripcion: Joi.string().required().messages({
        "any.required": "El campo descripcion es obligatorio",
        "string.empty": "El campo descripcion no puede estar vacio"  

    }),

    precio: Joi.number().required().messages({
        "any.required": "El campo precio es obligatorio",
        "number.base": "El campo precio debe ser un número",

    }),
    pathIMG: Joi.string().required().messages({
        "any.required": "El campo pathIMG es obligatorio",
        "string.empty": "El campo pathIMG no puede estar vacio"  

    }),
    componentes: Joi.array().required().messages({
        "any.required": "El campo componentes es obligatorio",
        "string.empty": "El campo componentes no puede estar vacio"  

    })
})

module.exports = productoSchema