const { Router } = require('express')
const fabricanteController = require('../controllers/fabricanteController')
const Fabricante = require('../models/fabricanteModel');
const fabricanteMiddleware = require('../middlewares/middleware');
const fabricanteSchema = require('../schemas/fabricanteSchema')
const fabricanteRoute = Router()

fabricanteRoute.get('/fabricantes', fabricanteController.getFabricantes);
fabricanteRoute.get('/fabricantes/:id', fabricanteMiddleware.existsById(Fabricante), fabricanteController.getFabricantesId);
fabricanteRoute.post('/fabricantes', fabricanteMiddleware.validateSchema(fabricanteSchema), fabricanteController.createFabricante); 
fabricanteRoute.put('/fabricantes/:id', fabricanteMiddleware.existsById(Fabricante), fabricanteMiddleware.validateSchema(fabricanteSchema), fabricanteController.updateFabricante)
fabricanteRoute.delete('/fabricantes/:id', fabricanteMiddleware.existsById(Fabricante), fabricanteController.deleteFabricante);


fabricanteRoute.get('/fabricantes/:id/productos',fabricanteMiddleware.existsById(Fabricante), fabricanteController.getProductosInFabricante)


module.exports = fabricanteRoute