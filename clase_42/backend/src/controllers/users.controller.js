import { userService, cartService } from "../services/index.js";
import { ServerResponse } from '../utils/serverResponse.js'
 
const getUsers = async(req,res)=>{
    try {
        const result = await userService.getAll()
        ServerResponse.success({req:req, res, data:result})
    } catch (error) {
        ServerResponse.internalError({req:req, res, error:error})
    }
}

const getUserById = async(req,res)=>{
    try {
        const {id} = req.params
        const result = await userService.getBy({'_id':id})
        if(!result) throw `Usuario con ID:${id} no encontrado`
        ServerResponse.success({req:req, res, data:result}) 
    } catch (error) {
        ServerResponse.internalError({req:req, res, error:error})
    }
}

const saveUser = async(req,res)=>{
    try {
        const data = req.body
        const result = await userService.save(data)
        ServerResponse.success({req:req, res, data:result}) 
    } catch (error) {
        ServerResponse.internalError({req:req, res, error:error})
    }
}


const updateUserById = async(req,res)=>{
    try {
        const {id} = req.params
        const data = req.body
        await userService.update(id, data)
        const result = await userService.getBy({'_id':id})
        ServerResponse.success({req:req, res, data:result})
    } catch (error) {
        ServerResponse.internalError({req:req, res, error:error})
    }
}

const deleteUserById = async(req,res)=>{
    try {
        const {id} = req.params
        const user = await userService.getBy({_id:id})
        const userCart = user.cart
        await cartService.delete(userCart)
        await userService.delete(id)
        ServerResponse.success({req:req, res, data:`Usuario con ID:${id} eliminado con éxito`})
    } catch (error) {
        ServerResponse.internalError({req:req, res, error:error})
    }
}


export default {
    getUsers,
    getUserById,
    saveUser,
    updateUserById,
    deleteUserById
}