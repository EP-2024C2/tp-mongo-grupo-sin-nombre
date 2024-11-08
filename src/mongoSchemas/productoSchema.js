const mongoose = require("../db/mongo.db").mongoose

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
    componentes: [{
        nombre: { type: String, required: true },  
        descripcion: { type: String }
    }]
    //Decidimos hacer una relación incrustada entre producto y componente ya que estos dos esquemas están altamente relacionados y no cambiarán de forma idependiente.
})

const Producto = mongoose.model("Producto", productoSchema)

module.exports = Producto