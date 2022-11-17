import Dao from "../models/Dao.js";
import UserService from './UserService.js'
import CartService from './CartService.js'
import ProductService from './ProductService.js'

const dao = new Dao() 

export const userService = new UserService(dao)
export const cartService = new CartService(dao)
export const productService = new ProductService(dao)