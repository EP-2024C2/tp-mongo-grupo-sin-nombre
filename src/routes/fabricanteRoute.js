const { Router } = require('express')
const fabricanteController = require('../controllers/fabricanteController')
const fabricanteRoute = Router()

fabricanteRoute.get('/fabricantes', fabricanteController.getFabricantes);
fabricanteRoute.get('/fabricantes/:id', fabricanteController.getFabricantesId)
fabricanteRoute.post('/fabricantes', fabricanteController.createFabricante)
fabricanteRoute.put('/fabricantes/:id', fabricanteController.updateFabricante)
fabricanteRoute.delete('/fabricantes/:id',fabricanteController.deleteFabricante)

fabricanteRoute.get('/fabricantes/:id/productos', fabricanteController.getProductosInFabricante)


module.exports = fabricanteRoute