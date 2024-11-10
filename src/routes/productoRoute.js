const { Router } = require('express')
const { Producto } = require('../models/productoModel')
const productoController = require('../controllers/productoController')
//const productoMiddleware = require('../middlewares/middleware')
//const productoSchema = require('../schemas/productoSchema')
const productoRoute = Router()

productoRoute.get('/productos', productoController.getProductos);
productoRoute.get('/productos/:id', productoController.getProductosId)
productoRoute.post('/productos', productoController.createProducto)
productoRoute.put('/productos/:id', productoController.updateProducto)
productoRoute.delete('/productos/:id',productoController.deleteProducto)

productoRoute.post('/productos/:id/componentes', productoController.associateComponente)

module.exports = productoRoute