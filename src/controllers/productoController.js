const Producto = require('../models/productoModel')
const Fabricante = require('../models/fabricanteModel')
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
    const producto = await Producto.findById(id)
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
    const {nombre, descripcion, precio, pathIMG} = req.body
    try {
        const id = req.params.id
        const producto = await Producto.findById(id)
        producto.nombre = nombre;
        producto.descripcion = descripcion;
        producto.precio = precio;
        producto.pathIMG = pathIMG;
        await producto.save()
        res.status(200).json(producto)
    }
    catch (error) {
        res.status(404).json({message: "Error al modificar los datos del producto"})
    }
}
productoController.updateProducto = updateProducto

//Eliminar producto

const deleteProducto = async (req,res) =>{
    const {id} = req.params
    try{
        const producto = await Producto.findByIdAndDelete(id)
        res.status(200).json({message: "Producto eliminado con éxito"})
    } catch (error){
        res.status(500).json({ error: "Error al eliminar el producto", details: error.message })
    }
    
}

productoController.deleteProducto = deleteProducto

//Crear fabricante dentro de producto

const associateFabricante = async(req,res) =>{
    const _id = req.params.id
    const fabricanteBody = req.body
    const producto = await Producto.findById(_id)

    let fabricante = await Fabricante.findOne({ nombre: fabricanteBody.nombre });

    if (!fabricante) {
        fabricante = await Fabricante.create(fabricanteBody)
    }

    if (!producto.fabricantes.includes(fabricante._id)) {
        producto.fabricantes.push(fabricante._id)
        await producto.save()
    }

    if (!fabricante.productos.includes(producto._id)) {
        fabricante.productos.push(producto._id)
        await fabricante.save()
    }

    res.status(200).json(producto)
}

productoController.associateFabricante = associateFabricante

//Obtener todos los fabricantes en producto
const getFabricantesById = async (req, res) => {
    const _id = new mongoose.Types.ObjectId(req.params.id)
   try{
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
          componentes: 1,
          "fabricantes.nombre": 1,
          "fabricantes.direccion": 1,
          "fabricantes.numeroContacto": 1,
          "fabricantes.pathIMG": 1,
        },
      },
    ]);
    res.status(200).json(productos)
    }catch (err){
        res.status(500).json({ message: "Error: no se pudo obtener los fabricantes", error: err });
      }
  }
productoController.getFabricantesById = getFabricantesById

//Crear componente dentro de producto

const associateComponente = async (req, res)=> {
  const id = req.params.id
  try {
      const producto = await Producto.findByIdAndUpdate(     
        id, 
          { $push: { componentes: req.body } }, 
          { new: true }  
      )
      console.log('Componente asociado con éxito')
      res.status(201).json(producto.componentes[producto.componentes.length - 1])
  } catch (err) {
      console.error('Error al asociar el componente', err)
      res.status(500).json({error: 'Algo salió mal'})
  }
}

productoController.associateComponente = associateComponente

//Actualizar componente de un producto
const updateComponente = async (req, res) => {
  const {componentes} = req.body
  const {productoId, componenteId} = req.params
  const producto = await Producto.findById(productoId)
  if(!producto){
    res.status(404).json({message: 'Producto no encontrado'})
  }
  const componenteIndex = producto.componentes.findIndex(componente => componente._id.toString() == componenteId)
  if(componenteIndex == -1){
    return res.status(404).json({message: 'Componente no encontrado'})
  }
  producto.componentes = componentes
  await producto.save()
  res.status(200).json({message:'Componente modificado con éxito'})
}
productoController.updateComponente = updateComponente

//Obtener un componente en particular

const getComponenteId = async (req,res) => {
  const _id = req.params.id
    const _idComponente = req.params.componenteId
    const producto = await Producto.findById(_id)
    const componente = producto.componentes.id(_idComponente)
    res.status(200).json(componente)
}

productoController.getComponenteId = getComponenteId

//Obtener todos los componentes de producto

const getComponentes = async (req,res) => {
  const _id = new mongoose.Types.ObjectId(req.params.id)
  try{
    const producto = await Producto.aggregate([
      {
        $match: {_id}
      },
      {
        $project: {
          _id: 0,
          nombre: 1,
          descripcion: 1,
          precio: 1,
          pathIMG: 1,
          componentes: 1
        },
      },
    ])

    res.status(200).json(producto)

  }catch (err){
    res.status(500).json({ message: "Error: no se pudo obtener los componentes", error: err });
  }
}
  
productoController.getComponentes= getComponentes

//Eliminar componente incrustado en producto
  const deleteComponente = async (req,res) =>{
    const _id = req.params.id
    const _idComponente = req.params.componenteId
    const producto = await Producto.findByIdAndUpdate(
        _id,
        { $pull: { componentes: { _id: _idComponente } } },
        { new: true }
    )
    res.status(200).json(producto)
}

productoController.deleteComponente = deleteComponente


//Export
module.exports = productoController