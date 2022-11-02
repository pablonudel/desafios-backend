import { config, MongoDBService } from "../configs/index.js"
const Persistence = config.SERVER.SELECTED_DB

export default class PersistenceFactory{
    static getPersistence = async () => {
        switch(Persistence){
            case "memory":
                let {default:MemoryDao} = await import('./memory.dao.js')
                return new MemoryDao()
            case "mongo":
                MongoDBService.getInstance()
                let {default:MongoDao} = await import('./mongo.dao.js')
                return new MongoDao()
            case "filesystem":
                MongoDBService.getInstance()
                let {default:FileDao} = await import('./file.dao.js')
                return new FileDao()
        }
    }
}