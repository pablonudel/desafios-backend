import mongoose from "mongoose"
const {Schema, model} = mongoose

const collection = 'users'

const UserSchema = new Schema({
    name:{type:String, required:true},
    lastname:{type:String, required:true},
    email:{type:String, required:true, unique: true},
    avatar:{type:String, required:true},
    password:{type:String, required:true},
    role:{type:String, required:true},
    cartID:{type:String, required:true, unique: true}
},{timestamps:true})

const UserModel = model(collection, UserSchema)

export  {UserModel, UserSchema}