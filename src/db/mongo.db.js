const mongoose = require('mongoose')
//Nombre de la base de datos = MongoDB
const MONGO_URL = process.env.MONGO_URL || 'mongodb://admin:admin1234@localhost:27017/MongoDB?authSource=admin'
async function connectToDatabase() {
    try {
        await mongoose.connect(MONGO_URL);
        console.log('Conexión a mongo realizada con éxito');
    } catch (err) {
        console.error('Error al conectarse a mongo', err);
    }
}

module.exports = {connectToDatabase, mongoose}