import { cartService } from "../services/index.js";
import { productService } from "../services/index.js";
import { CartsDto } from '../dtos/index.js'
import { ServerResponse } from '../utils/serverResponse.js'


const getAllCarts = async (req,res) => {
    try {
        const carts = await cartService.getCarts()
        if(carts.length === 0) return ServerResponse.success({req:req, res, data:'No hay carritos disponibles'})
        const parsedCarts = carts.map(cart => new CartsDto(cart))
        ServerResponse.success({req:req, res, data:parsedCarts})
    } catch (error) {
        ServerResponse.internalError({req:req, res, error:error})
    }
}

const getCartProducts = async(req,res) => {
    try {
        let id = req.params.id_cart
        const cart = await cartService.getCartById(id)
        if(!cart) return ServerResponse.notFound({req:req, res, error:`carrito con ID:${id} no encontrado`})
        ServerResponse.success({req:req, res, data:cart.products})
    } catch (error) {
        ServerResponse.internalError({req:req, res, error:error})
    }
}

const updateCartProducts = async(req,res) => {
    try {
        let id = req.params.id_cart
        const cart = await cartService.getCartById(id)
        const products = await productService.getProducts()
        const product = products.find(p => p.id === req.body.id)
        
        if(!product) return ServerResponse.notFound({req:req, res, error:'El producto no existe'})
        
        const productInCart = cart.products.find(p => p.id === req.body.id)
        const indexOfProduct = cart.products.indexOf(productInCart)
        
        const addProduct = {
            id: req.body.id,
            name: product.name,
            code: product.code,
            image: product.image,
            price: product.price,
            qty: req.body.qty,
            subTotal: product.price * req.body.qty
        }
        
        if(productInCart && cart.products[indexOfProduct].qty + req.body.qty > product.stock) return ServerResponse.badRequest({req:req, res, error:'Stock no disponible'})
        if(addProduct.qty > product.stock) return ServerResponse.badRequest({req:req, res, error:'Stock no disponible'})
        
        productInCart ? (
            cart.products[indexOfProduct].qty += req.body.qty,
            cart.products[indexOfProduct].subTotal += req.body.qty * cart.products[indexOfProduct].price
        ) : (
            cart.products.push(addProduct)
        )
        await cartService.updateCartById(id, cart),
        ServerResponse.success({req:req, res, data:cart.products})

    } catch (error) {
        ServerResponse.internalError({req:req, res, error})
    }
}
const emptyCart = async(req,res) => {
    try {
        let id = req.params.id_cart
        const products = []
        await cartService.getCartById(id)
        await cartService.updateCartById(id, {products:products})

        ServerResponse.success({req:req, res, data:products})
    } catch (error) {
        ServerResponse.internalError({req:req, res, error})
    }
}

const deleteCartProductById = async(req,res) => {
    try {
        let id = req.params.id_cart
        let idProd = req.params.id_prod
        
        const cart = await cartService.getCartById(id)
        const product = cart.products.find(p => p.id === idProd)
        
        if(!product) return ServerResponse.notFound({req:req, res, error:`Producto con ID:${idProd} no encontrado`}) 

        cart.products = cart.products.filter(p => p.id !== idProd)
        await cartService.updateCartById(id, cart)
        ServerResponse.success({req:req, res, data:cart.products})
    } catch (error) {
        ServerResponse.internalError({req:req, res, error})
    }
}

const deleteCartById = async(req,res) => {
    try {
        let id = req.params.id_cart
        await cartService.getCartById(id)
        await cartService.deleteCartById(id)
    } catch (error) {
        ServerResponse.internalError({req:req, res, error})
    }
}


export const cartsController = {
    getAllCarts, getCartProducts, updateCartProducts, emptyCart, deleteCartProductById, deleteCartById
}