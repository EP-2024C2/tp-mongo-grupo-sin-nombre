const { Router } = require('express')
const Producto = require('../models/productoModel')
const productoController = require('../controllers/productoController')
const productoMiddleware = require('../middlewares/middleware')
const productoSchema = require('../schemas/productoSchema')
const productoRoute = Router()

productoRoute.get('/productos', productoController.getProductos);
productoRoute.get('/productos/:id', productoMiddleware.existsById(Producto),productoController.getProductosId)
productoRoute.post('/productos', productoMiddleware.validateSchema(productoSchema) , productoController.createProducto)
productoRoute.put('/productos/:id', productoMiddleware.validateSchema(productoSchema), productoController.updateProducto)
productoRoute.delete('/productos/:id',productoMiddleware.existsById(Producto),productoController.deleteProducto)

productoRoute.post('/productos/:id/fabricantes',productoMiddleware.existsById(Producto), productoController.associateFabricante)
productoRoute.get('/productos/:id/fabricantes',productoMiddleware.existsById(Producto), productoController.getFabricantesById)

//Componentes 
productoRoute.get('/productos/:id/componentes', productoMiddleware.existsById(Producto), productoController.getComponentes)
productoRoute.get('/productos/:productoId/componentes/:componenteId',productoMiddleware.existsById(Producto), productoController.getComponenteId)
productoRoute.post('/productos/:productoId/componentes', productoController.associateComponente)
productoRoute.put('/productos/:productoId/componentes/:componenteId', productoMiddleware.existsById(Producto),productoController.updateComponente)
productoRoute.delete('/productos/:productoId/componentes/:componenteId',productoMiddleware.existsById(Producto), productoController.deleteComponente)

module.exports = productoRoute