import mongoose from "mongoose"
const {Schema, model} = mongoose

const cartsCollection = 'carts'
const CartSchema = new Schema({
    products: Array
},{
    virtuals: true, 
    timestamps: true
})

CartSchema.set("toJSON", {
    transform: (_, response) => {
        response.id = response._id;
        delete response._id;
        return response;
    },
});

const CartModel = model(cartsCollection, CartSchema)

export  {CartModel, CartSchema}