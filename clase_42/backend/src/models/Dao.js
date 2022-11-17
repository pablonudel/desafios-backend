import mongoose from 'mongoose'
//import {MongoDBService, config} from '../configs/index.js'
import User from './User.js'
import Cart from './Cart.js'
import Product from './Product.js'


export default class Dao {
    constructor(){
        const timestamps = {timestamps:{createdAt:'createdAt', updatedAt:'updatedAt'}}
        const userSchema = mongoose.Schema(User.schema, timestamps)
        const cartSchema = mongoose.Schema(Cart.schema, timestamps)
        const productSchema = mongoose.Schema(Product.schema, timestamps)

        this.models = {
            [User.collection]: mongoose.model(User.collection, userSchema),
            [Cart.collection]: mongoose.model(Cart.collection, cartSchema),
            [Product.collection]: mongoose.model(Product.collection, productSchema)
        }
    }

    async getAll(options, entity){
        if(!this.models[entity]) throw new Error('Entity not found')
        let result = await this.models[entity].find(options).lean()
        return result
    }

    async findOne(options, entity){
        if(!this.models[entity]) throw new Error('Entity not found')
        let result = await this.models[entity].findOne(options).lean()
        return result
    }
    
    async save(document, entity){
        if(!this.models[entity]) throw new Error('Entity not found')
        let result = await this.models[entity].create(document)
        return result
    }

    async update(id, document, entity){
        if(!this.models[entity]) throw new Error('Entity not found')
        let result = await this.models[entity].updateOne({'_id':id}, {$set:document})
        return result
    }

    async delete(id, entity){
        if(!this.models[entity]) throw new Error('Entity not found')
        let result = await this.models[entity].deleteOne({'_id':id})
        return result
    }
}