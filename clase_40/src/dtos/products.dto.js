export default class ProductDto{
    constructor(product){
        this.id = product.id ?? product._id
        this.code = product.code
        this.name = product.name
        this.description = product.description
        this.image = product.image
        this.price = product.price
        this.category = product.category
        this.stock = product.stock
        this.active = product.active ?? true
    }
}