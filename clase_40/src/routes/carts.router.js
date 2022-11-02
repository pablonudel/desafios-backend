import { Router } from 'express'
import {cartsController} from '../controllers/carts.controller.js'

const router = Router()

router.get('/', cartsController.getAllCarts)
router.get('/:id_cart/products', cartsController.getCartProducts)
router.post('/:id_cart/products', cartsController.updateCartProducts)
router.post('/:id_cart', cartsController.emptyCart)
router.post('/:id_cart/products/:id_prod', cartsController.deleteCartProductById)
router.delete('/:id_cart', cartsController.deleteCartById)

export default router;