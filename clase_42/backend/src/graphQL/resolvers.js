import {userService, productService, cartService} from '../services/index.js'
import {CartProductDto} from '../dtos/index.js'

const resolvers = {
    Mutation:{
        //USERS
        updateUserById:async(_,{id, input})=>{
            await userService.update(id, input)
            let updatedUser = await userService.getBy({'_id':id}) 
            return updatedUser
        },
        deleteUserById:async(_,{id})=>{
            let user = await userService.getBy({'_id':id})
            await cartService.delete(user.cart)
            await userService.delete(id)
            return `Usuario con ID:${id} eliminado con éxito`
        },

        //PRODUCTS
        addProduct:async(_,{input})=>{
            let product = await productService.save(input)
            return product
        },
        updateProductById:async(_,{id, input})=>{
            await productService.update(id, input)
            let updatedProduct = await productService.getBy({'_id':id})
            return updatedProduct
        },
        deleteProductById:async(_,{id})=>{
            await productService.delete(id)
            return `Producto con ID:${id} eliminado con éxito`
        },

        //CARTS
        addProductCart:async(_,{id, input})=>{
            let cart = await cartService.getBy({'_id':id})
            let products = await productService.getAll()
            let product = products.find(p=>JSON.stringify(p._id) === JSON.stringify(input._id))
            if(!product) return `Producto con ID:${input.id} no encontrado`
            let productInCart = cart.products.find(p=>JSON.stringify(p._id) === JSON.stringify(input._id))
            let productIndex = cart.products.indexOf(productInCart)

            let addProduct = new CartProductDto(product, input.qty)
            
            if(productInCart && cart.products[productIndex].qty + input.qty > product.stock) return 'Stock no disponible'
            if(addProduct.qty > product.stock) return 'Stock no disponible'
            if(addProduct.qty < 1) return 'Stock no disponible'

            productInCart ? (
                cart.products[productIndex].qty += input.qty,
                cart.products[productIndex].subTotal += input.qty * cart.products[productIndex].price
            ) : (
                cart.products.push(addProduct)
            )
            await cartService.update(id, {products:cart.products})
            return await cartService.getBy({'_id':id})
        },
        deleteProductCart:async(_,{id, input})=>{
            let cart = await cartService.getBy({'_id':id})
            let product = cart.products.find(p=>JSON.stringify(p._id) === JSON.stringify(input._id))

            if(!product) return  `Producto con ID:${input.id} no encontrado`

            cart.products = cart.products.filter(p => JSON.stringify(p._id) !== JSON.stringify(input._id))
            await cartService.update(id, {products:cart.products})
            return await cartService.getBy({'_id':id})
        },
        emptyCart:async(_,{id})=>{
            await cartService.update(id, {products:[]})
            return await cartService.getBy({'_id':id})
        }
    },
    Query:{
        //USERS
        getAllUsers:async()=>{
            let result = await userService.getAll()
            return result
        },
        getUserById:async(_,{id})=>{
            let result = await userService.getBy({'_id':id})
            return result
        },

        //PRODUCTS
        getAllProducts:async()=>{
            let result = await productService.getAll()
            return result
        },
        getProductById:async(_,{id})=>{
            let result = await productService.getBy({'_id':id})
            return result
        },

        //CARTS
        getCartById:async(_,{id})=>{
            let result = await cartService.getBy({'_id':id})
            return result
        }
    }
}

export default resolvers