import {Router} from 'express'
import cartController from '../controllers/cart.controller.js'


const router = Router()

router.get('/:id_cart/products', cartController.getCartById)
router.post('/:id_cart/products', cartController.updateCartProducts)
router.post('/:id_cart/products/:id_prod', cartController.deleteCartProductById)
router.post('/:id_cart', cartController.emptyCart)
router.delete('/:id_cart', cartController.deleteCartById)

export default router