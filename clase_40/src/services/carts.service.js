import PersistenceFactory from '../daos/Factory.js'

class CartService {
    constructor(dao){
        this.dao = dao
        this.entity = 'carts'
        this.init()
    }

    async init(){
        const carts = await PersistenceFactory.getPersistence()
        this.dao = carts
    }

    async getCarts(){
        return await this.dao.getAll(this.entity)
    }

    async saveCart(cart){
        return await this.dao.save(cart, this.entity)
    } 

    async getCartById(id){
        return await this.dao.getById(id, this.entity)
    }

    async updateCartById(id, cart){
        return await this.dao.updateById(cart, id, this.entity)
    }

    async deleteCartById(id){
        return await this.dao.deleteById(id, this.entity)
    }
}

const cartService = new CartService()
export default cartService