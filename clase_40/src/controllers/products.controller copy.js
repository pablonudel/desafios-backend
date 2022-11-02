import { productService } from "../services/index.js";
import { ServerResponse } from '../utils/serverResponse.js'

const getAllProducts = async(req,res) => {
    try {
        const products = await productService.getProducts()
        if(products.length === 0) return ServerResponse.success({req:req, res, data:'No hay productos disponibles'})
        ServerResponse.success({req:req, res, data:products})
    } catch (error) {
        ServerResponse.internalError({req:req, res, error:error})
    }
}

const saveProduct =  async (req,res) => {
    try {
        const product = req.body
        const productSaved = await productService.saveProduct(product)
        ServerResponse.success({req:req, res, data: productSaved})
    } catch (error) {
        ServerResponse.internalError({req:req, res, error:error})
    }
}

const getProductById = async (req,res) => {
    try {
        const {id} = req.params
        const product = await productService.getProductById(id)
        if (!product) return ServerResponse.notFound({req:req, res, error:'Producto no encontrado'})
        ServerResponse.success({req:req, res, data:product})
    } catch (error) {
        ServerResponse.internalError({req:req, res, error:error})
    }
}

const updateProductById = async (req,res) => {
    try {
        const { id } = req.params
        const product = req.body
        const productUpdated = await productService.updateProductById(product, id)
        ServerResponse.success({req:req, res, data: productUpdated})
    } catch (error) {
        ServerResponse.internalError({req:req, res, error:error})
    }
}

const deleteProductById = async (req,res) => {
    try {
        const { id } = req.params
        const productDeleted = await productService.deleteProductById(id)
        ServerResponse.success({req:req, res, data: productDeleted})
    } catch (error) {
        ServerResponse.internalError({req:req, res, error:error})
    }
}

export const productsController = {
    getAllProducts, saveProduct, getProductById, updateProductById, deleteProductById
}