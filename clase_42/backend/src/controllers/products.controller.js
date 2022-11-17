import { productService } from "../services/index.js";
import { ServerResponse } from '../utils/serverResponse.js'
 

const getProducts = async(req,res)=>{
    try {
        const result = await productService.getAll()
        ServerResponse.success({req:req, res, data:result})
    } catch (error) {
        ServerResponse.internalError({req:req, res, error:error})
    }
}

const getProductById = async(req,res)=>{
    try {
        const {id} = req.params
        const result = await productService.getBy({'_id':id})
        if(!result) throw `Producto con ID:${id} no encontrado`
        ServerResponse.success({req:req, res, data:result}) 
    } catch (error) {
        ServerResponse.internalError({req:req, res, error:error})
    }
}

const saveProduct = async(req,res)=>{
    try {
        const data = req.body
        const result = await productService.save(data)
        ServerResponse.success({req:req, res, data:result}) 
    } catch (error) {
        ServerResponse.internalError({req:req, res, error:error})
    }
}

const updateProductById = async(req,res)=>{
    try {
        const {id} = req.params
        const data = req.body
        await productService.update(id, data)
        const result = await productService.getBy({'_id':id})
        ServerResponse.success({req:req, res, data:result})
    } catch (error) {
        ServerResponse.internalError({req:req, res, error:error})
    }
}

const deleteProductById = async(req,res)=>{
    try {
        const {id} = req.params
        await productService.delete(id)
        ServerResponse.success({req:req, res, data:`Producto con ID:${id} eliminado con éxito`})
    } catch (error) {
        ServerResponse.internalError({req:req, res, error:error})
    }
}


export default {
    getProducts,
    getProductById,
    saveProduct,
    updateProductById,
    deleteProductById
}