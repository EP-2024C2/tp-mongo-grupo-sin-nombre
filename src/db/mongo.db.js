const mongoose = require("mongoose")
//Nombre de la base de datos: productosDB
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/productosDB?authSource=admin"

async function connectToDatabase() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Conexión a mongo realizada con exito");
  } catch (err) {
    console.error("Error al conectarse a mongo", err);
  }
}

module.exports = { mongoose, connectToDatabase };