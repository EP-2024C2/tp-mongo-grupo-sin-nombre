const mongoose = require("../db/mongo.db").mongoose
const { Schema } = require("mongoose")
 
const fabricanteSchema = new mongoose.Schema({
    nombre: {
        type: Schema.Types.String,
        required: true
    },
    direccion: {
        type: Schema.Types.String,
        required: true
    },
    numeroContacto: {
        type: Schema.Types.Number,
        required: true
    },
    pathIMG: {
        type: Schema.Types.String,
        required: true
    },
    productoId:{
        type: Schema.Types.ObjectId,
        ref: "Producto"
    },
    productos: [{
        type: Schema.Types.ObjectId,
        ref: "Producto"
    }]
    
},{
    collection : "fabricantes",
})

fabricanteSchema.set('toJSON', {
    virtuals: true,
    transform: (_, ret) => {
      delete ret.__v;
      delete ret._id;
    }
  })

const Fabricante = mongoose.model("Fabricante", fabricanteSchema)

module.exports = Fabricante