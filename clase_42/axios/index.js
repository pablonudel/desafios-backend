import axios from 'axios'


const user = {
    name:"Test Name",
    lastname: "Test Lastname",
    email:"test@email.com",
    password:"123"
}

let userID
let cartID
let productID

const product = {
    category: 'Test Category',
    name: 'Test Product',
    description: 'Test Description',
    code: 'testcode',
    image: 'https://picsum.photos/id/0/5616/3744',
    price: 1,
    stock: 1
}

let addProduct = {
    _id: productID,
    qty: 2
}

const sessions = {
    registerUser:async()=>{
        let result = await axios.post('http://localhost:8080/api/sessions/register', user)
        const {data} = result
        userID = data.data._id
        cartID = data.data.cart
        console.log({test:"Registra un usuario", data:data});
    },
    loginUser:async()=>{        
        let result = await axios.post('http://localhost:8080/api/sessions/login', {email: `${user.email}`, password:`${user.password}`})
        const {data} = result
        console.log({test:"Logueo del Usuario", data:data});
    },
    logout:async()=>{        
        let result = await axios.get('http://localhost:8080/api/sessions/logout')
        const {data} = result
        console.log({test:"Deslogueo del Usuario", data:data});
    },
}

const users = {
    getUsers: async()=>{
        let result = await axios.get('http://localhost:8080/api/users')
        const {data} = result
        console.log({test:"Obtener todos los usuarios", data:data});
    },
    getUserById: async()=>{
        let result = await axios.get(`http://localhost:8080/api/users/${userID}`)
        const {data} = result
        console.log({test:"Obtener un usuario por ID", data:data});
    },
    updateUserById:  async()=>{
        let result = await axios.put(`http://localhost:8080/api/users/${userID}`,
        {
            name:'Updated Test Name',
            lastname:'Updated Lastname', 
            email:'updatedemail@email.com'
        })
        const {data} = result
        console.log({test:"Actualizar un usuario", data:data});
    },
    deleteUserById:  async()=>{
        let result = await axios.delete(`http://localhost:8080/api/users/${userID}`)
        const {data} = result
        console.log({test:"Eliminar un usuario", data:data});
    }
}

const products = {
    saveProduct:  async()=>{
        let result = await axios.post(`http://localhost:8080/api/products`, product)
        const {data} = result
        productID = data.data._id
        console.log({test:"Agregar un producto", data:data});
    },
    getProducts: async()=>{
        let result = await axios.get('http://localhost:8080/api/products')
        const {data} = result
        console.log({test:"Obtener todos los productos", data:data});
    },
    getProductById: async()=>{
        let result = await axios.get(`http://localhost:8080/api/products/${productID}`)
        const {data} = result
        console.log({test:"Obtener un producto por ID", data:data});
    },
    updateProductById:  async()=>{
        let result = await axios.put(`http://localhost:8080/api/products/${productID}`,
        {
            name: 'Updated Test Product',
            description: 'Updated Test Description',
            code: 'Updatedtestcode',
            price: 2,
            category: 'Updated Test Category',
            stock: 2,
        })
        const {data} = result
        console.log({test:"Actualizar un producto", data:data});
    },
    deleteProductById:  async()=>{
        let result = await axios.delete(`http://localhost:8080/api/products/${productID}`)
        const {data} = result
        console.log({test:"Borrar un producto", data:data});
    }
}

const carts = {
    getCartById: async()=>{
        let result = await axios.get(`http://localhost:8080/api/cart/${cartID}/products`)
        const {data} = result
        console.log({test:"Obtener un carrito por ID", data:data});
    },
    updateCartProducts:  async()=>{
        let result = await axios.post(`http://localhost:8080/api/cart/${cartID}/products`, {_id:`${productID}`, qty:1})
        const {data} = result
        console.log({test:"Actualizar carrito", data:data});
    },
    deleteCartProductById:  async()=>{
        let result = await axios.post(`http://localhost:8080/api/cart/${cartID}/products/${productID}`)
        const {data} = result
        console.log({test:"Borrar un producto del carrito", data:data});
    },
    emptyCart:  async()=>{
        let result = await axios.post(`http://localhost:8080/api/cart/${cartID}`)
        const {data} = result
        console.log({test:"vaciar carrito", data:data});
    },
    deleteCartById:  async()=>{
        let result = await axios.delete(`http://localhost:8080/api/cart/637579b52edd261747697192`)
        const {data} = result
        console.log({test:"Eliminar carrito", data:data});
    }
}

await sessions.registerUser()
await sessions.loginUser()
await users.getUsers()
await users.getUserById()
await users.updateUserById()
await products.saveProduct()
await products.getProducts()
await products.getProductById()
await products.updateProductById()
await carts.getCartById()
await carts.updateCartProducts()
await carts.deleteCartProductById()
await carts.emptyCart()
await products.deleteProductById()
await carts.deleteCartById()
await sessions.logout()
await users.deleteUserById()