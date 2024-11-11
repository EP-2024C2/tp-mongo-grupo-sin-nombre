const { Router } = require('express')
const componenteController = require('../controllers/componenteController')
const componenteRoute = Router()

componenteRoute.get('/componentes', componenteController.getComponentes);
componenteRoute.get('/componentes/:id', componenteController.getComponentesId)
componenteRoute.post('/componentes', componenteController.createComponente)
componenteRoute.put('/componentes/:id', componenteController.updateComponente)
componenteRoute.delete('/componentes/:id',componenteController.deleteComponente)

componenteRoute.get('/componentes/:id/productos', componenteController.getProductosInComponente)

module.exports = componenteRoute