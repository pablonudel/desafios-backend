import {Router} from 'express'
import productsController from '../controllers/products.controller.js'


const router = Router()

router.get('/', productsController.getProducts)
router.get('/:id', productsController.getProductById)
router.post('/', productsController.saveProduct)
router.put('/:id', productsController.updateProductById)
router.delete('/:id', productsController.deleteProductById)

export default router