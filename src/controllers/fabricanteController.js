const Fabricante = require('../models/fabricanteModel')
const fabricanteController = {}

//Obtener todos los fabricantes

const getFabricantes = async (req, res) => {
  const fabricantes = await Fabricante.find({});
  res.status(200).json(fabricantes);
}
fabricanteController.getFabricantes = getFabricantes

//Obtener fabricante por ID

const getFabricantesId = async (req, res) => {
    const id = req.params.id
    const fabricantes = await Fabricante.findById(id)
    if (fabricantes){
        res.status(200).json(fabricantes)
    }
    else {
        res.status(404).json({ mensaje: `El fabricante con id ${id} no se encuentra.` })
    }
}
fabricanteController.getFabricantesId = getFabricantesId

//Crear fabricante

const createFabricante = async (req, res)=> {
    const fabricante = await Fabricante.create(req.body)
    res.status(201).json(fabricante)
}

fabricanteController.createFabricante = createFabricante

//Actualizar fabricante

const updateFabricante = async (req, res) => {
    const {nombre, direccion, numeroContacto, pathIMG} = req.body
    try {
        const id = req.params.id
        const fabricante = await Fabricante.findById(id)
        fabricante.nombre = nombre;
        fabricante.direccion = direccion;
        fabricante.numeroContacto = numeroContacto;
        fabricante.pathIMG = pathIMG;
        await fabricante.save()
        res.status(200).json(fabricante)
    }
    catch (error) {
        res.status(404).json({message: "Error al modificar los datos del fabricante"})
    }
}
fabricanteController.updateFabricante = updateFabricante

//Eliminar fabricante

const deleteFabricante = async (req,res) =>{
    const {id} = req.params
    try{
        const fabricante = await Fabricante.findByIdAndDelete(id)
        res.status(200).json({message: "Fabricante eliminado con éxito"})
    } catch (error){
        res.status(500).json({error: "Error al eliminar fabricante", details: error.message })
    }
    
}

fabricanteController.deleteFabricante = deleteFabricante


//Obtener todos los productos de un fabricante
const getProductosInFabricante = async(req, res) => {
    const _id = req.params.id;
    const fabricante = await Fabricante.find({ _id }).populate("productoId");
    res.status(200).json(fabricante);
  }

fabricanteController.getProductosInFabricante = getProductosInFabricante

//Export
module.exports = fabricanteController
