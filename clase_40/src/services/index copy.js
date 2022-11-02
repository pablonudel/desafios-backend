import {config} from '../configs/config.js'
import MongoDao from '../daos/mongo.dao.js'
import MemoryDao from '../daos/memory.dao.js'
import UserService from './users.service.js'
//import ProductService from './products.service.js'
import CartService from './carts.service.js'

const db = config.SERVER.SELECTED_DB

let dao

switch(db){
    case 'mongo': 
        dao = new MongoDao()
        break
    case 'memory':
        dao = new MemoryDao()
        break
}

export const userService = new UserService(dao)
//export const productService = new ProductService(dao)
export const cartService = new CartService(dao)