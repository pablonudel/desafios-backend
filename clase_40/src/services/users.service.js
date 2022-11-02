import PersistenceFactory from '../daos/Factory.js'

class UserService {
    constructor(dao){
        this.dao = dao
        this.entity = 'users'
        this.init()
    }

    async init(){
        const users = await PersistenceFactory.getPersistence()
        this.dao = users
    }

    async getUsers(){
        return await this.dao.getAll(this.entity)
    }

    async saveUser(user){
        user.active = true
        return await this.dao.save(user, this.entity)
    } 

    async getUserById(id){
        return await this.dao.getById(id, this.entity)
    }

    async updateUserById(user, id){
        return await this.dao.updateById(user, id, this.entity)
    }

    async deleteUserById(id){
        return await this.dao.deleteById(id, this.entity)
    }
}

const userService = new UserService()
export default userService