const Componente = require('../models/componenteModel')
const Producto = require('../models/productoModel')
const componenteController = {}

//Obtener todos los componente

const getComponentes = async (req, res) => {
  const componentes = await Componente.find({});
  res.status(200).json(componentes);
}
componenteController.getComponentes = getComponentes

//Obtener componente por ID

const getComponentesId = async (req, res) => {
    const id = req.params.id
    const componentes = await Componente.findById(id)
    if (componentes){
        res.status(200).json(componentes)
    }
    else {
        res.status(404).json({ mensaje: `El componente con id ${id} no se encuentra.` })
    }
}
componenteController.getComponentesId = getComponentesId

//Crear componente

const createComponente = async (req, res)=> {
    const componente = await Componente.create(req.body)
    res.status(201).json(componente)
}

componenteController.createComponente = createComponente

//Actualizar componente

const updateComponente = async (req, res) => {
    const {nombre, descripcion} = req.body
    try {
        const id = req.params.id
        const componente = await Componente.findById(id)
        componente.nombre = nombre
        componente.descripcion = descripcion
        await componente.save()
        res.status(200).json(componente)
    }
    catch (error) {
        res.status(404).json({message: "Error al modificar los datos del componente"})
    }
}
componenteController.updateComponente = updateComponente

//Eliminar componente

const deleteComponente = async (req,res) =>{
    const {id} = req.params
    try{
        const componente = await Componente.findByIdAndDelete(id)
        res.status(200).json({message: "Componente eliminado con éxito"})
    } catch (error){
        res.status(500).json({error: "Error al eliminar componente", details: error.message })
    }
}

componenteController.deleteComponente = deleteComponente


//Obtener todos los productos de un fabricante
const getProductosInComponente = async(req, res) => {
    const _id = req.params.id;
    const componente = await Componente.find({ _id }).populate("productoId");
    res.status(200).json(componente);
  }

componenteController.getProductosInComponente = getProductosInComponente

//Export
module.exports = componenteController
