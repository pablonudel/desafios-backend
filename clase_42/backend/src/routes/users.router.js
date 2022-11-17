import {Router} from 'express'
import usersController from '../controllers/users.controller.js'


const router = Router()

router.get('/', usersController.getUsers)
router.get('/:id', usersController.getUserById)
router.post('/', usersController.saveUser)
router.put('/:id', usersController.updateUserById)
router.delete('/:id', usersController.deleteUserById)

export default router