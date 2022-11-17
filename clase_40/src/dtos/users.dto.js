export default class UsersDto{
    constructor(user){
        this.id = user.id ?? user._id
        this.name = user.name
        this.lastname = user.lastname
        this.email = user.email
        this.avatar = user.avatar
        this.role = user.role ?? 'user'
        this.cart = user.cart
    }
}