import __dirname from '../utils.js'
import fs from 'fs'

export default class FileDao{
    constructor(){
        this.entities = {
            users:__dirname+'/files/users.json',
            products:__dirname+'/files/products.json',
            carts:__dirname+'/files/carts.json'
        }
        this.init()
    }

    async init(){
        if(!fs.existsSync(this.entities.users)) await fs.promises.writeFile(this.entities.users, JSON.stringify([]))
        if(!fs.existsSync(this.entities.products)) await fs.promises.writeFile(this.entities.products, JSON.stringify([]))
        if(!fs.existsSync(this.entities.carts)) await fs.promises.writeFile(this.entities.carts, JSON.stringify([]))
    }

    async readFile(entity){
        let data = await fs.promises.readFile(this.entities[entity], 'utf-8')
        return JSON.parse(data)
    }
    async writeFile(entity, data){
        await fs.promises.writeFile(this.entities[entity], JSON.stringify(data,null,'\t'))
    }

    async getAll(entity){
        if(!this.entities[entity]) throw new Error('Entity not found')
        return await this.readFile(entity)
    }

    async save(obj, entity){
        try {
            let array = await this.getAll(entity)
            if(array.length === 0){
                obj.id = 1
            }else{
                obj.id = array[array.length - 1].id+1
            }
            array.push(obj)
            await this.writeFile(entity, array)
            return obj
        } catch (error) {
            throw new Error('No se puede escribir el archivo')
        }
    }

    async getById(id, entity){
        try {
            const idNumber = parseInt(id)
            let array = await this.getAll(entity)
            let obj = array.find(obj => obj.id === idNumber)
            return obj
        } catch (error) {
            throw new Error('No se puede leer el archivo')
        }
    }

    async updateById(obj, id, entity){
        try {
            const idNumber = parseInt(id)
            let array = await this.getAll(entity)
            let findObj = array.find(obj => obj.id === idNumber)
            const index = array.indexOf(findObj)
            obj.id = parseInt(id)
            array[index] = obj
            await this.writeFile(entity, array)
            return obj
        } catch (error) {
            throw new Error('No se puede escribir el archivo')
        }
    }

    async deleteById(id, entity){
        try {
            const idNumber = parseInt(id)
            let array = await this.getAll(entity)
            let newArray = array.filter(obj => obj.id !==  id)
            console.log(newArray);
            await this.writeFile(entity, newArray)
            return newArray
        } catch (error) {
            throw new Error('No se puede escribir el archivo')
        }
    }
}