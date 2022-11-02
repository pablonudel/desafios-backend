import mongoose from "mongoose";
import { UserSchema, ProductSchema, CartSchema} from '../models/index.js'

export default class MongoDao{
    constructor(){
        this.collections = {
            users: mongoose.model('users', UserSchema),
            products: mongoose.model('products', ProductSchema),
            carts: mongoose.model('carts', CartSchema)
        }
    }

    async getAll(collection){
        if(!this.collections[collection]) throw new Error('Collection not found')
        return await this.collections[collection].find({}).lean()
    }

    async save(obj, collection){
        if(!this.collections[collection]) throw new Error('Collection not found')
        return await this.collections[collection].create(obj)
    }

    async getById(id, collection){
        if(!this.collections[collection]) throw new Error('Collection not found')
        let result = await this.collections[collection].findOne({'_id':id})
        if(!result) throw new Error(`Object with ID ${id} not found`)
        return result
    }

    async updateById(obj, id, collection){
        if(!this.collections[collection]) throw new Error('Collection not found')
        let isObj = await this.getById(id, collection)
        isObj && await this.collections[collection].updateOne({'_id': id}, {$set:obj})
    }

    async deleteById(id, collection){
        if(!this.collections[collection]) throw new Error('Collection not found')
        let isObj = await this.getById(id, collection)
        isObj && await this.collections[collection].deleteOne({'_id': id})
    }
}