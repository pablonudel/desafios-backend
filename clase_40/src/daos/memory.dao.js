export default class MemoryDao{
    constructor(){
        this.entities = {
            users:[],
            products:[],
            carts:[]
        }
    }

    async getAll(entity){
        if(!this.entities[entity]) throw new Error('Entity not found')
        return this.entities[entity]
    }

    async save(obj, entity){
        if(!this.entities[entity]) throw new Error('Entity not found')
        if(this.entities[entity].length === 0){
            obj.id = 1
        }else{
            obj.id=this.entities[entity][this.entities[entity].length-1].id+1
        }
        this.entities[entity].push(obj)
        return obj
    }

    async getById(id, entity){
        const idNumber = parseInt(id)
        const result = this.entities[entity].find(obj => obj.id === idNumber)
        return result
    }

    async updateById(obj, id, entity){
        const result = await this.getById(id, entity)
        const index = this.entities[entity].indexOf(result)
        obj.id = result.id
        this.entities[entity][index] = obj
        return this.entities[entity]
    }

    async deleteById(id, entity){
        const result = await this.getById(id, entity)
        const index = this.entities[entity].indexOf(result)
        this.entities[entity].splice(index, 1)
        return this.entities[entity]
    }
}