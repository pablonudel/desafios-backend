import PersistenceFactory from '../daos/Factory.js'

class ProductService {
    constructor(){
        this.dao
        this.entity = 'products'
        this.init()
    }

    async init(){
        const products = await PersistenceFactory.getPersistence()
        this.dao = products
    }

    async getProducts(){
        return await this.dao.getAll(this.entity)
    }

    async saveProduct(product){
        return await this.dao.save(product, this.entity)
    } 

    async getProductById(id){
        return await this.dao.getById(id, this.entity)
    }

    async updateProductById(product, id){
        return await this.dao.updateById(product, id, this.entity)
    }

    async deleteProductById(id){
        return await this.dao.deleteById(id, this.entity)
    }
}

const productService = new ProductService()
export default productService