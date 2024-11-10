const Producto = require('../models/productoModel')
const Fabricante = require('../models/productoModel')
const mongoose = require('../db/mongo.db').mongoose
const productoController = {}

//Obtener todos los productos

const getProductos = async (req, res) => {
  const productos = await Producto.find({});
  res.status(200).json(productos);
}
productoController.getProductos = getProductos

//Obtener producto por ID

const getProductosId = async (req, res) => {
    const id = req.params.id
    const producto = await Producto.findByPk(id)
    if (producto){
        res.status(200).json(producto)
    }
    else {
        res.status(404).json({ mensaje: `El producto de id ${id} no se encuentra.` })
    }
}
productoController.getProductosId = getProductosId

//Crear producto

const createProducto = async (req, res)=> {
    const producto = await Producto.create(req.body)
    res.status(201).json(producto)
}

productoController.createProducto = createProducto

//Actualizar producto

const updateProducto = async (req, res) => {
    const {nombre, descripcion, precio, pathImg} = req.body
    try {
        const id = req.params.id
        const producto = await Producto.findByPk(id)
        producto.nombre = nombre;
        producto.descripcion = descripcion;
        producto.precio = precio;
        producto.pathImg = pathImg;
        await producto.save()
        res.status(200).json(producto)
    }
    catch (error) {
        res.status(404).json({message: "Error al modificar los datos del producto"})
    }
}
productoController.updateProducto = updateProducto

//Eliminar producto

const deleteProducto = async (req, res) => {
    const modelo = req.modelo || await Producto.findByPk(req.params.id);
    const cantComponentesAsociados = await modelo.countComponentes()
    if(cantComponentesAsociados > 0) {
        res.status(400).json({ message: `no se puede eliminar un producto si tiene componentes asociados` });
        return
    }
    const cantFabricantesAsociados = await modelo.countFabricantes()
    if(cantFabricantesAsociados > 0) {
        res.status(400).json({ message: `no se puede eliminar un producto si tiene fabricantes asociados` });
        return
    }
    try {
        await Producto.destroy({ where: { id: req.params.id } });
        res.status(200).json({ message: 'Producto eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
productoController.deleteProducto = deleteProducto

//Crear fabricante dentro de producto

const associateFabricante = async(req,res) =>{
    const id = req.params.id
    const nuevoFabricante = {...req.body, productoId: new mongoose.Types.ObjectId(id)}
    const fabricante = await Fabricante.create(nuevoFabricante)
    res.status(201).json(fabricante)
}

productoController.associateFabricante = associateFabricante

//Obtener todos los fabricantes en producto
const getFabricantesById = async (req, res) => {
    const _id = new mongoose.Types.ObjectId(req.params.id)
    const productos = await Producto.aggregate([
      {
        $match: { _id },
      },
      {
        $lookup: {
          from: "fabricantes",
          localField: "_id",
          foreignField: "productoId",
          as: "fabricantes",
        },
      },
      {
        $project: {
          _id: 0,
          nombre: 1,
          descripcion: 1,
          precio: 1,
          pathIMG: 1,
          "fabricantes.nombre": 1,
          "fabricantes.direccion": 1,
          "fabricantes.numeroContacto": 1,
          "fabricantes.pathIMG": 1,
        },
      },
    ]);
    res.status(200).json(productos)
  }
productoController.getFabricantesById = getFabricantesById

//Crear componente dentro de producto

const associateComponente = async (req, res)=> {
/*    const productoId = req.params.productoId
    try {
        const producto = await Producto.findByIdAndUpdate(
            productoId, 
            { $push: { componentes: req.body } }, 
            { new: true }  
        );
        console.log('Componente asociado con éxito');
        res.status(201).json(producto.componentes[producto.componentes.length - 1])
    } catch (err) {
        console.error('Error al asociar el componente', err);
        res.status(500).json({error: 'Ups!! Algo salío mal.'})
    }*/
}

productoController.associateComponente = associateComponente

module.exports = productoController