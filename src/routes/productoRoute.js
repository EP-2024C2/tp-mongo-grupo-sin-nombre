const { Router } = require('express')
//const { Producto } = require('../models/productoModel')
const productoController = require('../controllers/productoController')
//const productoMiddleware = require('../middlewares/middleware')
//const productoSchema = require('../schemas/productoSchema')
const productoRoute = Router()

productoRoute.get('/productos', productoController.getProductos);
productoRoute.get('/productos/:id', productoController.getProductosId)
productoRoute.post('/productos', productoController.createProducto)
productoRoute.put('/productos/:id', productoController.updateProducto)
productoRoute.delete('/productos/:id',productoController.deleteProducto)

productoRoute.post('/productos/:id/fabricantes', productoController.associateFabricante)
productoRoute.get('/productos/:id/fabricantes', productoController.getFabricantesById)

//Componentes 
productoRoute.get('/productos/:id/componentes', productoController.getComponentes)
productoRoute.get('/productos/:id/componentes/:componenteId', productoController.getComponenteId)
productoRoute.post('/productos/:productoId/componentes', productoController.associateComponente)
productoRoute.put('/productos/:productoId/componentes/:componenteId', productoController.updateComponente)
productoRoute.delete('/productos/:productoId/componentes/:componenteId', productoController.deleteComponente)

module.exports = productoRoute