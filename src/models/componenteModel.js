const mongoose = require("../db/mongo.db").mongoose
const { Schema } = require("mongoose")
 
const componenteSchema = new mongoose.Schema({
    nombre: {
        type: Schema.Types.String,
        required: true
    },
    descripcion: {
        type: Schema.Types.String,
        required: true
    }
},{
    collection : "componentes",
})

componenteSchema.set('toJSON', {
    virtuals: true,
    transform: (_, ret) => {
      delete ret.__v;
      delete ret._id;
    }
  })
const Componente = mongoose.model("Componente", componenteSchema)

module.exports = Componente