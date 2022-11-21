import {gql} from 'apollo-server-express'

const typeDefs = gql`

    type User{
        _id:ID
        name:String
        lastname:String
        email:String
        password:String
        cart:String
    }

    input UserInput{
        name:String
        lastname:String
        email:String
        password:String
    }

    type Product{
        _id:ID
        name:String
        description:String
        code:String
        image:String
        price:Int
        category:String
        stock:Int
        active:Boolean
    }

    input ProductInput{
        name:String
        description:String
        code:String
        image:String
        price:Int
        category:String
        stock:Int
        active:Boolean
    }

    type CartProduct{
        _id:ID
        name:String
        code:String
        image:String
        price:Int
        qty:Int
        subTotal:Int
    }
    input CartProductInput{
        _id:ID
        qty:Int
    }

    type Cart{
        _id:ID
        products:[CartProduct]
    }

    type Query{
        getAllUsers:[User]
        getUserById(id:ID):User
        getAllProducts:[Product]
        getProductById(id:ID):Product
        getCartById(id:ID):Cart
    }

    type Mutation{
        updateUserById(id:ID, input:UserInput):User
        deleteUserById(id:ID): ID
        addProduct(input:ProductInput): Product
        updateProductById(id:ID, input:ProductInput):Product
        deleteProductById(id:ID): ID
        addProductCart(id:ID, input:CartProductInput):Cart
        deleteProductCart(id:ID, input:CartProductInput):Cart
        emptyCart(id:ID):Cart
    }
`

export default typeDefs