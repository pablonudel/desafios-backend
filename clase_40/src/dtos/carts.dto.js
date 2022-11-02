export default class CartsDto{
    constructor(cart){
        this.id = cart.id ?? cart._id
        this.products = cart.products
    }
}