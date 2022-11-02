import { userService } from "../services/index.js";
import { UsersDto } from '../dtos/index.js'
import { ServerResponse } from '../utils/serverResponse.js'

const getAllUsers = async(req,res) => {
    try {
        const users = await userService.getUsers()
        const parsedUsers = users.map(user => new UsersDto(user))
        ServerResponse.success({req:req, res, data:parsedUsers})
    } catch (error) {
        ServerResponse.internalError({req:req, res, error:error})
    }
}

const saveUser =  async (req,res) => {
    try {
        const user = req.body
        const userSaved = await userService.saveUser(user)
        ServerResponse.success({req:req, res, data: userSaved})
    } catch (error) {
        ServerResponse.internalError({req:req, res, error:error})
    }
}

const getUserById = async (req,res) => {
    try {
        const {id} = req.params
        const user = await userService.getUserById(id)
        if (!user) throw `Usuario con ID:${id} no encontrado`
        ServerResponse.success({req:req, res, data:user})
    } catch (error) {
        ServerResponse.internalError({req:req, res, error:error})
    }
}

const updateUserById = async (req,res) => {
    try {
        const { id } = req.params
        const user = req.body
        const userUpdated = await userService.updateUserById(user, id)
        ServerResponse.success({req:req, res, data: userUpdated})
    } catch (error) {
        ServerResponse.internalError({req:req, res, error:error})
    }
}

const deleteUserById = async (req,res) => {
    try {
        const { id } = req.params
        const userDeleted = await userService.deleteUserById(id)
        ServerResponse.success({req:req, res, data: userDeleted})
    } catch (error) {
        ServerResponse.internalError({req:req, res, error:error})
    }
}

export const usersController = {
    getAllUsers, saveUser, getUserById, updateUserById, deleteUserById
}