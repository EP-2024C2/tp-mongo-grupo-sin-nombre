const mongoose = require("../db/mongo.db").mongoose
const Componente = require('../models/componenteModel')

const productoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    pathIMG: {
        type: String,
        required: true
    }, 
    componentes: [ //[Componente] no funciona
    { 
        nombre: { type: String, required: true },  
        descripcion: { type: String }
    }
]

    //Decidimos hacer una relación incrustada entre producto y componente ya que estos dos modelos están altamente relacionados y no cambiarán de forma idependiente.
},{
    collection: 'productos'
})

productoSchema.set('toJSON', {
    virtuals: true,
    transform: (_, ret) => {
      delete ret.__v;
      delete ret._id;
    }
  })
  
const Producto = mongoose.model("Producto", productoSchema)

module.exports = Producto