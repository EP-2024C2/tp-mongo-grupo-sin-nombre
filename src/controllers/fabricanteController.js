const Producto = require('../models/productoModel')
const Fabricante = require('../models/productoModel')
//const mongoose = require('../db/mongo.db').mongoose
const fabricanteController = {}

//Obtener todos los productos de un fabricante
const getProductosInFabricante = async(req, res) => {
    const _id = req.params.id;
    const fabricante = await Fabricante.find({ _id }).populate("productoId");
    res.status(200).json(fabricante);
  }

fabricanteController.getProductosInFabricante = getProductosInFabricante


