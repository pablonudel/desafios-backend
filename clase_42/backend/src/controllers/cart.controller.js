import { cartService, productService } from "../services/index.js";
import { ServerResponse } from '../utils/serverResponse.js'
 

const getCartById = async(req,res)=>{
    try {
        const {id_cart} = req.params
        const result = await cartService.getBy({'_id':id_cart})
        if(!result) throw `Carrito con ID:${id} no encontrado`
        ServerResponse.success({req:req, res, data:result.products}) 
    } catch (error) {
        ServerResponse.internalError({req:req, res, error:error})
    }
}

const updateCartProducts = async(req,res)=>{
    try {
        const {id_cart} = req.params
        const data = req.body
        const cart = await cartService.getBy({'_id':id_cart})
        const products = await productService.getAll()
        const product = products.find(p => JSON.stringify(p._id) === JSON.stringify(data._id))

        if(!product) return ServerResponse.notFound({req:req, res, error:'El producto no existe'})
        const productInCart = cart.products.find(p => JSON.stringify(p._id) === JSON.stringify(data._id))
        const indexOfProduct = cart.products.indexOf(productInCart)
        
        const addProduct = {
            _id: product._id,
            name: product.name,
            code: product.code,
            image: product.image,
            price: product.price,
            qty: req.body.qty,
            subTotal: product.price * req.body.qty
        }

        if(productInCart && cart.products[indexOfProduct].qty + data.qty > product.stock) return ServerResponse.badRequest({req:req, res, error:'Stock no disponible'})
        if(addProduct.qty > product.stock) return ServerResponse.badRequest({req:req, res, error:'Stock no disponible'})

        productInCart ? (
            cart.products[indexOfProduct].qty += data.qty,
            cart.products[indexOfProduct].subTotal += data.qty * cart.products[indexOfProduct].price
        ) : (
            cart.products.push(addProduct)
        )

        await cartService.update(id_cart, {products:cart.products})
        const result = await cartService.getBy({'_id':id_cart})
        ServerResponse.success({req:req, res, data:result})
        
    } catch (error) {
        ServerResponse.internalError({req:req, res, error:error})
    }
}

const deleteCartProductById = async(req,res)=>{
    try {
        const {id_cart, id_prod} = req.params

        console.log(id_cart);
        console.log(id_prod);

        const cart = await cartService.getBy({'_id':id_cart})
        const product = cart.products.find(p => JSON.stringify(p._id) === JSON.stringify(id_prod))

        if(!product) return ServerResponse.notFound({req:req, res, error:`Producto con ID:${id_prod} no encontrado`})

        cart.products = cart.products.filter(p => JSON.stringify(p._id) !== JSON.stringify(id_prod))
        await cartService.update(id_cart, {products:cart.products})
        const result = await cartService.getBy({'_id':id_cart})
        ServerResponse.success({req:req, res, data:result})
    } catch (error) {
        ServerResponse.internalError({req:req, res, error:error})
    }
}

const emptyCart = async(req,res)=>{
    try {
        const {id_cart} = req.params
        const products = []
        await cartService.getBy({'_id':id_cart})
        await cartService.update(id_cart, {products:products})
        const result = await cartService.getBy({'_id':id_cart})
        ServerResponse.success({req:req, res, data:result})
    } catch (error) {
        ServerResponse.internalError({req:req, res, error})
    }
}

const deleteCartById = async(req,res)=>{
    try {
        const {id_cart} = req.params
        await cartService.delete(id_cart)
        ServerResponse.success({req:req, res, data:`Carrito con ID:${id_cart} eliminado con éxito`})
    } catch (error) {
        ServerResponse.internalError({req:req, res, error:error})
    }
}


export default {
    getCartById,
    updateCartProducts,
    deleteCartProductById,
    emptyCart,
    deleteCartById
}