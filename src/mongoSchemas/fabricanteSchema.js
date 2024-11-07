const mongoose = require("../db/mongo.db").mongoose

const fabricanteSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    numeroContacto: {
        type: Number,
        required: true
    },
    pathIMG: {
        type: String,
        required: true
    }
})

const Fabricante = mongoose.model("Fabricante", fabricanteSchema)

module.exports = Fabricante