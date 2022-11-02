import mongoose from "mongoose"
const {Schema, model} = mongoose

const productsCollection = 'products'
const ProductSchema = new Schema({
    name:{type:String, required:true, max:100},
    description:{type:String, required:true, max:100},
    code:{type:String, required:true, max:100},
    image:{type:String, required:true, max:100},
    price:{type:Number, required:true},
    category:{type:String, required:true},
    stock:{type:Number, required:true},
    active:{type:Boolean, required:true}
},{
    virtuals: true, 
    timestamps: true
})

ProductSchema.set("toJSON", {
    transform: (_, response) => {
        response.id = response._id;
        delete response._id;
        return response;
    },
});

const ProductModel = model(productsCollection, ProductSchema)

export  {ProductModel, ProductSchema}